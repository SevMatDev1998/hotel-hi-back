import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedLocalization() {
  console.log('🌱 Начинаем загрузку данных локализации...');

  // Сначала создаем языки
  const languages = await Promise.all([
    prisma.language.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        name: 'Armenian',
        code: 'hy',
      },
    }),
    prisma.language.upsert({
      where: { id: 2 },
      update: {},
      create: {
        id: 2,
        name: 'English',
        code: 'en',
      },
    }),
  ]);

  console.log('✅ Языки созданы:', languages.map((l) => l.name).join(', '));

  // Данные локализации (конвертированные из C#)
  const localizationData = [
    {
      languageId: 2,
      key: 'AboutHeading',
      value:
        'The FREE version of the HOTEL HAYV hotel management system allows you to create a price list in a very simple and accessible way, to share the price list and the terms of cooperation with partners, to automatically notify partners of changes in the price list.',
    },
    {
      languageId: 1,
      key: 'AboutHeading',
      value:
        'ՀՈԹԵԼ ՀԱՅՎ հյուրանոցի կառավարման համակարգի ԱՆՎՃԱՐ տարբերակը հանարվորություն է տալիս ստեղծել գնացուցակ շատ պարզ և հասանելի տարբերակով կիսվել գնացուցակով և համագործակցության պայմաններով գործընկերների հետ ինքնաշխատ ծանուցել գործընկերներներին գնացուցակում կատարած փոփոխությունների մաին:\r\n',
    },

    { languageId: 2, key: 'CreateAccount', value: 'Create Account' },
    { languageId: 1, key: 'CreateAccount', value: 'Ստեղծել հաշիվ' },

    { languageId: 2, key: 'LoginAccount', value: 'Login Account' },
    { languageId: 1, key: 'LoginAccount', value: 'Մուտք գործել' },

    { languageId: 2, key: 'Register', value: 'Register' },
    { languageId: 1, key: 'Register', value: 'Գրանցվել' },

    { languageId: 2, key: 'HotelName', value: 'Hotel Name' },
    { languageId: 1, key: 'HotelName', value: 'Հյուրանոցի անվանում' },

    { languageId: 2, key: 'Email', value: 'Email' },
    { languageId: 1, key: 'Email', value: 'էլ-հասցե' },

    { languageId: 2, key: 'Password', value: 'Password' },
    { languageId: 1, key: 'Password', value: 'Գաղտնաբառ' },

    { languageId: 2, key: 'RepeatPassword', value: 'Repeat password' },
    { languageId: 1, key: 'RepeatPassword', value: 'Կրկնել գաղտնաբառը' },

    {
      languageId: 2,
      key: 'EmailVerificationWasSentMessage',
      value:
        'The address has not yet been identified. Please pass the authentication sent to the email address',
    },
    {
      languageId: 1,
      key: 'EmailVerificationWasSentMessage',
      value:
        'Էլ հասցեն նույնականացված չէ: Խնդրում ենք անցնել էլ հասցեին ուղարկված նույնականցումը ',
    },

    {
      languageId: 2,
      key: 'EmailVerifiedMessage',
      value:
        'Your email address was confirmed, now you can login to your account',
    },
    { languageId: 1, key: 'EmailVerifiedMessage', value: 'Email verified message' },

    { languageId: 2, key: 'AlreadyInTheSystem', value: 'Already in the system' },
    { languageId: 1, key: 'AlreadyInTheSystem', value: 'Գրանցված եմ համակարգում' },

    { languageId: 2, key: 'PasswordRequirements', value: 'Password requirements' },
    { languageId: 1, key: 'PasswordRequirements', value: 'Գաղտնաբառի պահանջներ' },

    {
      languageId: 2,
      key: 'PasswordRequirementSpecialChar',
      value: 'Password requirement special char',
    },
    {
      languageId: 1,
      key: 'PasswordRequirementSpecialChar',
      value: 'Մեկ հատուկ նշան',
    },

    { languageId: 2, key: 'PasswordRequirementMinSixChars', value: 'Min 6 characters' },
    { languageId: 1, key: 'PasswordRequirementMinSixChars', value: 'Նվազագույնը 6 նիշ' },

    {
      languageId: 2,
      key: 'PasswordRequirementOneDigit',
      value: 'One number (2 are recommended)',
    },
    {
      languageId: 1,
      key: 'PasswordRequirementOneDigit',
      value: 'Մեկ թիվ (խորհուրդ է տրվում 2)',
    },

    { languageId: 2, key: 'Save', value: 'Save' },
    { languageId: 1, key: 'Save', value: 'Պահպանել' },

    { languageId: 2, key: 'HomePanelHeadingInfo', value: 'Home panel heading info' },
    { languageId: 1, key: 'HomePanelHeadingInfo', value: 'Home panel heading info' },

    { languageId: 2, key: 'HomePanelHeading', value: 'Home panel heading' },
    { languageId: 1, key: 'HomePanelHeading', value: 'Home panel heading' },

    {
      languageId: 2,
      key: 'AfterRegisterConfirmEmailText',
      value:
        'The address has not yet been identified. Please pass the authentication sent to the email address',
    },
    {
      languageId: 1,
      key: 'AfterRegisterConfirmEmailText',
      value:
        'Էլ հասցեն նույնականացված չէ: Խնդրում ենք անցնել էլ հասցեին ուղարկված նույնականցումը ',
    },

    { languageId: 2, key: 'WebPartTitle', value: 'Website and direct bookings' },
    { languageId: 1, key: 'WebPartTitle', value: 'Կայք և ուղիղ ամրագրումներ' },

    { languageId: 2, key: 'LegalDataOfTheHotel', value: 'Legal data of the hotel' },
    { languageId: 1, key: 'LegalDataOfTheHotel', value: 'Հյուրանոցի իրավաբանական տվյալներ' },

    {
      languageId: 2,
      key: 'BasicInformationOfTheHotel',
      value: 'Basic information of the hotel',
    },
    {
      languageId: 1,
      key: 'BasicInformationOfTheHotel',
      value: 'Հյուրանոցի հիմնական տվյալներ',
    },

    {
      languageId: 2,
      key: 'MainDetailsHeading2Info',
      value:
        'You will have the opportunity to receive reservations during the mentioned period. Also to make changes through price regulation\r\n',
    },
    {
      languageId: 1,
      key: 'MainDetailsHeading2Info',
      value:
        'Նշված ժամանակահատվածում վերապահումներ ստանալու հնարավորություն կունենաք։ Նաև գների կարգավորման միջոցով փոփոխություններ կատարել\r\n',
    },

    { languageId: 2, key: 'ImageType', value: 'jpeg, png, max 5 mb' },
    { languageId: 1, key: 'ImageType', value: 'jpeg, png, առավելագույնը 5 mb' },

    {
      languageId: 2,
      key: 'CurrencyInfoText',
      value: 'The system will accept your pricing policy in the given currency.',
    },
    {
      languageId: 1,
      key: 'CurrencyInfoText',
      value: 'Համակարգը կընդունի ձեր գնային քաղաքականությունը տվյալ արժույթով:',
    },

    { languageId: 2, key: 'PhoneNumber', value: 'Phone Number' },
    { languageId: 1, key: 'PhoneNumber', value: 'Հեռախոսահամար' },

    { languageId: 2, key: 'Logo', value: 'Logo' },
    { languageId: 1, key: 'Logo', value: 'Ապրանքային նշան (logo)' },

    { languageId: 2, key: 'HotelAddress', value: 'Hotel Address' },
    { languageId: 1, key: 'HotelAddress', value: 'Հյուրանոցի հասցե' },

    { languageId: 2, key: 'Currency', value: 'Currency' },
    { languageId: 1, key: 'Currency', value: 'Արժույթ' },

    { languageId: 2, key: 'ContactPerson', value: 'Contact person' },
    { languageId: 1, key: 'ContactPerson', value: 'Կոնտակտային անձ' },

    { languageId: 2, key: 'State', value: 'State' },
    { languageId: 1, key: 'State', value: 'Մարզ' },

    { languageId: 2, key: 'City', value: 'City' },
    { languageId: 1, key: 'City', value: 'Քաղաք' },

    { languageId: 2, key: 'Country', value: 'Country of registration' },
    { languageId: 1, key: 'Country', value: 'Գրանցման երկիրը' },

    { languageId: 2, key: 'Upload', value: 'Upload' },
    { languageId: 1, key: 'Upload', value: 'Վերբեռնել' },

    { languageId: 2, key: 'EmailNotConfirmed', value: 'Email not confirmed' },
    { languageId: 1, key: 'EmailNotConfirmed', value: 'Էլ-փոստը հաստատված չէ' },

    // UI Elements
    { languageId: 2, key: 'ButtonCreate', value: 'Create' },
    { languageId: 1, key: 'ButtonCreate', value: 'Ստեղծել' },

    { languageId: 2, key: 'ButtonAdd', value: 'Add' },
    { languageId: 1, key: 'ButtonAdd', value: 'Ավելացնել' },

    { languageId: 2, key: 'ButtonSave', value: 'Save' },
    { languageId: 1, key: 'ButtonSave', value: 'Պահպանել' },

    { languageId: 2, key: 'ButtonDelete', value: 'Delete' },
    { languageId: 1, key: 'ButtonDelete', value: 'Ջնջել' },

    { languageId: 2, key: 'ButtonCancel', value: 'Cancel' },
    { languageId: 1, key: 'ButtonCancel', value: 'Չեղարկել' },

    { languageId: 2, key: 'ButtonConfirm', value: 'Confirm' },
    { languageId: 1, key: 'ButtonConfirm', value: 'Հաստատել' },

    { languageId: 2, key: 'Edit', value: 'Edit' },
    { languageId: 1, key: 'Edit', value: 'Խմբագրել' },

    { languageId: 2, key: 'View', value: 'View' },
    { languageId: 1, key: 'View', value: 'Դիտել' },

    { languageId: 2, key: 'Search', value: 'Search' },
    { languageId: 1, key: 'Search', value: 'Փնտրել' },

    { languageId: 2, key: 'Close', value: 'Close' },
    { languageId: 1, key: 'Close', value: 'Փակել' },

    // Hotel Management
    { languageId: 2, key: 'Hotel', value: 'Hotel' },
    { languageId: 1, key: 'Hotel', value: 'Հյուրանոց' },

    { languageId: 2, key: 'Rooms', value: 'Rooms' },
    { languageId: 1, key: 'Rooms', value: 'Սենյակներ' },

    { languageId: 2, key: 'RoomType', value: 'Room type' },
    { languageId: 1, key: 'RoomType', value: 'Սենյակի տեսակը' },

    { languageId: 2, key: 'RoomClass', value: 'Room class' },
    { languageId: 1, key: 'RoomClass', value: 'Սենյակի դասը' },

    { languageId: 2, key: 'RoomArea', value: 'The area of the room' },
    { languageId: 1, key: 'RoomArea', value: 'Սենյակի մակերեսը' },

    { languageId: 2, key: 'RoomNumber', value: 'Room number' },
    { languageId: 1, key: 'RoomNumber', value: 'Սենյակի համարը' },

    { languageId: 2, key: 'AddNewRoom', value: 'Add new room' },
    { languageId: 1, key: 'AddNewRoom', value: 'Ավելացնել նոր սենյակ' },

    { languageId: 2, key: 'Price', value: 'Price' },
    { languageId: 1, key: 'Price', value: 'Գին' },

    { languageId: 2, key: 'PriceList', value: 'Price list' },
    { languageId: 1, key: 'PriceList', value: 'Գնացուցակ' },

    { languageId: 2, key: 'BasePrices', value: 'Base prices' },
    { languageId: 1, key: 'BasePrices', value: 'Բազային գներ' },

    // Partners
    { languageId: 2, key: 'Partners', value: 'Partners' },
    { languageId: 1, key: 'Partners', value: 'Գործընկերներ' },

    { languageId: 2, key: 'AddPartner', value: 'Add partner' },
    { languageId: 1, key: 'AddPartner', value: 'Ավելացնել գործընկեր' },

    { languageId: 2, key: 'PartnerStatus', value: 'Partner Status' },
    { languageId: 1, key: 'PartnerStatus', value: 'Գործընկերի կարգավիճակ' },

    { languageId: 2, key: 'TouristOrganization', value: 'Tourist organization' },
    { languageId: 1, key: 'TouristOrganization', value: 'Զբոսաշրջային կազմակերպություն' },

    // Services
    { languageId: 2, key: 'Services', value: 'Services' },
    { languageId: 1, key: 'Services', value: 'Ծառայություններ' },

    { languageId: 2, key: 'Service', value: 'Service' },
    { languageId: 1, key: 'Service', value: 'Ծառայություն' },

    { languageId: 2, key: 'ServicePrice', value: 'Services available at the hotel' },
    { languageId: 1, key: 'ServicePrice', value: 'Հյուրանոցում հասանելի ծառայություններ' },

    { languageId: 2, key: 'Availability', value: 'Availability' },
    { languageId: 1, key: 'Availability', value: 'Հասանելիություն' },

    // Food
    { languageId: 2, key: 'Food', value: 'Food' },
    { languageId: 1, key: 'Food', value: 'Սնունդ' },

    { languageId: 2, key: 'Breakfast', value: 'Breakfast' },
    { languageId: 1, key: 'Breakfast', value: 'Նախաճաշ' },

    { languageId: 2, key: 'Lunch', value: 'Lunch' },
    { languageId: 1, key: 'Lunch', value: 'Ճաշ' },

    { languageId: 2, key: 'Supper', value: 'Supper' },
    { languageId: 1, key: 'Supper', value: 'Ընթրիք' },

    { languageId: 2, key: 'FoodType', value: 'Type of food:' },
    { languageId: 1, key: 'FoodType', value: 'Սննդի տեսակը`' },

    // Orders & Booking
    { languageId: 2, key: 'DirectBooking', value: 'Direct booking' },
    { languageId: 1, key: 'DirectBooking', value: 'Ուղիղ ամրագրում' },

    {
      languageId: 2,
      key: 'BookingIntegrationText',
      value: 'Want to integrate a direct booking platform?',
    },
    {
      languageId: 1,
      key: 'BookingIntegrationText',
      value: 'Ցանմանում եք ինտեգրել ուղիղ ամրագրումների հարթակ',
    },

    { languageId: 2, key: 'Arrival', value: 'Arrival' },
    { languageId: 1, key: 'Arrival', value: 'Ժամանում' },

    { languageId: 2, key: 'Departure', value: 'Departure' },
    { languageId: 1, key: 'Departure', value: 'Մեկնում' },

    { languageId: 2, key: 'CheckinTime', value: 'Check-in time' },
    { languageId: 1, key: 'CheckinTime', value: 'Մուտքի ժամ' },

    { languageId: 2, key: 'CheckoutTime', value: 'Check-out time' },
    { languageId: 1, key: 'CheckoutTime', value: 'Ելքի ժամ' },

    // Status translations
    { languageId: 2, key: 'Draft', value: 'Draft' },
    { languageId: 1, key: 'Draft', value: 'Չհաստատված' },

    { languageId: 2, key: 'Pending', value: 'Pending' },
    { languageId: 1, key: 'Pending', value: 'Ընթացքի մեջ' },

    { languageId: 2, key: 'Waiting', value: 'Waiting' },
    { languageId: 1, key: 'Waiting', value: 'Սպասվող' },

    { languageId: 2, key: 'Approved', value: 'Approved' },
    { languageId: 1, key: 'Approved', value: 'Հաստատված' },

    { languageId: 2, key: 'Active', value: 'Active' },
    { languageId: 1, key: 'Active', value: 'Ակտիվ' },

    { languageId: 2, key: 'Inactive', value: 'Inactive' },
    { languageId: 1, key: 'Inactive', value: 'Ոչ ակտիվ' },

    // Validation & Errors
    { languageId: 2, key: 'ValidationMessage', value: 'Please fill necessary data' },
    { languageId: 1, key: 'ValidationMessage', value: 'Խնդրում ենք լրացնել անհրաժեշտ տվյալները' },

    { languageId: 2, key: 'PasswordsNotMatch', value: 'Passwords do not match' },
    { languageId: 1, key: 'PasswordsNotMatch', value: 'Գաղտնաբառերը չեն համապատասխանում' },

    { languageId: 2, key: 'MissingField', value: 'Required field to fill in' },
    { languageId: 1, key: 'MissingField', value: 'Պարտադիր լրացման դաշտ' },

    { languageId: 2, key: 'InvalidTimeRange', value: 'Wrong time range' },
    { languageId: 1, key: 'InvalidTimeRange', value: 'Սխալ ժամանակահատված' },

    // Common terms
    { languageId: 2, key: 'Yes', value: 'Yes' },
    { languageId: 1, key: 'Yes', value: 'Այո' },

    { languageId: 2, key: 'No', value: 'No' },
    { languageId: 1, key: 'No', value: 'Ոչ' },

    { languageId: 2, key: 'Name', value: 'Name' },
    { languageId: 1, key: 'Name', value: 'Անուն' },

    { languageId: 2, key: 'Description', value: 'Description' },
    { languageId: 1, key: 'Description', value: 'Նկարագրություն' },

    { languageId: 2, key: 'Type', value: 'Type' },
    { languageId: 1, key: 'Type', value: 'Տիպ' },

    { languageId: 2, key: 'Status', value: 'Status' },
    { languageId: 1, key: 'Status', value: 'Կարգավիճակ' },

    { languageId: 2, key: 'Quantity', value: 'Quantity' },
    { languageId: 1, key: 'Quantity', value: 'Քանակ' },

    { languageId: 2, key: 'Value', value: 'Value' },
    { languageId: 1, key: 'Value', value: 'Արժեք' },

    { languageId: 2, key: 'Settings', value: 'Settings' },
    { languageId: 1, key: 'Settings', value: 'Կարգավորումներ' },

    { languageId: 2, key: 'Contact', value: 'Contact' },
    { languageId: 1, key: 'Contact', value: 'Կապ' },

    { languageId: 2, key: 'Website', value: 'Website' },
    { languageId: 1, key: 'Website', value: 'Կայք' },

    { languageId: 2, key: 'Time', value: 'Time' },
    { languageId: 1, key: 'Time', value: 'Ժամանակ' },

    { languageId: 2, key: 'Free', value: 'Free' },
    { languageId: 1, key: 'Free', value: 'Անվճար' },

    { languageId: 2, key: 'Paid', value: 'Paid' },
    { languageId: 1, key: 'Paid', value: 'Վճարովի' },

    // Legal Entity Types
    { languageId: 2, key: 'LLC', value: 'LLC' },
    { languageId: 1, key: 'LLC', value: 'ՍՊԸ' },

    { languageId: 2, key: 'PE', value: 'PE' },
    { languageId: 1, key: 'PE', value: 'ԱՁ' },

    { languageId: 2, key: 'CJSC', value: 'CJSC' },
    { languageId: 1, key: 'CJSC', value: 'ՓԲԸ' },

    { languageId: 2, key: 'OJSC', value: 'OJSC' },
    { languageId: 1, key: 'OJSC', value: 'ԲԲԸ' },

    { languageId: 2, key: 'NGO', value: 'NGO' },
    { languageId: 1, key: 'NGO', value: 'ՀԿ' },
  ];

  console.log(`📝 Загружаем ${localizationData.length} записей локализации...`);

  // Загружаем данные локализации
  for (const item of localizationData) {
    await prisma.localizationResource.upsert({
      where: {
        key_languageId: {
          key: item.key,
          languageId: item.languageId,
        },
      },
      update: {
        value: item.value,
      },
      create: {
        key: item.key,
        value: item.value,
        languageId: item.languageId,
      },
    });
  }

  console.log('✅ Данные локализации успешно загружены!');
  console.log(`📊 Статистика:`);
  console.log(`   - Английский (en): ${localizationData.filter(d => d.languageId === 2).length} записей`);
  console.log(`   - Армянский (hy): ${localizationData.filter(d => d.languageId === 1).length} записей`);
}
