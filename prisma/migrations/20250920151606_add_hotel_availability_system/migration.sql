-- AlterTable
ALTER TABLE "public"."HotelFoodPrices" ADD COLUMN     "hotelAvailabilityId" INTEGER;

-- AlterTable
ALTER TABLE "public"."HotelRoomPrices" ADD COLUMN     "hotelAvailabilityId" INTEGER;

-- AlterTable
ALTER TABLE "public"."HotelServicePrices" ADD COLUMN     "hotelAvailabilityId" INTEGER;

-- CreateTable
CREATE TABLE "public"."HotelAgeAssignments" (
    "id" SERIAL NOT NULL,
    "hotelAvailabilityId" INTEGER NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "fromAge" INTEGER NOT NULL,
    "toAge" INTEGER,
    "bedType" "public"."BedType" NOT NULL,
    "isAdditional" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "HotelAgeAssignments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."HotelRoomPrices" ADD CONSTRAINT "HotelRoomPrices_hotelAvailabilityId_fkey" FOREIGN KEY ("hotelAvailabilityId") REFERENCES "public"."HotelAvailabilities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HotelServicePrices" ADD CONSTRAINT "HotelServicePrices_hotelAvailabilityId_fkey" FOREIGN KEY ("hotelAvailabilityId") REFERENCES "public"."HotelAvailabilities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HotelFoodPrices" ADD CONSTRAINT "HotelFoodPrices_hotelAvailabilityId_fkey" FOREIGN KEY ("hotelAvailabilityId") REFERENCES "public"."HotelAvailabilities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HotelAgeAssignments" ADD CONSTRAINT "HotelAgeAssignments_hotelAvailabilityId_fkey" FOREIGN KEY ("hotelAvailabilityId") REFERENCES "public"."HotelAvailabilities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
