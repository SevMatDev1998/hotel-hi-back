import { Hotel as PrismaHotel } from '@prisma/client';

export class Hotel implements PrismaHotel {
  id: number;
  name: string;
  contactPerson: string;
  phoneCode: number;
  phoneNumber: string;
  logoUrl: string | null;
  websiteUrl: string | null;
  countryId: number;
  state: string;
  city: string;
  registerCountryId: number | null;
  registerState: string | null;
  registerCity: string | null;
  tinNumber: string;
  director: string;
  bankName: string;
  bankAccountNumber: string;
  bankPhoneCode: number;
  bankPhoneNumber: string;
  isActive: boolean;
  currencyId: number;
  extractUrl: string | null;
  bookingIntegration: boolean;
  legalPerson: string | null;
  priceSendEmail: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
