import { HotelRoom as PrismaHotelRoom } from '@prisma/client';

export class HotelRoomEntity implements PrismaHotelRoom {
  id: number;
  name: string;
  hotelId: number;
  roomClassId: number;
  roomViewId: number | null;
  numbers: string;
  area: string;
  mainGuestQuantity: number;
  additionalGuestQuantity: number;
  status: import('@prisma/client').HotelRoomStatus;
  roomNumberQuantity: number;
  completeness: import('@prisma/client').CompletenessStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
