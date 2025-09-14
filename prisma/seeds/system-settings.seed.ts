import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedSystemSettings() {
  console.log('⚙️ Загружаем системные настройки...');

  // Системные настройки
  const systemSettings = [
    // Menu sequences
    { key: 'MenuItemSequence_Home', value: '1' },
    { key: 'MenuItemSequence_Hotels', value: '2' },
    { key: 'MenuItemSequence_Restaurants', value: '3' },
    { key: 'MenuItemSequence_Tours', value: '4' },
    { key: 'MenuItemSequence_Transport', value: '5' },
    { key: 'MenuItemSequence_Contact', value: '6' },
    { key: 'MenuItemSequence_About', value: '7' },
    { key: 'MenuItemSequence_Blog', value: '8' },
    { key: 'MenuItemSequence_Gallery', value: '9' },
    { key: 'MenuItemSequence_Services', value: '10' },

    // System configuration
    { key: 'DefaultLanguage', value: 'en' },
    { key: 'DefaultCurrency', value: 'USD' },
    { key: 'DefaultTimeZone', value: 'UTC' },
    { key: 'SiteTitle', value: 'Hotel Hivi' },
    { key: 'SiteDescription', value: 'Premium hotel booking system' },
    { key: 'MaxUploadSize', value: '10485760' }, // 10MB
    { key: 'SessionTimeout', value: '3600' }, // 1 hour
    { key: 'MaxLoginAttempts', value: '5' },
    { key: 'PasswordMinLength', value: '8' },
    { key: 'PasswordRequireSymbols', value: 'true' },

    // Email settings
    { key: 'SMTPHost', value: 'localhost' },
    { key: 'SMTPPort', value: '587' },
    { key: 'SMTPUsername', value: '' },
    { key: 'SMTPPassword', value: '' },
    { key: 'SMTPFromEmail', value: 'noreply@hotelhivi.com' },
    { key: 'SMTPFromName', value: 'Hotel Hivi' },

    // Payment settings
    { key: 'PaymentMethod_Cash', value: 'true' },
    { key: 'PaymentMethod_Card', value: 'true' },
    { key: 'PaymentMethod_Transfer', value: 'true' },
    { key: 'PaymentMethod_Online', value: 'true' },
    { key: 'DefaultPaymentMethod', value: 'Cash' },

    // Booking settings
    { key: 'BookingConfirmationRequired', value: 'true' },
    { key: 'BookingCancellationHours', value: '24' },
    { key: 'BookingAdvanceDays', value: '365' },
    { key: 'BookingMinNights', value: '1' },
    { key: 'BookingMaxNights', value: '30' },

    // Search settings
    { key: 'SearchResultsPerPage', value: '20' },
    { key: 'SearchDefaultRadius', value: '10' },
    { key: 'SearchMaxRadius', value: '100' },

    // Image settings
    { key: 'ImageQuality', value: '85' },
    { key: 'ThumbnailWidth', value: '300' },
    { key: 'ThumbnailHeight', value: '200' },
    { key: 'MediumImageWidth', value: '800' },
    { key: 'MediumImageHeight', value: '600' },
    { key: 'LargeImageWidth', value: '1200' },
    { key: 'LargeImageHeight', value: '800' },

    // Cache settings
    { key: 'CacheEnabled', value: 'true' },
    { key: 'CacheTimeout', value: '3600' },
    { key: 'CacheMemoryLimit', value: '128' },

    // Social media
    { key: 'Facebook_URL', value: '' },
    { key: 'Twitter_URL', value: '' },
    { key: 'Instagram_URL', value: '' },
    { key: 'LinkedIn_URL', value: '' },
    { key: 'YouTube_URL', value: '' },

    // Contact information
    { key: 'CompanyName', value: 'Hotel Hivi' },
    { key: 'CompanyAddress', value: '' },
    { key: 'CompanyPhone', value: '' },
    { key: 'CompanyEmail', value: 'info@hotelhivi.com' },
    { key: 'CompanyWebsite', value: 'https://hotelhivi.com' },

    // Business settings
    { key: 'BusinessHours_Start', value: '08:00' },
    { key: 'BusinessHours_End', value: '22:00' },
    { key: 'BusinessDays', value: 'Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday' },

    // Notification settings
    { key: 'NotifyNewBooking', value: 'true' },
    { key: 'NotifyBookingCancellation', value: 'true' },
    { key: 'NotifyPaymentReceived', value: 'true' },
    { key: 'NotifySystemErrors', value: 'true' },

    // Security settings
    { key: 'EnableTwoFactorAuth', value: 'false' },
    { key: 'AllowGuestBooking', value: 'true' },
    { key: 'RequireEmailVerification', value: 'true' },
    { key: 'EnableCaptcha', value: 'false' },

    // API settings
    { key: 'APIRateLimit', value: '1000' },
    { key: 'APITimeout', value: '30' },
    { key: 'EnableAPILogging', value: 'true' },
  ];

  // Создаем системные настройки
  for (const setting of systemSettings) {
    await prisma.systemStateSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: {
        key: setting.key,
        value: setting.value,
      },
    });
  }

  console.log('✅ Системные настройки загружены!');
}
