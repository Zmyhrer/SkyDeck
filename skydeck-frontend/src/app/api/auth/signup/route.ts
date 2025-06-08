import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

// Password strength requirements
const MIN_PASSWORD_LENGTH = 8;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/;

// Supported avatar options
const AVATAR_OPTIONS = [
  "bear",
  "cat",
  "dog",
  "fox",
  "owl",
  "panda",
  "rabbit",
  "tiger",
] as const;

type AvatarType = (typeof AVATAR_OPTIONS)[number];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Extract form data
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const avatarId = formData.get("avatarId") as AvatarType | null;
    const terms = formData.get("terms") as string | null;

    // Input validation
    if (!username || !email || !password || !confirmPassword || !terms) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: "Passwords do not match" },
        { status: 400 }
      );
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      return NextResponse.json(
        {
          success: false,
          message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
        },
        { status: 400 }
      );
    }

    if (!PASSWORD_REGEX.test(password)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        },
        { status: 400 }
      );
    }

    // Validate avatar selection
    const selectedAvatar =
      avatarId && AVATAR_OPTIONS.includes(avatarId)
        ? avatarId
        : AVATAR_OPTIONS[0]; // Default to bear if invalid

    // Check for existing user
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      const message =
        existingUser.email === email
          ? "User with this email already exists"
          : "Username is already taken";
      return NextResponse.json({ success: false, message }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        avatar: selectedAvatar, // Store the avatar ID instead of URL
        unit_system: "metric",
        role: "user",
      },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        unit_system: true,
        role: true,
        created_at: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        user,
      },
      {
        status: 201,
      }
    );
  } catch (error: unknown) {
    console.error("Registration error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      {
        success: false,
        message: "Registration failed",
        error: errorMessage,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
