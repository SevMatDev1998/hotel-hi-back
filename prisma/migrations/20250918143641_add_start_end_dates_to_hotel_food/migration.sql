/*
  Warnings:

  - Added the required column `endDate` to the `HotelFoods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `HotelFoods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."HotelFoods" ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;
