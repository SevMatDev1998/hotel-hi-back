"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelServiceHourlyAvailabilityType = exports.CompletenessStatus = exports.ServiceTypeAvailabilityBy = exports.ServicePayMethod = exports.BedType = exports.HotelRoomStatus = void 0;
var HotelRoomStatus;
(function (HotelRoomStatus) {
    HotelRoomStatus[HotelRoomStatus["Active"] = 0] = "Active";
    HotelRoomStatus[HotelRoomStatus["Incomplete"] = 1] = "Incomplete";
    HotelRoomStatus[HotelRoomStatus["Inactive"] = 2] = "Inactive";
    HotelRoomStatus[HotelRoomStatus["Deleted"] = 3] = "Deleted";
})(HotelRoomStatus || (exports.HotelRoomStatus = HotelRoomStatus = {}));
var BedType;
(function (BedType) {
    BedType[BedType["Main"] = 1] = "Main";
    BedType[BedType["Cradle"] = 2] = "Cradle";
    BedType[BedType["Additional"] = 3] = "Additional";
})(BedType || (exports.BedType = BedType = {}));
var ServicePayMethod;
(function (ServicePayMethod) {
    ServicePayMethod[ServicePayMethod["Once"] = 1] = "Once";
    ServicePayMethod[ServicePayMethod["Hour"] = 2] = "Hour";
    ServicePayMethod[ServicePayMethod["Day"] = 24] = "Day";
})(ServicePayMethod || (exports.ServicePayMethod = ServicePayMethod = {}));
var ServiceTypeAvailabilityBy;
(function (ServiceTypeAvailabilityBy) {
    ServiceTypeAvailabilityBy[ServiceTypeAvailabilityBy["Shared"] = 1] = "Shared";
    ServiceTypeAvailabilityBy[ServiceTypeAvailabilityBy["Room"] = 2] = "Room";
})(ServiceTypeAvailabilityBy || (exports.ServiceTypeAvailabilityBy = ServiceTypeAvailabilityBy = {}));
var CompletenessStatus;
(function (CompletenessStatus) {
    CompletenessStatus[CompletenessStatus["Draft"] = 1] = "Draft";
    CompletenessStatus[CompletenessStatus["Completed"] = 2] = "Completed";
})(CompletenessStatus || (exports.CompletenessStatus = CompletenessStatus = {}));
var HotelServiceHourlyAvailabilityType;
(function (HotelServiceHourlyAvailabilityType) {
    HotelServiceHourlyAvailabilityType[HotelServiceHourlyAvailabilityType["AllDay"] = 1] = "AllDay";
    HotelServiceHourlyAvailabilityType[HotelServiceHourlyAvailabilityType["Hours"] = 2] = "Hours";
})(HotelServiceHourlyAvailabilityType || (exports.HotelServiceHourlyAvailabilityType = HotelServiceHourlyAvailabilityType = {}));
//# sourceMappingURL=room.enum.js.map