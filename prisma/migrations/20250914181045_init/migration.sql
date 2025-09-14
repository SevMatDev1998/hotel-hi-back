-- CreateEnum
CREATE TYPE "public"."EmailSentStatus" AS ENUM ('Scheduled', 'Delivered', 'NotDelivered');

-- CreateEnum
CREATE TYPE "public"."FoodType" AS ENUM ('Breakfast', 'Lunch', 'Supper');

-- CreateEnum
CREATE TYPE "public"."LegalEntityType" AS ENUM ('LLC', 'PE', 'CJSC', 'OJSC', 'NGO');

-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('Reserved', 'Pending', 'Approved', 'Arrived', 'Completed', 'Canceled');

-- CreateEnum
CREATE TYPE "public"."HotelRoomReservationStatus" AS ENUM ('Reserved', 'Pending', 'Approved');

-- CreateEnum
CREATE TYPE "public"."OrderCheckinType" AS ENUM ('DefinitiveDates', 'VariableDates');

-- CreateEnum
CREATE TYPE "public"."OrderSource" AS ENUM ('Web', 'InternalTools');

-- CreateEnum
CREATE TYPE "public"."PartnerStatus" AS ENUM ('Draft', 'Pending', 'Waiting', 'Approved');

-- CreateEnum
CREATE TYPE "public"."PhoneCodesEnum" AS ENUM ('AM', 'USA', 'RUS');

-- CreateEnum
CREATE TYPE "public"."PriceNotificationStatus" AS ENUM ('Scheduled', 'Sent', 'Failed', 'WaitingForPartnerConfirmation');

-- CreateEnum
CREATE TYPE "public"."HotelRoomStatus" AS ENUM ('Active', 'Incomplete', 'Inactive', 'Deleted');

-- CreateEnum
CREATE TYPE "public"."BedType" AS ENUM ('Main', 'Cradle', 'Additional');

-- CreateEnum
CREATE TYPE "public"."ServicePayMethod" AS ENUM ('Once', 'Hour', 'Day');

-- CreateEnum
CREATE TYPE "public"."ServiceTypeAvailabilityBy" AS ENUM ('Shared', 'Room');

-- CreateEnum
CREATE TYPE "public"."CompletenessStatus" AS ENUM ('Draft', 'Completed');

-- CreateEnum
CREATE TYPE "public"."HotelServiceHourlyAvailabilityType" AS ENUM ('AllDay', 'Hours');

-- CreateEnum
CREATE TYPE "public"."ServiceOffer" AS ENUM ('PetsAllowed', 'AccessGuestsNotStayingInRoom', 'FoodFromOutside');

-- CreateEnum
CREATE TYPE "public"."ServiceOfferStatus" AS ENUM ('Allowed', 'Requested', 'NotAllowed');

-- CreateEnum
CREATE TYPE "public"."MenuItem" AS ENUM ('Hotel', 'Room', 'Food', 'Service', 'Price', 'Partners', 'Notification');

-- CreateTable
CREATE TABLE "public"."Countries" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Currencies" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "symbol" VARCHAR(10) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Currencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Languages" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Hotels" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "contactPerson" VARCHAR(256) NOT NULL,
    "phoneCode" INTEGER NOT NULL,
    "phoneNumber" VARCHAR(32) NOT NULL,
    "logoUrl" VARCHAR(256),
    "websiteUrl" VARCHAR(64),
    "countryId" INTEGER NOT NULL,
    "state" VARCHAR(256) NOT NULL,
    "city" VARCHAR(256) NOT NULL,
    "registerCountryId" INTEGER,
    "registerState" VARCHAR(256),
    "registerCity" VARCHAR(256),
    "tinNumber" VARCHAR(64) NOT NULL,
    "director" VARCHAR(64) NOT NULL,
    "bankName" VARCHAR(64) NOT NULL,
    "bankAccountNumber" VARCHAR(64) NOT NULL,
    "bankPhoneCode" INTEGER NOT NULL,
    "bankPhoneNumber" VARCHAR(32) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "currencyId" INTEGER NOT NULL,
    "extractUrl" VARCHAR(512),
    "bookingIntegration" BOOLEAN NOT NULL DEFAULT false,
    "legalPerson" VARCHAR(256),
    "priceSendEmail" VARCHAR(256) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Hotels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Partners" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(256) NOT NULL,
    "tin" VARCHAR(64) NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "ltd" VARCHAR(256) NOT NULL,
    "accountNumber" VARCHAR(256) NOT NULL,
    "director" VARCHAR(256) NOT NULL,
    "phone" VARCHAR(256) NOT NULL,
    "status" "public"."PartnerStatus" NOT NULL,
    "countryId" INTEGER NOT NULL,
    "legalEntityTypeId" "public"."LegalEntityType" NOT NULL,
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HotelPartners" (
    "id" SERIAL NOT NULL,
    "hotelId" INTEGER NOT NULL,
    "partnerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HotelPartners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PaymentMethods" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentMethods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Invoices" (
    "id" SERIAL NOT NULL,
    "number" VARCHAR(100) NOT NULL,
    "amount" DECIMAL(18,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Orders" (
    "id" SERIAL NOT NULL,
    "hotelId" INTEGER NOT NULL,
    "statusId" "public"."OrderStatus" NOT NULL,
    "invoiceId" INTEGER,
    "orderNumber" VARCHAR(100) NOT NULL,
    "paymentMethodId" INTEGER,
    "orderCheckinTypeId" "public"."OrderCheckinType" NOT NULL,
    "hotelPartnerId" INTEGER,
    "sourceId" "public"."OrderSource" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OrderCheckinDates" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "checkinDate" TIMESTAMP(3) NOT NULL,
    "checkoutDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderCheckinDates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OrderContactPersons" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "firstName" VARCHAR(128) NOT NULL,
    "lastName" VARCHAR(128) NOT NULL,
    "email" VARCHAR(256) NOT NULL,
    "phoneCode" INTEGER NOT NULL,
    "phoneNumber" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderContactPersons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OrderGuests" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "firstName" VARCHAR(128) NOT NULL,
    "lastName" VARCHAR(128) NOT NULL,
    "age" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderGuests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OrderHotelRooms" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "hotelRoomId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderHotelRooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OrderHotelServices" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "hotelServiceId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderHotelServices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RoomClasses" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomClasses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RoomViews" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomViews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HotelRooms" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "hotelId" INTEGER NOT NULL,
    "roomClassId" INTEGER NOT NULL,
    "roomViewId" INTEGER,
    "numbers" VARCHAR(256) NOT NULL,
    "area" VARCHAR(50) NOT NULL,
    "mainGuestQuantity" INTEGER NOT NULL,
    "additionalGuestQuantity" INTEGER NOT NULL,
    "status" "public"."HotelRoomStatus" NOT NULL,
    "roomNumberQuantity" INTEGER NOT NULL,
    "completeness" "public"."CompletenessStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "HotelRooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RoomParts" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomParts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HotelRoomParts" (
    "id" SERIAL NOT NULL,
    "hotelRoomId" INTEGER NOT NULL,
    "roomPartId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HotelRoomParts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RoomBedSizeTypes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomBedSizeTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RoomBedSizes" (
    "id" SERIAL NOT NULL,
    "roomBedSizeTypeId" INTEGER NOT NULL,
    "size" VARCHAR(64) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomBedSizes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HotelRoomPartBeds" (
    "id" SERIAL NOT NULL,
    "hotelRoomPartId" INTEGER NOT NULL,
    "bedType" "public"."BedType" NOT NULL,
    "roomBedSizeId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HotelRoomPartBeds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HotelRoomNumbers" (
    "id" SERIAL NOT NULL,
    "hotelRoomId" INTEGER NOT NULL,
    "roomNumber" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HotelRoomNumbers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HotelRoomPrices" (
    "id" SERIAL NOT NULL,
    "hotelRoomId" INTEGER NOT NULL,
    "price" DECIMAL(18,2) NOT NULL,
    "dateFrom" TIMESTAMP(3) NOT NULL,
    "dateTo" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HotelRoomPrices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SystemServiceGroups" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemServiceGroups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SystemServiceTypes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemServiceTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SystemServices" (
    "id" SERIAL NOT NULL,
    "systemServiceGroupId" INTEGER NOT NULL,
    "systemServiceTypeId" INTEGER NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemServices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HotelServices" (
    "id" SERIAL NOT NULL,
    "hotelId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "description" VARCHAR(1024),
    "statusId" "public"."CompletenessStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "HotelServices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HotelServiceAvailabilities" (
    "id" SERIAL NOT NULL,
    "hotelServiceId" INTEGER NOT NULL,
    "availabilityTypeId" "public"."ServiceTypeAvailabilityBy" NOT NULL,
    "hourlyAvailabilityTypeId" "public"."HotelServiceHourlyAvailabilityType" NOT NULL,
    "payMethodId" "public"."ServicePayMethod" NOT NULL,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HotelServiceAvailabilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HotelServicePrices" (
    "id" SERIAL NOT NULL,
    "hotelServiceId" INTEGER NOT NULL,
    "price" DECIMAL(18,2) NOT NULL,
    "dateFrom" TIMESTAMP(3) NOT NULL,
    "dateTo" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HotelServicePrices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HotelServiceOffers" (
    "id" SERIAL NOT NULL,
    "hotelId" INTEGER NOT NULL,
    "serviceOfferId" "public"."ServiceOffer" NOT NULL,
    "serviceOfferStatus" "public"."ServiceOfferStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HotelServiceOffers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cuisines" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cuisines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OfferTypes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OfferTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HotelFoods" (
    "id" SERIAL NOT NULL,
    "hotelId" INTEGER NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "description" VARCHAR(1024),
    "foodType" "public"."FoodType" NOT NULL,
    "statusId" "public"."CompletenessStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "HotelFoods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HotelFoodCuisines" (
    "id" SERIAL NOT NULL,
    "hotelFoodId" INTEGER NOT NULL,
    "cuisineId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HotelFoodCuisines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HotelFoodOfferTypes" (
    "id" SERIAL NOT NULL,
    "hotelFoodId" INTEGER NOT NULL,
    "offerTypeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HotelFoodOfferTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HotelFoodPrices" (
    "id" SERIAL NOT NULL,
    "hotelFoodId" INTEGER NOT NULL,
    "price" DECIMAL(18,2) NOT NULL,
    "dateFrom" TIMESTAMP(3) NOT NULL,
    "dateTo" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HotelFoodPrices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HotelAvailabilities" (
    "id" SERIAL NOT NULL,
    "hotelId" INTEGER NOT NULL,
    "dateFrom" TIMESTAMP(3) NOT NULL,
    "dateTo" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HotelAvailabilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EmailStatuses" (
    "id" SERIAL NOT NULL,
    "messageId" VARCHAR(256) NOT NULL,
    "status" "public"."EmailSentStatus" NOT NULL,
    "partnerId" INTEGER,
    "availabilityId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "EmailStatuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PriceNotificationSchedules" (
    "id" SERIAL NOT NULL,
    "partnerId" INTEGER NOT NULL,
    "availabilityId" INTEGER NOT NULL,
    "hotelId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,
    "status" "public"."PriceNotificationStatus" NOT NULL,
    "sentDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PriceNotificationSchedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LocalizationResources" (
    "id" SERIAL NOT NULL,
    "key" VARCHAR(256) NOT NULL,
    "value" VARCHAR(512) NOT NULL,
    "languageId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LocalizationResources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserHotels" (
    "id" SERIAL NOT NULL,
    "userId" VARCHAR(450) NOT NULL,
    "hotelId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserHotels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HotelStates" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "countryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HotelStates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SystemStateSettings" (
    "id" SERIAL NOT NULL,
    "key" VARCHAR(256) NOT NULL,
    "value" VARCHAR(512) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemStateSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HotelPartners_hotelId_partnerId_key" ON "public"."HotelPartners"("hotelId", "partnerId");

-- CreateIndex
CREATE UNIQUE INDEX "HotelFoodCuisines_hotelFoodId_cuisineId_key" ON "public"."HotelFoodCuisines"("hotelFoodId", "cuisineId");

-- CreateIndex
CREATE UNIQUE INDEX "HotelFoodOfferTypes_hotelFoodId_offerTypeId_key" ON "public"."HotelFoodOfferTypes"("hotelFoodId", "offerTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "LocalizationResources_key_languageId_key" ON "public"."LocalizationResources"("key", "languageId");

-- CreateIndex
CREATE UNIQUE INDEX "UserHotels_userId_hotelId_key" ON "public"."UserHotels"("userId", "hotelId");

-- CreateIndex
CREATE UNIQUE INDEX "SystemStateSettings_key_key" ON "public"."SystemStateSettings"("key");

-- AddForeignKey
ALTER TABLE "public"."Hotels" ADD CONSTRAINT "Hotels_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "public"."Countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Hotels" ADD CONSTRAINT "Hotels_registerCountryId_fkey" FOREIGN KEY ("registerCountryId") REFERENCES "public"."Countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Hotels" ADD CONSTRAINT "Hotels_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "public"."Currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Partners" ADD CONSTRAINT "Partners_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "public"."Countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HotelPartners" ADD CONSTRAINT "HotelPartners_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "public"."Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HotelPartners" ADD CONSTRAINT "HotelPartners_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "public"."Partners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Orders" ADD CONSTRAINT "Orders_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "public"."Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Orders" ADD CONSTRAINT "Orders_hotelPartnerId_fkey" FOREIGN KEY ("hotelPartnerId") REFERENCES "public"."Partners"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Orders" ADD CONSTRAINT "Orders_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "public"."PaymentMethods"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Orders" ADD CONSTRAINT "Orders_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "public"."Invoices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderCheckinDates" ADD CONSTRAINT "OrderCheckinDates_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderContactPersons" ADD CONSTRAINT "OrderContactPersons_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderGuests" ADD CONSTRAINT "OrderGuests_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderHotelRooms" ADD CONSTRAINT "OrderHotelRooms_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderHotelRooms" ADD CONSTRAINT "OrderHotelRooms_hotelRoomId_fkey" FOREIGN KEY ("hotelRoomId") REFERENCES "public"."HotelRooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderHotelServices" ADD CONSTRAINT "OrderHotelServices_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderHotelServices" ADD CONSTRAINT "OrderHotelServices_hotelServiceId_fkey" FOREIGN KEY ("hotelServiceId") REFERENCES "public"."HotelServices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HotelRooms" ADD CONSTRAINT "HotelRooms_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "public"."Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HotelRooms" ADD CONSTRAINT "HotelRooms_roomClassId_fkey" FOREIGN KEY ("roomClassId") REFERENCES "public"."RoomClasses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HotelRooms" ADD CONSTRAINT "HotelRooms_roomViewId_fkey" FOREIGN KEY ("roomViewId") REFERENCES "public"."RoomViews"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HotelRoomParts" ADD CONSTRAINT "HotelRoomParts_hotelRoomId_fkey" FOREIGN KEY ("hotelRoomId") REFERENCES "public"."HotelRooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HotelRoomParts" ADD CONSTRAINT "HotelRoomParts_roomPartId_fkey" FOREIGN KEY ("roomPartId") REFERENCES "public"."RoomParts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RoomBedSizes" ADD CONSTRAINT "RoomBedSizes_roomBedSizeTypeId_fkey" FOREIGN KEY ("roomBedSizeTypeId") REFERENCES "public"."RoomBedSizeTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HotelRoomPartBeds" ADD CONSTRAINT "HotelRoomPartBeds_hotelRoomPartId_fkey" FOREIGN KEY ("hotelRoomPartId") REFERENCES "public"."HotelRoomParts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HotelRoomPartBeds" ADD CONSTRAINT "HotelRoomPartBeds_roomBedSizeId_fkey" FOREIGN KEY ("roomBedSizeId") REFERENCES "public"."RoomBedSizes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HotelRoomNumbers" ADD CONSTRAINT "HotelRoomNumbers_hotelRoomId_fkey" FOREIGN KEY ("hotelRoomId") REFERENCES "public"."HotelRooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HotelRoomPrices" ADD CONSTRAINT "HotelRoomPrices_hotelRoomId_fkey" FOREIGN KEY ("hotelRoomId") REFERENCES "public"."HotelRooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SystemServices" ADD CONSTRAINT "SystemServices_systemServiceGroupId_fkey" FOREIGN KEY ("systemServiceGroupId") REFERENCES "public"."SystemServiceGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SystemServices" ADD CONSTRAINT "SystemServices_systemServiceTypeId_fkey" FOREIGN KEY ("systemServiceTypeId") REFERENCES "public"."SystemServiceTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HotelServices" ADD CONSTRAINT "HotelServices_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "public"."SystemServices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HotelServices" ADD CONSTRAINT "HotelServices_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "public"."Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HotelServiceAvailabilities" ADD CONSTRAINT "HotelServiceAvailabilities_hotelServiceId_fkey" FOREIGN KEY ("hotelServiceId") REFERENCES "public"."HotelServices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HotelServicePrices" ADD CONSTRAINT "HotelServicePrices_hotelServiceId_fkey" FOREIGN KEY ("hotelServiceId") REFERENCES "public"."HotelServices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HotelServiceOffers" ADD CONSTRAINT "HotelServiceOffers_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "public"."Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HotelFoods" ADD CONSTRAINT "HotelFoods_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "public"."Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HotelFoodCuisines" ADD CONSTRAINT "HotelFoodCuisines_hotelFoodId_fkey" FOREIGN KEY ("hotelFoodId") REFERENCES "public"."HotelFoods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HotelFoodCuisines" ADD CONSTRAINT "HotelFoodCuisines_cuisineId_fkey" FOREIGN KEY ("cuisineId") REFERENCES "public"."Cuisines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HotelFoodOfferTypes" ADD CONSTRAINT "HotelFoodOfferTypes_hotelFoodId_fkey" FOREIGN KEY ("hotelFoodId") REFERENCES "public"."HotelFoods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HotelFoodOfferTypes" ADD CONSTRAINT "HotelFoodOfferTypes_offerTypeId_fkey" FOREIGN KEY ("offerTypeId") REFERENCES "public"."OfferTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HotelFoodPrices" ADD CONSTRAINT "HotelFoodPrices_hotelFoodId_fkey" FOREIGN KEY ("hotelFoodId") REFERENCES "public"."HotelFoods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HotelAvailabilities" ADD CONSTRAINT "HotelAvailabilities_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "public"."Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EmailStatuses" ADD CONSTRAINT "EmailStatuses_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "public"."Partners"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PriceNotificationSchedules" ADD CONSTRAINT "PriceNotificationSchedules_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "public"."Partners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PriceNotificationSchedules" ADD CONSTRAINT "PriceNotificationSchedules_availabilityId_fkey" FOREIGN KEY ("availabilityId") REFERENCES "public"."HotelAvailabilities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PriceNotificationSchedules" ADD CONSTRAINT "PriceNotificationSchedules_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "public"."Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PriceNotificationSchedules" ADD CONSTRAINT "PriceNotificationSchedules_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "public"."Languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LocalizationResources" ADD CONSTRAINT "LocalizationResources_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "public"."Languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserHotels" ADD CONSTRAINT "UserHotels_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "public"."Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
