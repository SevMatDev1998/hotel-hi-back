/*
  Warnings:

  - You are about to drop the `HotelAvailabilityCommissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HotelAvailabilityDates` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."HotelAvailabilityCommissions" DROP CONSTRAINT "HotelAvailabilityCommissions_hotelAvailabilityDateId_fkey";

-- DropForeignKey
ALTER TABLE "public"."HotelAvailabilityDates" DROP CONSTRAINT "HotelAvailabilityDates_hotelAvailabilityId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PartnerCommissions" DROP CONSTRAINT "PartnerCommissions_hotelAvailabilityDateId_fkey";

-- DropTable
DROP TABLE "public"."HotelAvailabilityCommissions";

-- DropTable
DROP TABLE "public"."HotelAvailabilityDates";

-- CreateTable
CREATE TABLE "public"."HotelAvailabilityDateCommissions" (
    "id" SERIAL NOT NULL,
    "hotelAvailabilityId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "calendarId" VARCHAR(256) NOT NULL,
    "startDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "roomFee" DECIMAL(18,2) NOT NULL,
    "foodFee" DECIMAL(18,2) NOT NULL,
    "additionalFee" DECIMAL(18,2) NOT NULL,
    "serviceFee" DECIMAL(18,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HotelAvailabilityDateCommissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HotelAvailabilityDateCommissions_hotelAvailabilityId_idx" ON "public"."HotelAvailabilityDateCommissions"("hotelAvailabilityId");

-- CreateIndex
CREATE INDEX "HotelAvailabilityDateCommissions_date_idx" ON "public"."HotelAvailabilityDateCommissions"("date");

-- CreateIndex
CREATE INDEX "HotelAvailabilityDateCommissions_hotelAvailabilityId_date_idx" ON "public"."HotelAvailabilityDateCommissions"("hotelAvailabilityId", "date");

-- AddForeignKey
ALTER TABLE "public"."HotelAvailabilityDateCommissions" ADD CONSTRAINT "HotelAvailabilityDateCommissions_hotelAvailabilityId_fkey" FOREIGN KEY ("hotelAvailabilityId") REFERENCES "public"."HotelAvailabilities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PartnerCommissions" ADD CONSTRAINT "PartnerCommissions_hotelAvailabilityDateId_fkey" FOREIGN KEY ("hotelAvailabilityDateId") REFERENCES "public"."HotelAvailabilityDateCommissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
