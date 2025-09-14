"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceNotificationStatus = void 0;
var PriceNotificationStatus;
(function (PriceNotificationStatus) {
    PriceNotificationStatus[PriceNotificationStatus["Scheduled"] = 1] = "Scheduled";
    PriceNotificationStatus[PriceNotificationStatus["Sent"] = 2] = "Sent";
    PriceNotificationStatus[PriceNotificationStatus["Failed"] = 3] = "Failed";
    PriceNotificationStatus[PriceNotificationStatus["WaitingForPartnerConfirmation"] = 4] = "WaitingForPartnerConfirmation";
})(PriceNotificationStatus || (exports.PriceNotificationStatus = PriceNotificationStatus = {}));
//# sourceMappingURL=price-notification-status.enum.js.map