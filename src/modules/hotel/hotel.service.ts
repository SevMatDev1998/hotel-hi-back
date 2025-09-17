import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Hotel } from './entities/hotel.entity';
import {
  GetHotelBaseInfoDto,
  UpdateHotelBaseInfoDto,
} from './dto/hotel-base-info.dto';
import {
  GetHotelLegalInfoDto,
  UpdateHotelLegalInfoDto,
} from './dto/hotel-legal-info.dto';

@Injectable()
export class HotelService {
  constructor(private readonly prisma: PrismaService) {}

  async createHotel(
    name: string,
    userId: number,
    countryId: number = 1,
    currencyId: number = 1,
  ): Promise<Hotel> {
    const hotel = await this.prisma.hotel.create({
      data: {
        name,
        contactPerson: 'Hotel Owner', // Default value
        phoneCode: 374, // Default to Armenia
        phoneNumber: '00000000', // Placeholder
        countryId,
        state: 'Not specified', // Default value
        city: 'Not specified', // Default value
        tinNumber: '00000000', // Placeholder
        director: 'Hotel Director', // Default value
        bankName: 'Not specified', // Default value
        bankAccountNumber: '00000000', // Placeholder
        bankPhoneCode: 374, // Default
        bankPhoneNumber: '00000000', // Placeholder
        currencyId,
        priceSendEmail: 'noreply@hotel.com', // Valid email placeholder
        isActive: false,
        bookingIntegration: false,
      },
    });

    // Create the UserHotel relationship
    await this.prisma.userHotel.create({
      data: {
        userId,
        hotelId: hotel.id,
      },
    });

    return hotel;
  }

  async findById(id: number): Promise<Hotel | null> {
    return this.prisma.hotel.findUnique({
      where: { id },
    });
  }

  async findByUserId(userId: number): Promise<Hotel[]> {
    const userHotels = await this.prisma.userHotel.findMany({
      where: { userId },
      include: { hotel: true },
    });

    return userHotels.map((userHotel) => userHotel.hotel as Hotel);
  }

  // Base Information Methods
  async getHotelBaseInfo(hotelId: number): Promise<GetHotelBaseInfoDto> {
    const hotel = await this.prisma.hotel.findUnique({
      where: { id: hotelId },
      select: {
        id: true,
        contactPerson: true,
        phoneCode: true,
        phoneNumber: true,
        countryId: true,
        state: true,
        city: true,
        currencyId: true,
      },
    });

    if (!hotel) {
      throw new NotFoundException(`Hotel with ID ${hotelId} not found`);
    }

    return hotel;
  }

  async updateHotelBaseInfo(
    hotelId: number,
    updateData: UpdateHotelBaseInfoDto,
  ): Promise<GetHotelBaseInfoDto> {
    const hotel = await this.prisma.hotel.findUnique({
      where: { id: hotelId },
    });

    if (!hotel) {
      throw new NotFoundException(`Hotel with ID ${hotelId} not found`);
    }

    // Update only the fields that are allowed in UpdateHotelBaseInfoDto
    const updatedHotel = await this.prisma.hotel.update({
      where: { id: hotelId },
      data: updateData,
      select: {
        id: true,
        name: true,
        contactPerson: true,
        phoneCode: true,
        phoneNumber: true,
        logoUrl: true,
        websiteUrl: true,
        countryId: true,
        state: true,
        city: true,
        priceSendEmail: true,
        isActive: true,
        bookingIntegration: true,
        currencyId: true,
      },
    });

    return updatedHotel;
  }

  // Legal Information Methods
  async getHotelLegalInfo(hotelId: number): Promise<GetHotelLegalInfoDto> {
    const hotel = await this.prisma.hotel.findUnique({
      where: { id: hotelId },
      select: {
        id: true,
        registerCountryId: true,
        registerState: true,
        registerCity: true,
        tinNumber: true,
        director: true,
        legalPerson: true,
        extractUrl: true,
      },
    });

    if (!hotel) {
      throw new NotFoundException(`Hotel with ID ${hotelId} not found`);
    }

    return hotel;
  }

  async updateHotelLegalInfo(
    hotelId: number,
    updateData: UpdateHotelLegalInfoDto,
  ): Promise<GetHotelLegalInfoDto> {
    const hotel = await this.prisma.hotel.findUnique({
      where: { id: hotelId },
    });

    if (!hotel) {
      throw new NotFoundException(`Hotel with ID ${hotelId} not found`);
    }

    // Update only the fields that are allowed in UpdateHotelLegalInfoDto
    const updatedHotel = await this.prisma.hotel.update({
      where: { id: hotelId },
      data: updateData,
      select: {
        id: true,
        registerCountryId: true,
        registerState: true,
        registerCity: true,
        tinNumber: true,
        director: true,
        legalPerson: true,
        extractUrl: true,
      },
    });

    return updatedHotel;
  }
}
