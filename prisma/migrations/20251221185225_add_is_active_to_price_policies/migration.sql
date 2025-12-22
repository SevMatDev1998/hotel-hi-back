-- AlterTable
ALTER TABLE "public"."HotelAdditionalService" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "public"."HotelAgeAssignmentPrices" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "public"."HotelFoodPrices" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "public"."HotelRoomPrices" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
