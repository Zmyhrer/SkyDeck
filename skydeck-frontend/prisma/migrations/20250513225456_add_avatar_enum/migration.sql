/*
  Warnings:

  - The `avatar` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "AvatarType" AS ENUM ('bear', 'cat', 'dog', 'fox', 'owl', 'rabbit', 'panda', 'tiger', 'monkey', 'penguin', 'lion', 'koala');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatar",
ADD COLUMN     "avatar" "AvatarType" NOT NULL DEFAULT 'bear';
