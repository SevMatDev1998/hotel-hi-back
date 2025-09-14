"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSource = exports.OrderCheckinType = exports.HotelRoomReservationStatus = exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["Reserved"] = 1] = "Reserved";
    OrderStatus[OrderStatus["Pending"] = 2] = "Pending";
    OrderStatus[OrderStatus["Approved"] = 3] = "Approved";
    OrderStatus[OrderStatus["Arrived"] = 4] = "Arrived";
    OrderStatus[OrderStatus["Completed"] = 5] = "Completed";
    OrderStatus[OrderStatus["Canceled"] = 6] = "Canceled";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var HotelRoomReservationStatus;
(function (HotelRoomReservationStatus) {
    HotelRoomReservationStatus[HotelRoomReservationStatus["Reserved"] = 1] = "Reserved";
    HotelRoomReservationStatus[HotelRoomReservationStatus["Pending"] = 2] = "Pending";
    HotelRoomReservationStatus[HotelRoomReservationStatus["Approved"] = 3] = "Approved";
})(HotelRoomReservationStatus || (exports.HotelRoomReservationStatus = HotelRoomReservationStatus = {}));
var OrderCheckinType;
(function (OrderCheckinType) {
    OrderCheckinType[OrderCheckinType["DefinitiveDates"] = 1] = "DefinitiveDates";
    OrderCheckinType[OrderCheckinType["VariableDates"] = 2] = "VariableDates";
})(OrderCheckinType || (exports.OrderCheckinType = OrderCheckinType = {}));
var OrderSource;
(function (OrderSource) {
    OrderSource[OrderSource["Web"] = 1] = "Web";
    OrderSource[OrderSource["InternalTools"] = 2] = "InternalTools";
})(OrderSource || (exports.OrderSource = OrderSource = {}));
//# sourceMappingURL=order.enum.js.map