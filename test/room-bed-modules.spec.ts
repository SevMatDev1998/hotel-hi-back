import { Test, TestingModule } from '@nestjs/testing';
import { RoomBedTypesService } from '../src/modules/room-bed-types/room-bed-types.service';
import { RoomBedSizesService } from '../src/modules/room-bed-sizes/room-bed-sizes.service';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Room Bed Modules Test', () => {
  let roomBedTypesService: RoomBedTypesService;
  let roomBedSizesService: RoomBedSizesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomBedTypesService,
        RoomBedSizesService,
        {
          provide: PrismaService,
          useValue: {
            roomBedType: {
              findMany: jest.fn().mockResolvedValue([
                { id: 1, name: 'Queen', createdAt: new Date(), updatedAt: new Date() },
                { id: 2, name: 'King', createdAt: new Date(), updatedAt: new Date() },
              ]),
            },
            roomBedSize: {
              findMany: jest.fn().mockResolvedValue([
                { id: 1, size: '160', createdAt: new Date(), updatedAt: new Date() },
                { id: 2, size: '180', createdAt: new Date(), updatedAt: new Date() },
              ]),
            },
          },
        },
      ],
    }).compile();

    roomBedTypesService = module.get<RoomBedTypesService>(RoomBedTypesService);
    roomBedSizesService = module.get<RoomBedSizesService>(RoomBedSizesService);
  });

  describe('RoomBedTypesService', () => {
    it('should return all room bed types', async () => {
      const result = await roomBedTypesService.findAll();
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Queen');
      expect(result[1].name).toBe('King');
    });
  });

  describe('RoomBedSizesService', () => {
    it('should return all room bed sizes', async () => {
      const result = await roomBedSizesService.findAll();
      expect(result).toHaveLength(2);
      expect(result[0].size).toBe('160');
      expect(result[1].size).toBe('180');
    });
  });
});
