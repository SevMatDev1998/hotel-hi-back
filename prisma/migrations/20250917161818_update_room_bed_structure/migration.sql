/*
  Warnings:

  - You are about to drop the column `roomBedSizeTypeId` on the `RoomBedSizes` table. All the data in the column will be lost.
  - You are about to drop the `RoomBedSizeTypes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `roomBedTypeId` to the `HotelRoomPartBeds` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."RoomBedSizes" DROP CONSTRAINT "RoomBedSizes_roomBedSizeTypeId_fkey";

-- AlterTable
ALTER TABLE "public"."HotelRoomPartBeds" ADD COLUMN     "roomBedTypeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Hotels" ALTER COLUMN "priceSendEmail" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."RoomBedSizes" DROP COLUMN "roomBedSizeTypeId";

-- DropTable
DROP TABLE "public"."RoomBedSizeTypes";

-- CreateTable
CREATE TABLE "public"."RoomBedTypes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomBedTypes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."HotelRoomPartBeds" ADD CONSTRAINT "HotelRoomPartBeds_roomBedTypeId_fkey" FOREIGN KEY ("roomBedTypeId") REFERENCES "public"."RoomBedTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
