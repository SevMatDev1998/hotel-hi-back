/*
  Warnings:

  - Added the required column `priceType` to the `HotelServicePrices` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."ServicePriceType" AS ENUM ('HourlyRate', 'DailyRate', 'ByOrderRate');

-- AlterTable
ALTER TABLE "public"."HotelServicePrices" ADD COLUMN     "priceType" "public"."ServicePriceType" NOT NULL;
