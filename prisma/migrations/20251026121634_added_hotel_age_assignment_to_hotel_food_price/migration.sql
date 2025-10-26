/*
  Warnings:

  - You are about to drop the column `dateFrom` on the `HotelFoodPrices` table. All the data in the column will be lost.
  - You are about to drop the column `dateTo` on the `HotelFoodPrices` table. All the data in the column will be lost.
  - Made the column `hotelAvailabilityId` on table `HotelFoodPrices` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."HotelFoodPrices" DROP CONSTRAINT "HotelFoodPrices_hotelAvailabilityId_fkey";

-- AlterTable
ALTER TABLE "public"."HotelFoodPrices" DROP COLUMN "dateFrom",
DROP COLUMN "dateTo",
ADD COLUMN     "hotelAgeAssignmentId" INTEGER,
ADD COLUMN     "includedInPrice" BOOLEAN,
ALTER COLUMN "hotelAvailabilityId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."HotelFoodPrices" ADD CONSTRAINT "HotelFoodPrices_hotelAvailabilityId_fkey" FOREIGN KEY ("hotelAvailabilityId") REFERENCES "public"."HotelAvailabilities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HotelFoodPrices" ADD CONSTRAINT "HotelFoodPrices_hotelAgeAssignmentId_fkey" FOREIGN KEY ("hotelAgeAssignmentId") REFERENCES "public"."HotelAgeAssignments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
