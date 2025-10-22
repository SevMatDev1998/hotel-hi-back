/*
  Warnings:

  - You are about to drop the column `dateFrom` on the `HotelAvailabilities` table. All the data in the column will be lost.
  - You are about to drop the column `dateTo` on the `HotelAvailabilities` table. All the data in the column will be lost.
  - Added the required column `checkInTime` to the `HotelAvailabilities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkoutTime` to the `HotelAvailabilities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `HotelAvailabilities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `HotelAvailabilities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."HotelAvailabilities" DROP COLUMN "dateFrom",
DROP COLUMN "dateTo",
ADD COLUMN     "checkInTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "checkoutTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "color" VARCHAR(256) NOT NULL,
ADD COLUMN     "confirmed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "title" VARCHAR(256) NOT NULL;
