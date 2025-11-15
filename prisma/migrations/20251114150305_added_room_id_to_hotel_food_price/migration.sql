-- AlterTable
ALTER TABLE "public"."HotelFoodPrices" ADD COLUMN     "hotelRoomId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."HotelFoodPrices" ADD CONSTRAINT "HotelFoodPrices_hotelRoomId_fkey" FOREIGN KEY ("hotelRoomId") REFERENCES "public"."HotelRooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;
