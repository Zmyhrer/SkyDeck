-- AlterTable
ALTER TABLE "Deck" ALTER COLUMN "deck_status" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Element" ALTER COLUMN "element_arrowUp" SET DEFAULT false;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "unit_system" SET DEFAULT 'metric',
ALTER COLUMN "role" SET DEFAULT 'user',
ALTER COLUMN "avatar" SET DEFAULT 'bear';

-- CreateTable
CREATE TABLE "PasswordReset" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "PasswordReset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PasswordReset_token_key" ON "PasswordReset"("token");

-- CreateIndex
CREATE INDEX "PasswordReset_token_idx" ON "PasswordReset"("token");

-- CreateIndex
CREATE INDEX "PasswordReset_user_id_idx" ON "PasswordReset"("user_id");

-- CreateIndex
CREATE INDEX "PasswordReset_expires_at_idx" ON "PasswordReset"("expires_at");

-- CreateIndex
CREATE INDEX "Deck_user_id_idx" ON "Deck"("user_id");

-- CreateIndex
CREATE INDEX "Deck_deck_name_idx" ON "Deck"("deck_name");

-- CreateIndex
CREATE INDEX "Element_deck_id_idx" ON "Element"("deck_id");

-- CreateIndex
CREATE INDEX "Session_expires_at_idx" ON "Session"("expires_at");

-- AddForeignKey
ALTER TABLE "PasswordReset" ADD CONSTRAINT "PasswordReset_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
