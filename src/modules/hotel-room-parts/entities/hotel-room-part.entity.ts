import { HotelRoomPart as PrismaHotelRoomPart } from '@prisma/client';

export type HotelRoomPart = PrismaHotelRoomPart;

export interface HotelRoomPartWithRelations extends HotelRoomPart {
  roomPart?: {
    id: number;
    name: string;
    nameEn?: string;
    nameRu?: string;
    nameArm?: string;
    createdAt: Date;
    updatedAt: Date;
  };
  hotelRoom?: {
    id: number;
    name: string;
    hotelId: number;
    hotel?: {
      id: number;
      name: string;
      nameEn?: string;
      nameRu?: string;
      nameArm?: string;
    };
  };
}
