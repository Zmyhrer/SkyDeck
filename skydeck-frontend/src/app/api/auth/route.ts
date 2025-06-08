import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { username, email, password } = await request.json();

  if (!username || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      unit_system: "US", // Provide a default or appropriate value
      role: "manager", // Provide a default or appropriate value
    },
  });

  return NextResponse.json(
    { message: "User created", user: { id: newUser.id, email: newUser.email } },
    { status: 201 }
  );
}
