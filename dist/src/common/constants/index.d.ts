export { CacheConstants } from './cache.constants';
export { RoleEnumConstants } from './role-enum.constants';
export { SessionConstants } from './session.constants';
export { SystemConstants } from './system.constants';
export declare const Constants: {
    readonly Cache: {
        readonly LocalizedResourcesKey: "LocalizedResources";
    };
    readonly RoleEnum: {
        readonly Admin: "Admin";
    };
    readonly Session: {
        readonly DefaultHotelIdKey: "HotelId";
        readonly LanguageIdKey: "LanguageId";
        readonly HotelStateKey: "HotelState";
        readonly LanguageCultureKey: "LanguageCulture";
        readonly ExpiredError: "Session has expired";
        readonly DefaultLanguageCulture: "hy";
    };
    readonly System: {
        readonly Unknown: "Unknown";
        readonly CommisionPercent: 15;
        readonly ArmenianCulture: "hy-AM";
        readonly AdditionalGuest: "AdditionalGuest";
    };
};
