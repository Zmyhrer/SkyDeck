// lib/constants.ts

// Supported avatar types
export const AVATAR_OPTIONS = [
  "bear",
  "cat",
  "dog",
  "fox",
  "owl",
  "rabbit",
  "panda",
  "tiger",
  "monkey",
  "penguin",
  "lion",
  "koala",
] as const;

export type AvatarType = (typeof AVATAR_OPTIONS)[number];

// Default color schemes for each avatar
export const AVATAR_COLORS: Record<
  AvatarType,
  { primary: string; secondary: string }
> = {
  bear: { primary: "#A05A2C", secondary: "#F5DEB3" },
  cat: { primary: "#FFD700", secondary: "#FFFFFF" },
  dog: { primary: "#FF6347", secondary: "#FFE4B5" },
  fox: { primary: "#FF8C00", secondary: "#FFE4B5" },
  owl: { primary: "#4682B4", secondary: "#F5DEB3" },
  rabbit: { primary: "#DDA0DD", secondary: "#FFFFFF" },
  panda: { primary: "#FFFFFF", secondary: "#000000" },
  tiger: { primary: "#FF8C00", secondary: "#000000" },
  monkey: { primary: "#8B4513", secondary: "#F5DEB3" },
  penguin: { primary: "#000000", secondary: "#FFFFFF" },
  lion: { primary: "#FFD700", secondary: "#8B4513" },
  koala: { primary: "#A9A9A9", secondary: "#FFFFFF" },
};

// Display names for UI
export const AVATAR_NAMES: Record<AvatarType, string> = {
  bear: "Bear",
  cat: "Cat",
  dog: "Dog",
  fox: "Fox",
  owl: "Owl",
  rabbit: "Rabbit",
  panda: "Panda",
  tiger: "Tiger",
  monkey: "Monkey",
  penguin: "Penguin",
  lion: "Lion",
  koala: "Koala",
};

// Default avatar size presets
export const AVATAR_SIZES = {
  sm: 40,
  md: 60,
  lg: 80,
  xl: 100,
} as const;

// For Prisma schema validation
export const prismaAvatarEnum = `enum AvatarType {
    ${AVATAR_OPTIONS.join("\n  ")}
  }`;
