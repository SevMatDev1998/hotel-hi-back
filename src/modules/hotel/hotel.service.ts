import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Hotel as PrismaHotel } from '@prisma/client';

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
  constructor(private readonly prisma: PrismaService) { }

  async createHotel(
    name: string,
    userId: number,
    countryId: number = 1,
    currencyId: number = 1,
  ): Promise<PrismaHotel> {
    const hotel = await this.prisma.hotel.create({
      data: {
        name,
        countryId,
        currencyId,
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

  async findById(id: number): Promise<PrismaHotel | null> {
    return this.prisma.hotel.findUnique({
      where: { id },
    });
  }

  async findNavigationStep(id: number): Promise<number> {
    const hotel = await this.prisma.hotel.findUnique({
      where: { id },
    });
    if (hotel) {
      return hotel.navigationAccessStep as number;
    }
    return 0;
  }

  async updateNavigationStep(id: number, stepNumber: number): Promise<number> {
    const hotel = await this.prisma.hotel.update({
      where: { id },
      data: { navigationAccessStep: stepNumber },
    });
    return hotel.navigationAccessStep as number;
  }

  async findByUserId(userId: number): Promise<PrismaHotel | null> {
    const userHotel = await this.prisma.userHotel.findFirst({
      where: { userId },
      include: { hotel: true },
    });
    return userHotel ? userHotel.hotel : null;
  }

  // Base Information Methods
  async getHotelBaseInfo(hotelId: number): Promise<GetHotelBaseInfoDto> {
    const hotel = await this.prisma.hotel.findUnique({
      where: { id: hotelId },
      select: {
        name: true,
        countryId: true,
        city: true,
        contactPerson: true,
        phoneCode: true,
        phoneNumber: true,
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
  async getHotelLegalInfo(
    hotelId: number,
  ): Promise<
    Pick<
      PrismaHotel,
      | 'legalPerson'
      | 'registerCountryId'
      | 'registerCity'
      | 'tinNumber'
      | 'director'
      | 'priceSendEmail'
    >
  > {
    const hotel = await this.prisma.hotel.findUnique({
      where: { id: hotelId },
      select: {
        id: true,
        legalPerson: true,
        registerCountryId: true,
        registerCity: true,
        tinNumber: true,
        director: true,
        priceSendEmail: true,
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
        legalPerson: true,
        registerCountryId: true,
        registerCity: true,
        tinNumber: true,
        director: true,
        priceSendEmail: true,
      },
    });

    return updatedHotel;
  }
}
