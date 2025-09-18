/*
  Warnings:

  - You are about to drop the `OfferTypes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."HotelFoodOfferTypes" DROP CONSTRAINT "HotelFoodOfferTypes_offerTypeId_fkey";

-- DropTable
DROP TABLE "public"."OfferTypes";

-- CreateTable
CREATE TABLE "public"."FoodOfferTypes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodOfferTypes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."HotelFoodOfferTypes" ADD CONSTRAINT "HotelFoodOfferTypes_offerTypeId_fkey" FOREIGN KEY ("offerTypeId") REFERENCES "public"."FoodOfferTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
