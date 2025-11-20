-- CreateTable
CREATE TABLE "public"."HotelAgeAssignmentPrices" (
    "id" SERIAL NOT NULL,
    "hotelRoomId" INTEGER NOT NULL,
    "hotelAgeAssignmentId" INTEGER NOT NULL,
    "price" DECIMAL(18,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HotelAgeAssignmentPrices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."HotelAgeAssignmentPrices" ADD CONSTRAINT "HotelAgeAssignmentPrices_hotelRoomId_fkey" FOREIGN KEY ("hotelRoomId") REFERENCES "public"."HotelRooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HotelAgeAssignmentPrices" ADD CONSTRAINT "HotelAgeAssignmentPrices_hotelAgeAssignmentId_fkey" FOREIGN KEY ("hotelAgeAssignmentId") REFERENCES "public"."HotelAgeAssignments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
