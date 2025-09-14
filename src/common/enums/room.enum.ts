export enum HotelRoomStatus {
  Active = 0,
  Incomplete = 1,
  Inactive = 2, // Fixed typo from C# "Incative"
  Deleted = 3,
}

export enum BedType {
  Main = 1,
  Cradle = 2,
  Additional = 3, // Note: marked as ExcludeFromList in C#
}

export enum ServicePayMethod {
  Once = 1,
  Hour = 2,
  Day = 24,
}

export enum ServiceTypeAvailabilityBy {
  Shared = 1,
  Room = 2,
}

export enum CompletenessStatus {
  Draft = 1,
  Completed = 2,
}

export enum HotelServiceHourlyAvailabilityType {
  AllDay = 1,
  Hours = 2,
}
