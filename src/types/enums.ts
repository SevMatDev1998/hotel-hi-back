// Enums based on Prisma schema enums

export enum EmailSentStatus {
  SCHEDULED = 'Scheduled',
  DELIVERED = 'Delivered',
  NOT_DELIVERED = 'NotDelivered',
}

export enum FoodType {
  BREAKFAST = 'Breakfast',
  LUNCH = 'Lunch',
  SUPPER = 'Supper',
}

export enum LegalEntityType {
  LLC = 'LLC',
  PE = 'PE', // Private Entrepreneur
  CJSC = 'CJSC',
  OJSC = 'OJSC',
  NGO = 'NGO',
}

export enum OrderStatus {
  RESERVED = 'Reserved',
  PENDING = 'Pending',
  APPROVED = 'Approved',
  ARRIVED = 'Arrived',
  COMPLETED = 'Completed',
  CANCELED = 'Canceled',
}

export enum HotelRoomReservationStatus {
  RESERVED = 'Reserved',
  PENDING = 'Pending',
  APPROVED = 'Approved',
}

export enum OrderCheckinType {
  DEFINITIVE_DATES = 'DefinitiveDates',
  VARIABLE_DATES = 'VariableDates',
}

export enum OrderSource {
  WEB = 'Web',
  INTERNAL_TOOLS = 'InternalTools',
}

export enum PartnerStatus {
  DRAFT = 'Draft',
  PENDING = 'Pending',
  WAITING = 'Waiting',
  APPROVED = 'Approved',
}

export enum PhoneCodesEnum {
  AM = 'AM',    // +374
  USA = 'USA',  // +1
  RUS = 'RUS',  // +7
}

export enum PriceNotificationStatus {
  SCHEDULED = 'Scheduled',
  SENT = 'Sent',
  FAILED = 'Failed',
  WAITING_FOR_PARTNER_CONFIRMATION = 'WaitingForPartnerConfirmation',
}

export enum HotelRoomStatus {
  ACTIVE = 'Active',
  INCOMPLETE = 'Incomplete',
  INACTIVE = 'Inactive',
  DELETED = 'Deleted',
}

export enum BedType {
  MAIN = 'Main',
  CRADLE = 'Cradle',
  ADDITIONAL = 'Additional',
}

export enum ServicePayMethod {
  ONCE = 'Once',
  HOUR = 'Hour',
  DAY = 'Day',
}

export enum ServiceTypeAvailabilityBy {
  SHARED = 'Shared',
  ROOM = 'Room',
}

export enum CompletenessStatus {
  DRAFT = 'Draft',
  COMPLETED = 'Completed',
}

export enum HotelServiceHourlyAvailabilityType {
  ALL_DAY = 'AllDay',
  HOURS = 'Hours',
}

export enum ServiceOffer {
  PETS_ALLOWED = 'PetsAllowed',
  ACCESS_GUESTS_NOT_STAYING_IN_ROOM = 'AccessGuestsNotStayingInRoom',
  FOOD_FROM_OUTSIDE = 'FoodFromOutside',
}

export enum ServiceOfferStatus {
  ALLOWED = 'Allowed',
  REQUESTED = 'Requested',
  NOT_ALLOWED = 'NotAllowed',
}

export enum MenuItem {
  HOTEL = 'Hotel',
  ROOM = 'Room',
  FOOD = 'Food',
  SERVICE = 'Service',
  PRICE = 'Price',
  PARTNERS = 'Partners',
  NOTIFICATION = 'Notification',
}
