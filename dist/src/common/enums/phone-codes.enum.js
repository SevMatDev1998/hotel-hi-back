"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneCodeDescriptions = exports.PhoneCodesEnum = void 0;
var PhoneCodesEnum;
(function (PhoneCodesEnum) {
    PhoneCodesEnum[PhoneCodesEnum["AM"] = 1] = "AM";
    PhoneCodesEnum[PhoneCodesEnum["USA"] = 2] = "USA";
    PhoneCodesEnum[PhoneCodesEnum["RUS"] = 3] = "RUS";
})(PhoneCodesEnum || (exports.PhoneCodesEnum = PhoneCodesEnum = {}));
exports.PhoneCodeDescriptions = {
    [PhoneCodesEnum.AM]: '+374',
    [PhoneCodesEnum.USA]: '+1',
    [PhoneCodesEnum.RUS]: '+7',
};
//# sourceMappingURL=phone-codes.enum.js.map