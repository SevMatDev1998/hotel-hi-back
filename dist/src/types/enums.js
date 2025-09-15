"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItem = exports.ServiceOfferStatus = exports.ServiceOffer = exports.HotelServiceHourlyAvailabilityType = exports.CompletenessStatus = exports.ServiceTypeAvailabilityBy = exports.ServicePayMethod = exports.BedType = exports.HotelRoomStatus = exports.PriceNotificationStatus = exports.PhoneCodesEnum = exports.PartnerStatus = exports.OrderSource = exports.OrderCheckinType = exports.HotelRoomReservationStatus = exports.OrderStatus = exports.LegalEntityType = exports.FoodType = exports.EmailSentStatus = void 0;
var EmailSentStatus;
(function (EmailSentStatus) {
    EmailSentStatus["SCHEDULED"] = "Scheduled";
    EmailSentStatus["DELIVERED"] = "Delivered";
    EmailSentStatus["NOT_DELIVERED"] = "NotDelivered";
})(EmailSentStatus || (exports.EmailSentStatus = EmailSentStatus = {}));
var FoodType;
(function (FoodType) {
    FoodType["BREAKFAST"] = "Breakfast";
    FoodType["LUNCH"] = "Lunch";
    FoodType["SUPPER"] = "Supper";
})(FoodType || (exports.FoodType = FoodType = {}));
var LegalEntityType;
(function (LegalEntityType) {
    LegalEntityType["LLC"] = "LLC";
    LegalEntityType["PE"] = "PE";
    LegalEntityType["CJSC"] = "CJSC";
    LegalEntityType["OJSC"] = "OJSC";
    LegalEntityType["NGO"] = "NGO";
})(LegalEntityType || (exports.LegalEntityType = LegalEntityType = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["RESERVED"] = "Reserved";
    OrderStatus["PENDING"] = "Pending";
    OrderStatus["APPROVED"] = "Approved";
    OrderStatus["ARRIVED"] = "Arrived";
    OrderStatus["COMPLETED"] = "Completed";
    OrderStatus["CANCELED"] = "Canceled";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var HotelRoomReservationStatus;
(function (HotelRoomReservationStatus) {
    HotelRoomReservationStatus["RESERVED"] = "Reserved";
    HotelRoomReservationStatus["PENDING"] = "Pending";
    HotelRoomReservationStatus["APPROVED"] = "Approved";
})(HotelRoomReservationStatus || (exports.HotelRoomReservationStatus = HotelRoomReservationStatus = {}));
var OrderCheckinType;
(function (OrderCheckinType) {
    OrderCheckinType["DEFINITIVE_DATES"] = "DefinitiveDates";
    OrderCheckinType["VARIABLE_DATES"] = "VariableDates";
})(OrderCheckinType || (exports.OrderCheckinType = OrderCheckinType = {}));
var OrderSource;
(function (OrderSource) {
    OrderSource["WEB"] = "Web";
    OrderSource["INTERNAL_TOOLS"] = "InternalTools";
})(OrderSource || (exports.OrderSource = OrderSource = {}));
var PartnerStatus;
(function (PartnerStatus) {
    PartnerStatus["DRAFT"] = "Draft";
    PartnerStatus["PENDING"] = "Pending";
    PartnerStatus["WAITING"] = "Waiting";
    PartnerStatus["APPROVED"] = "Approved";
})(PartnerStatus || (exports.PartnerStatus = PartnerStatus = {}));
var PhoneCodesEnum;
(function (PhoneCodesEnum) {
    PhoneCodesEnum["AM"] = "AM";
    PhoneCodesEnum["USA"] = "USA";
    PhoneCodesEnum["RUS"] = "RUS";
})(PhoneCodesEnum || (exports.PhoneCodesEnum = PhoneCodesEnum = {}));
var PriceNotificationStatus;
(function (PriceNotificationStatus) {
    PriceNotificationStatus["SCHEDULED"] = "Scheduled";
    PriceNotificationStatus["SENT"] = "Sent";
    PriceNotificationStatus["FAILED"] = "Failed";
    PriceNotificationStatus["WAITING_FOR_PARTNER_CONFIRMATION"] = "WaitingForPartnerConfirmation";
})(PriceNotificationStatus || (exports.PriceNotificationStatus = PriceNotificationStatus = {}));
var HotelRoomStatus;
(function (HotelRoomStatus) {
    HotelRoomStatus["ACTIVE"] = "Active";
    HotelRoomStatus["INCOMPLETE"] = "Incomplete";
    HotelRoomStatus["INACTIVE"] = "Inactive";
    HotelRoomStatus["DELETED"] = "Deleted";
})(HotelRoomStatus || (exports.HotelRoomStatus = HotelRoomStatus = {}));
var BedType;
(function (BedType) {
    BedType["MAIN"] = "Main";
    BedType["CRADLE"] = "Cradle";
    BedType["ADDITIONAL"] = "Additional";
})(BedType || (exports.BedType = BedType = {}));
var ServicePayMethod;
(function (ServicePayMethod) {
    ServicePayMethod["ONCE"] = "Once";
    ServicePayMethod["HOUR"] = "Hour";
    ServicePayMethod["DAY"] = "Day";
})(ServicePayMethod || (exports.ServicePayMethod = ServicePayMethod = {}));
var ServiceTypeAvailabilityBy;
(function (ServiceTypeAvailabilityBy) {
    ServiceTypeAvailabilityBy["SHARED"] = "Shared";
    ServiceTypeAvailabilityBy["ROOM"] = "Room";
})(ServiceTypeAvailabilityBy || (exports.ServiceTypeAvailabilityBy = ServiceTypeAvailabilityBy = {}));
var CompletenessStatus;
(function (CompletenessStatus) {
    CompletenessStatus["DRAFT"] = "Draft";
    CompletenessStatus["COMPLETED"] = "Completed";
})(CompletenessStatus || (exports.CompletenessStatus = CompletenessStatus = {}));
var HotelServiceHourlyAvailabilityType;
(function (HotelServiceHourlyAvailabilityType) {
    HotelServiceHourlyAvailabilityType["ALL_DAY"] = "AllDay";
    HotelServiceHourlyAvailabilityType["HOURS"] = "Hours";
})(HotelServiceHourlyAvailabilityType || (exports.HotelServiceHourlyAvailabilityType = HotelServiceHourlyAvailabilityType = {}));
var ServiceOffer;
(function (ServiceOffer) {
    ServiceOffer["PETS_ALLOWED"] = "PetsAllowed";
    ServiceOffer["ACCESS_GUESTS_NOT_STAYING_IN_ROOM"] = "AccessGuestsNotStayingInRoom";
    ServiceOffer["FOOD_FROM_OUTSIDE"] = "FoodFromOutside";
})(ServiceOffer || (exports.ServiceOffer = ServiceOffer = {}));
var ServiceOfferStatus;
(function (ServiceOfferStatus) {
    ServiceOfferStatus["ALLOWED"] = "Allowed";
    ServiceOfferStatus["REQUESTED"] = "Requested";
    ServiceOfferStatus["NOT_ALLOWED"] = "NotAllowed";
})(ServiceOfferStatus || (exports.ServiceOfferStatus = ServiceOfferStatus = {}));
var MenuItem;
(function (MenuItem) {
    MenuItem["HOTEL"] = "Hotel";
    MenuItem["ROOM"] = "Room";
    MenuItem["FOOD"] = "Food";
    MenuItem["SERVICE"] = "Service";
    MenuItem["PRICE"] = "Price";
    MenuItem["PARTNERS"] = "Partners";
    MenuItem["NOTIFICATION"] = "Notification";
})(MenuItem || (exports.MenuItem = MenuItem = {}));
//# sourceMappingURL=enums.js.map