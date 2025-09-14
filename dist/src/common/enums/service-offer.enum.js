"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceOfferStatus = exports.ServiceOffer = void 0;
var ServiceOffer;
(function (ServiceOffer) {
    ServiceOffer[ServiceOffer["PetsAllowed"] = 1] = "PetsAllowed";
    ServiceOffer[ServiceOffer["AccessGuestsNotStayingInRoom"] = 2] = "AccessGuestsNotStayingInRoom";
    ServiceOffer[ServiceOffer["FoodFromOutside"] = 3] = "FoodFromOutside";
})(ServiceOffer || (exports.ServiceOffer = ServiceOffer = {}));
var ServiceOfferStatus;
(function (ServiceOfferStatus) {
    ServiceOfferStatus[ServiceOfferStatus["Allowed"] = 1] = "Allowed";
    ServiceOfferStatus[ServiceOfferStatus["Requested"] = 2] = "Requested";
    ServiceOfferStatus[ServiceOfferStatus["NotAllowed"] = 3] = "NotAllowed";
})(ServiceOfferStatus || (exports.ServiceOfferStatus = ServiceOfferStatus = {}));
//# sourceMappingURL=service-offer.enum.js.map