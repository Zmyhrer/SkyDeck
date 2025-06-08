-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(200) NOT NULL,
    "password" VARCHAR(200) NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "unit_system" CHAR(2) NOT NULL,
    "role" VARCHAR(30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deck" (
    "id" SERIAL NOT NULL,
    "deck_name" VARCHAR(200) NOT NULL,
    "deck_status" BOOLEAN NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Element" (
    "id" SERIAL NOT NULL,
    "element_name" VARCHAR(200) NOT NULL,
    "element_operator" VARCHAR(2) NOT NULL,
    "element_value" REAL NOT NULL,
    "element_arrowUp" BOOLEAN NOT NULL,
    "deck_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Element_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Deck" ADD CONSTRAINT "Deck_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Element" ADD CONSTRAINT "Element_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "Deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
