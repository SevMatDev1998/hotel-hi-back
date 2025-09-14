export enum PhoneCodesEnum {
  AM = 1,
  USA = 2,
  RUS = 3,
}

export const PhoneCodeDescriptions = {
  [PhoneCodesEnum.AM]: '+374',
  [PhoneCodesEnum.USA]: '+1',
  [PhoneCodesEnum.RUS]: '+7',
} as const;
