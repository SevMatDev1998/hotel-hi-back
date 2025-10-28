/*
  Warnings:

  - You are about to drop the column `availabilityTypeId` on the `HotelServiceAvailabilities` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `HotelServiceAvailabilities` table. All the data in the column will be lost.
  - You are about to drop the column `payMethodId` on the `HotelServiceAvailabilities` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `HotelServiceAvailabilities` table. All the data in the column will be lost.
  - Added the required column `endMonth` to the `HotelServiceAvailabilities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startMonth` to the `HotelServiceAvailabilities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."HotelServiceAvailabilities" DROP COLUMN "availabilityTypeId",
DROP COLUMN "endTime",
DROP COLUMN "payMethodId",
DROP COLUMN "startTime",
ADD COLUMN     "endHour" TIMESTAMP(3),
ADD COLUMN     "endMonth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "startHour" TIMESTAMP(3),
ADD COLUMN     "startMonth" TIMESTAMP(3) NOT NULL;
