/*
  Warnings:

  - You are about to drop the column `systemServiceGroupId` on the `SystemServices` table. All the data in the column will be lost.
  - Added the required column `systemServiceGroupId` to the `SystemServiceTypes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."SystemServices" DROP CONSTRAINT "SystemServices_systemServiceGroupId_fkey";

-- AlterTable
ALTER TABLE "public"."SystemServiceTypes" ADD COLUMN     "systemServiceGroupId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."SystemServices" DROP COLUMN "systemServiceGroupId";

-- AddForeignKey
ALTER TABLE "public"."SystemServiceTypes" ADD CONSTRAINT "SystemServiceTypes_systemServiceGroupId_fkey" FOREIGN KEY ("systemServiceGroupId") REFERENCES "public"."SystemServiceGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
