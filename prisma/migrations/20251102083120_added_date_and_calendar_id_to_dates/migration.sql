-- CreateTable
CREATE TABLE "public"."HotelAvailabilityDates" (
    "id" SERIAL NOT NULL,
    "hotelAvailabilityId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "calendarId" VARCHAR(256) NOT NULL,
    "startDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HotelAvailabilityDates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HotelAvailabilityCommissions" (
    "id" SERIAL NOT NULL,
    "hotelAvailabilityDateId" INTEGER NOT NULL,
    "roomFee" DECIMAL(18,2) NOT NULL,
    "foodFee" DECIMAL(18,2) NOT NULL,
    "additionalFee" DECIMAL(18,2) NOT NULL,
    "serviceFee" DECIMAL(18,2) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HotelAvailabilityCommissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PartnerCommissions" (
    "id" SERIAL NOT NULL,
    "partnerId" INTEGER NOT NULL,
    "hotelAvailabilityId" INTEGER,
    "hotelAvailabilityDateId" INTEGER,
    "roomFee" DECIMAL(18,2) NOT NULL,
    "foodFee" DECIMAL(18,2) NOT NULL,
    "additionalFee" DECIMAL(18,2) NOT NULL,
    "serviceFee" DECIMAL(18,2) NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "PartnerCommissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HotelAvailabilityDates_hotelAvailabilityId_idx" ON "public"."HotelAvailabilityDates"("hotelAvailabilityId");

-- CreateIndex
CREATE INDEX "HotelAvailabilityDates_date_idx" ON "public"."HotelAvailabilityDates"("date");

-- CreateIndex
CREATE INDEX "HotelAvailabilityDates_hotelAvailabilityId_date_idx" ON "public"."HotelAvailabilityDates"("hotelAvailabilityId", "date");

-- CreateIndex
CREATE INDEX "HotelAvailabilityCommissions_hotelAvailabilityDateId_idx" ON "public"."HotelAvailabilityCommissions"("hotelAvailabilityDateId");

-- CreateIndex
CREATE INDEX "PartnerCommissions_partnerId_idx" ON "public"."PartnerCommissions"("partnerId");

-- CreateIndex
CREATE INDEX "PartnerCommissions_hotelAvailabilityId_idx" ON "public"."PartnerCommissions"("hotelAvailabilityId");

-- CreateIndex
CREATE INDEX "PartnerCommissions_hotelAvailabilityDateId_idx" ON "public"."PartnerCommissions"("hotelAvailabilityDateId");

-- CreateIndex
CREATE INDEX "PartnerCommissions_partnerId_hotelAvailabilityId_idx" ON "public"."PartnerCommissions"("partnerId", "hotelAvailabilityId");

-- CreateIndex
CREATE INDEX "PartnerCommissions_partnerId_hotelAvailabilityDateId_idx" ON "public"."PartnerCommissions"("partnerId", "hotelAvailabilityDateId");

-- AddForeignKey
ALTER TABLE "public"."HotelAvailabilityDates" ADD CONSTRAINT "HotelAvailabilityDates_hotelAvailabilityId_fkey" FOREIGN KEY ("hotelAvailabilityId") REFERENCES "public"."HotelAvailabilities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HotelAvailabilityCommissions" ADD CONSTRAINT "HotelAvailabilityCommissions_hotelAvailabilityDateId_fkey" FOREIGN KEY ("hotelAvailabilityDateId") REFERENCES "public"."HotelAvailabilityDates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PartnerCommissions" ADD CONSTRAINT "PartnerCommissions_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "public"."Partners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PartnerCommissions" ADD CONSTRAINT "PartnerCommissions_hotelAvailabilityId_fkey" FOREIGN KEY ("hotelAvailabilityId") REFERENCES "public"."HotelAvailabilities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PartnerCommissions" ADD CONSTRAINT "PartnerCommissions_hotelAvailabilityDateId_fkey" FOREIGN KEY ("hotelAvailabilityDateId") REFERENCES "public"."HotelAvailabilityDates"("id") ON DELETE SET NULL ON UPDATE CASCADE;
