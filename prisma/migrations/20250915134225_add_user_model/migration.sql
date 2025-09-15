/*
  Warnings:

  - Changed the type of `userId` on the `UserHotels` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."UserHotels" DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."Users" (
    "id" SERIAL NOT NULL,
    "userName" VARCHAR(256),
    "normalizedUserName" VARCHAR(256),
    "email" VARCHAR(256),
    "normalizedEmail" VARCHAR(256),
    "emailConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "passwordHash" VARCHAR(512),
    "securityStamp" VARCHAR(128),
    "concurrencyStamp" VARCHAR(128) NOT NULL,
    "phoneNumber" VARCHAR(32),
    "phoneNumberConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "lockoutEnd" TIMESTAMP(3),
    "lockoutEnabled" BOOLEAN NOT NULL DEFAULT true,
    "accessFailedCount" INTEGER NOT NULL DEFAULT 0,
    "defaultLanguageId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_normalizedUserName_key" ON "public"."Users"("normalizedUserName");

-- CreateIndex
CREATE UNIQUE INDEX "Users_normalizedEmail_key" ON "public"."Users"("normalizedEmail");

-- CreateIndex
CREATE UNIQUE INDEX "UserHotels_userId_hotelId_key" ON "public"."UserHotels"("userId", "hotelId");

-- AddForeignKey
ALTER TABLE "public"."Users" ADD CONSTRAINT "Users_defaultLanguageId_fkey" FOREIGN KEY ("defaultLanguageId") REFERENCES "public"."Languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserHotels" ADD CONSTRAINT "UserHotels_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
