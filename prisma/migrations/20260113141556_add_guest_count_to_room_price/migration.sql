/*
  Warnings:

  - A unique constraint covering the columns `[hotelRoomId,hotelAvailabilityId,guestCount]` on the table `HotelRoomPrices` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."HotelRoomPrices" ADD COLUMN     "guestCount" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "HotelRoomPrices_hotelRoomId_hotelAvailabilityId_guestCount_key" ON "public"."HotelRoomPrices"("hotelRoomId", "hotelAvailabilityId", "guestCount");
