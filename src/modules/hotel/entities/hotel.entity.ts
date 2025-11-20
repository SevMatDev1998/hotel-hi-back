import { Hotel as PrismaHotel } from '@prisma/client';

export class Hotel implements Partial<PrismaHotel> {
  id?: number;
  name: string;
  contactPerson?: string | null;
  phoneCode?: number | null;
  phoneNumber?: string | null;
  logoUrl?: string | null;
  websiteUrl?: string | null;
  countryId: number;
  state?: string | null;
  city?: string | null;
  registerCountryId?: number | null;
  registerState?: string | null;
  registerCity?: string | null;
  tinNumber?: string | null;
  director?: string | null;
  bankName?: string | null;
  bankAccountNumber?: string | null;
  bankPhoneCode?: number | null;
  bankPhoneNumber?: string | null;
  isActive?: boolean | null;
  currencyId: number;
  extractUrl?: string | null;
  bookingIntegration?: boolean;
  legalPerson?: string | null;
  priceSendEmail?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
