-- CreateTable
CREATE TABLE "public"."HotelAdditionalService" (
    "id" SERIAL NOT NULL,
    "hotelServiceId" INTEGER NOT NULL,
    "hotelAvailabilityId" INTEGER NOT NULL,
    "hotelRoomId" INTEGER,
    "isTimeLimited" BOOLEAN NOT NULL DEFAULT false,
    "price" DECIMAL(65,30),
    "startTime" TIMESTAMP(3),
    "percentage" DOUBLE PRECISION,
    "notConstantValue" BOOLEAN NOT NULL DEFAULT false,
    "serviceName" VARCHAR(256) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HotelAdditionalService_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."HotelAdditionalService" ADD CONSTRAINT "HotelAdditionalService_hotelServiceId_fkey" FOREIGN KEY ("hotelServiceId") REFERENCES "public"."HotelServices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HotelAdditionalService" ADD CONSTRAINT "HotelAdditionalService_hotelAvailabilityId_fkey" FOREIGN KEY ("hotelAvailabilityId") REFERENCES "public"."HotelAvailabilities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HotelAdditionalService" ADD CONSTRAINT "HotelAdditionalService_hotelRoomId_fkey" FOREIGN KEY ("hotelRoomId") REFERENCES "public"."HotelRooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;
