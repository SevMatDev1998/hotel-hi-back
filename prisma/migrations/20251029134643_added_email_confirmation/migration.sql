-- AlterTable
ALTER TABLE "public"."Users" ADD COLUMN     "emailConfirmationToken" VARCHAR(512),
ADD COLUMN     "emailConfirmationTokenExpiry" TIMESTAMP(3);
