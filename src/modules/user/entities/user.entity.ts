import { User as PrismaUser } from '@prisma/client';

export class User implements PrismaUser {
  id: number;
  userName: string | null;
  normalizedUserName: string | null;
  email: string | null;
  normalizedEmail: string | null;
  emailConfirmed: boolean;
  passwordHash: string | null;
  securityStamp: string | null;
  concurrencyStamp: string;
  phoneNumber: string | null;
  emailConfirmationToken: string | null;
  emailConfirmationTokenExpiry: Date | null;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: Date | null;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  defaultLanguageId: number;
  createdAt: Date;
  updatedAt: Date;
}
