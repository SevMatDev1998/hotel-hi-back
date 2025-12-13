import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedServices() {
  console.log('🏨 Загружаем услуги отеля...');
  console.log('♻️ Очищаем существующие записи...');
  console.log('♻️ Очищаем существующие записи...');

  // 1. Сначала удаляем связи с сервисами
  await prisma.hotelService.deleteMany().catch(() => {});

  // 2. Затем удаляем сами сервисы
  await prisma.systemService.deleteMany().catch(() => {});

  // 3. Затем типы
  await prisma.systemServiceType.deleteMany().catch(() => {});

  // 4. И в конце группы
  await prisma.systemServiceGroup.deleteMany().catch(() => {});
  console.log('✅ Существующие записи очищены.');

  // === 1️⃣ Create groups ===
  const serviceGroups = [
    { name: 'AdditionalServices' }, // ⭐ Для Arrival/Departure
    { name: 'ParkingAndTransport' },
    { name: 'HotelAmenities' },
    { name: 'Family' },
    { name: 'FoodAndRestaurant' },
    { name: 'Business' },
    { name: 'HealthAndSpa' },
  ];

  const existingGroups = await prisma.systemServiceGroup.findMany();
  if (existingGroups.length === 0) {
    await prisma.systemServiceGroup.createMany({
      data: serviceGroups,
      skipDuplicates: true,
    });
  }

  const groups = await prisma.systemServiceGroup.findMany();

  const additionalGroup =
    groups.find((g) => g.name === 'AdditionalServices') || groups[0];
  const parkingGroup =
    groups.find((g) => g.name === 'ParkingAndTransport') || groups[1];
  const amenitiesGroup =
    groups.find((g) => g.name === 'HotelAmenities') || groups[2];
  const familyGroup = groups.find((g) => g.name === 'Family') || groups[3];
  const foodGroup =
    groups.find((g) => g.name === 'FoodAndRestaurant') || groups[4];
  const businessGroup = groups.find((g) => g.name === 'Business') || groups[5];
  const healthGroup =
    groups.find((g) => g.name === 'HealthAndSpa') || groups[6];

  // === 2️⃣ Create types (каждый тип принадлежит группе) ===
  const serviceTypes = [
    {
      name: 'AdditionalServiceType',
      systemServiceGroupId: additionalGroup.id,
    }, // ⭐
    { name: 'ParkingInformation', systemServiceGroupId: parkingGroup.id },
    { name: 'ServicesAndFacilities', systemServiceGroupId: parkingGroup.id },
    { name: 'Security', systemServiceGroupId: parkingGroup.id },
    { name: 'Transportation', systemServiceGroupId: parkingGroup.id },
    { name: 'Tour', systemServiceGroupId: parkingGroup.id },
    { name: 'Staff', systemServiceGroupId: amenitiesGroup.id },
    { name: 'Reception', systemServiceGroupId: amenitiesGroup.id },
    { name: 'Heating', systemServiceGroupId: amenitiesGroup.id },
    { name: 'Internet', systemServiceGroupId: amenitiesGroup.id },
    { name: 'CleaningService', systemServiceGroupId: amenitiesGroup.id },
    { name: 'BoardGames', systemServiceGroupId: familyGroup.id },
    { name: 'Playgrounds', systemServiceGroupId: familyGroup.id },
    { name: 'Entertainment', systemServiceGroupId: familyGroup.id },
    { name: 'ForChildren', systemServiceGroupId: familyGroup.id },
    { name: 'MasterClasses', systemServiceGroupId: familyGroup.id },
    { name: 'SeaLakeOcean', systemServiceGroupId: familyGroup.id },
    { name: 'Other', systemServiceGroupId: familyGroup.id },
    { name: 'Restaurants', systemServiceGroupId: foodGroup.id },
    { name: 'Bar', systemServiceGroupId: foodGroup.id },
    { name: 'FoodOther', systemServiceGroupId: foodGroup.id },
    { name: 'Halls', systemServiceGroupId: businessGroup.id },
    { name: 'SwimmingPool', systemServiceGroupId: healthGroup.id },
    { name: 'Sauna', systemServiceGroupId: healthGroup.id },
    { name: 'SpaServices', systemServiceGroupId: healthGroup.id },
    { name: 'DiagnosticsAndTreatments', systemServiceGroupId: healthGroup.id },
    { name: 'Fitness', systemServiceGroupId: healthGroup.id },
  ];

  const existingTypes = await prisma.systemServiceType.findMany();
  if (existingTypes.length === 0) {
    await prisma.systemServiceType.createMany({
      data: serviceTypes,
      skipDuplicates: true,
    });
  }

  const types = await prisma.systemServiceType.findMany();

  const additionalType = types.find((t) => t.name === 'AdditionalServiceType');

  // ParkingAndTransport types
  const parkingInfoType = types.find((t) => t.name === 'ParkingInformation');
  const servicesAndFacilitiesType = types.find(
    (t) => t.name === 'ServicesAndFacilities',
  );
  const securityType = types.find((t) => t.name === 'Security');
  const transportationType = types.find((t) => t.name === 'Transportation');
  const tourType = types.find((t) => t.name === 'Tour');

  // HotelAmenities types
  const staffType = types.find((t) => t.name === 'Staff');
  const receptionType = types.find((t) => t.name === 'Reception');
  const heatingType = types.find((t) => t.name === 'Heating');
  const internetType = types.find((t) => t.name === 'Internet');
  const cleaningServiceType = types.find((t) => t.name === 'CleaningService');

  // Family types
  const boardGamesType = types.find((t) => t.name === 'BoardGames');
  const playgroundsType = types.find((t) => t.name === 'Playgrounds');
  const entertainmentType = types.find((t) => t.name === 'Entertainment');
  const forChildrenType = types.find((t) => t.name === 'ForChildren');
  const masterClassesType = types.find((t) => t.name === 'MasterClasses');
  const seaLakeOceanType = types.find((t) => t.name === 'SeaLakeOcean');
  const otherType = types.find((t) => t.name === 'Other');

  // FoodAndRestaurant types
  const restaurantsType = types.find((t) => t.name === 'Restaurants');
  const barType = types.find((t) => t.name === 'Bar');
  const foodOtherType = types.find((t) => t.name === 'FoodOther');

  // Business types
  const hallsType = types.find((t) => t.name === 'Halls');

  // HealthAndSpa types
  const swimmingPoolType = types.find((t) => t.name === 'SwimmingPool');
  const saunaType = types.find((t) => t.name === 'Sauna');
  const spaServicesType = types.find((t) => t.name === 'SpaServices');
  const diagnosticsAndTreatmentsType = types.find(
    (t) => t.name === 'DiagnosticsAndTreatments',
  );
  const fitnessType = types.find((t) => t.name === 'Fitness');

  // === 3️⃣ Create services (ТОЛЬКО systemServiceTypeId!) ===
  const services = [
    // ⭐ AdditionalServices
    {
      name: 'Arrival',
      systemServiceTypeId: additionalType?.id,
      isAdditional: true,
    },
    {
      name: 'Departure',
      systemServiceTypeId: additionalType?.id,
      isAdditional: true,
    },
    {
      name: 'FoodDelivery',
      systemServiceTypeId: additionalType?.id,
      isAdditional: true,
    },
    {
      name: 'ProvisionOfACrib',
      systemServiceTypeId: additionalType?.id,
      isAdditional: true,
    },

    // ParkingInformation
    { name: 'OnHotelTerritory', systemServiceTypeId: parkingInfoType?.id },
    { name: 'CoveredParking', systemServiceTypeId: parkingInfoType?.id },
    { name: 'Public', systemServiceTypeId: parkingInfoType?.id },
    { name: 'MotorcycleParking', systemServiceTypeId: parkingInfoType?.id },

    // ServicesAndFacilities
    {
      name: 'ValetParking',
      systemServiceTypeId: servicesAndFacilitiesType?.id,
    },
    { name: 'EvCharging', systemServiceTypeId: servicesAndFacilitiesType?.id },

    // Security
    { name: 'WellLitParking', systemServiceTypeId: securityType?.id },
    { name: 'FireExtinguisher', systemServiceTypeId: securityType?.id },
    { name: 'Security24h', systemServiceTypeId: securityType?.id },

    // Transportation
    { name: 'AirportToHotel', systemServiceTypeId: transportationType?.id },
    { name: 'HotelToAirport', systemServiceTypeId: transportationType?.id },
    { name: 'TaxiService', systemServiceTypeId: transportationType?.id },
    { name: 'ToCableCarAndBack', systemServiceTypeId: transportationType?.id },

    // Tour
    { name: 'Touristic', systemServiceTypeId: tourType?.id },
    { name: 'Ecological', systemServiceTypeId: tourType?.id },
    { name: 'Health', systemServiceTypeId: tourType?.id },
    { name: 'Gastronomic', systemServiceTypeId: tourType?.id },
    { name: 'Educational', systemServiceTypeId: tourType?.id },

    // Staff
    { name: 'SpokenLanguages', systemServiceTypeId: staffType?.id },
    { name: 'Doorman', systemServiceTypeId: staffType?.id },
    { name: 'LuggageAssistant', systemServiceTypeId: staffType?.id },
    { name: 'DailyRoomService', systemServiceTypeId: staffType?.id },

    // Reception
    { name: 'Open24h', systemServiceTypeId: receptionType?.id },
    { name: 'SafeDepositBox', systemServiceTypeId: receptionType?.id },
    { name: 'PhoneChargingDevices', systemServiceTypeId: receptionType?.id },
    { name: 'FirstAidKit', systemServiceTypeId: receptionType?.id },
    { name: 'LuggageStorage', systemServiceTypeId: receptionType?.id },
    { name: 'Umbrella', systemServiceTypeId: receptionType?.id },

    // Heating
    { name: 'CentralHeating', systemServiceTypeId: heatingType?.id },
    { name: 'AirConditioner', systemServiceTypeId: heatingType?.id },
    // Internet
    { name: 'WifiEverywhere', systemServiceTypeId: internetType?.id },
    { name: 'WifiInAllRooms', systemServiceTypeId: internetType?.id },
    { name: 'CableInternet', systemServiceTypeId: internetType?.id },
    { name: 'UltraFast', systemServiceTypeId: internetType?.id },

    // CleaningService
    { name: 'Laundry', systemServiceTypeId: cleaningServiceType?.id },
    { name: 'DryCleaning', systemServiceTypeId: cleaningServiceType?.id },
    { name: 'Ironing', systemServiceTypeId: cleaningServiceType?.id },

    // BoardGames
    { name: 'BoardGames', systemServiceTypeId: boardGamesType?.id },
    { name: 'Billiards', systemServiceTypeId: boardGamesType?.id },
    { name: 'Mafia', systemServiceTypeId: boardGamesType?.id },
    { name: 'CardGames', systemServiceTypeId: boardGamesType?.id },
    { name: 'Backgammon', systemServiceTypeId: boardGamesType?.id },
    { name: 'Chess', systemServiceTypeId: boardGamesType?.id },
    { name: 'Tennis', systemServiceTypeId: boardGamesType?.id },
    { name: 'HockeyFootball', systemServiceTypeId: boardGamesType?.id },
    { name: 'Poker', systemServiceTypeId: boardGamesType?.id },

    // Playgrounds
    { name: 'Football', systemServiceTypeId: playgroundsType?.id },
    { name: 'PlaygroundTennis', systemServiceTypeId: playgroundsType?.id },
    { name: 'Basketball', systemServiceTypeId: playgroundsType?.id },
    { name: 'Volleyball', systemServiceTypeId: playgroundsType?.id },
    { name: 'SkiSlope', systemServiceTypeId: playgroundsType?.id },
    { name: 'Paintball', systemServiceTypeId: playgroundsType?.id },
    { name: 'Petanque', systemServiceTypeId: playgroundsType?.id },

    // Entertainment
    { name: 'CinemaHall', systemServiceTypeId: entertainmentType?.id },
    { name: 'HorseRiding', systemServiceTypeId: entertainmentType?.id },
    { name: 'Fishing', systemServiceTypeId: entertainmentType?.id },
    { name: 'HotAirBalloon', systemServiceTypeId: entertainmentType?.id },
    { name: 'Rowing', systemServiceTypeId: entertainmentType?.id },
    { name: 'OutdoorCinema', systemServiceTypeId: entertainmentType?.id },
    { name: 'Archery', systemServiceTypeId: entertainmentType?.id },
    { name: 'ShootingRange', systemServiceTypeId: entertainmentType?.id },
    { name: 'CarriageRide', systemServiceTypeId: entertainmentType?.id },
    { name: 'WinterGarden', systemServiceTypeId: entertainmentType?.id },
    { name: 'Museum', systemServiceTypeId: entertainmentType?.id },
    { name: 'Zoo', systemServiceTypeId: entertainmentType?.id },
    // ForChildren
    { name: 'KidsPlayroom', systemServiceTypeId: forChildrenType?.id },
    { name: 'ArcadeGames', systemServiceTypeId: forChildrenType?.id },
    { name: 'KidsClub', systemServiceTypeId: forChildrenType?.id },
    { name: 'VideoGameRoom', systemServiceTypeId: forChildrenType?.id },
    { name: 'Playground', systemServiceTypeId: forChildrenType?.id },
    { name: 'AdventurePark', systemServiceTypeId: forChildrenType?.id },
    { name: 'BabysittingService', systemServiceTypeId: forChildrenType?.id },
    { name: 'ComputerRoom', systemServiceTypeId: forChildrenType?.id },
    // MasterClasses
    { name: 'ArtAndCreativity', systemServiceTypeId: masterClassesType?.id },
    { name: 'FoodAndCooking', systemServiceTypeId: masterClassesType?.id },
    { name: 'SportsAndHealth', systemServiceTypeId: masterClassesType?.id },
    {
      name: 'SelfDevelopmentAndGrowth',
      systemServiceTypeId: masterClassesType?.id,
    },
    { name: 'Technology', systemServiceTypeId: masterClassesType?.id },

    // SeaLakeOcean
    { name: 'Beach', systemServiceTypeId: seaLakeOceanType?.id },
    { name: 'SunLounger', systemServiceTypeId: seaLakeOceanType?.id },
    { name: 'Towel', systemServiceTypeId: seaLakeOceanType?.id },
    { name: 'Boat', systemServiceTypeId: seaLakeOceanType?.id },
    { name: 'Scooter', systemServiceTypeId: seaLakeOceanType?.id },
    { name: 'WaterBike', systemServiceTypeId: seaLakeOceanType?.id },

    // Other
    { name: 'Hammocks', systemServiceTypeId: otherType?.id },
    { name: 'CampfireArea', systemServiceTypeId: otherType?.id },
    { name: 'GardenGreenArea', systemServiceTypeId: otherType?.id },
    { name: 'Zipline', systemServiceTypeId: otherType?.id },
    { name: 'Library', systemServiceTypeId: otherType?.id },
    { name: 'RelaxationRoom', systemServiceTypeId: otherType?.id },
    { name: 'Quest', systemServiceTypeId: otherType?.id },
    // Restaurants
    { name: 'Armenian', systemServiceTypeId: restaurantsType?.id },
    { name: 'European', systemServiceTypeId: restaurantsType?.id },
    { name: 'Seafood', systemServiceTypeId: restaurantsType?.id },
    { name: 'Italian', systemServiceTypeId: restaurantsType?.id },
    { name: 'Indian', systemServiceTypeId: restaurantsType?.id },
    { name: 'RestaurantOther', systemServiceTypeId: restaurantsType?.id },

    // Bar
    { name: 'Lounge', systemServiceTypeId: barType?.id },
    { name: 'Lobby', systemServiceTypeId: barType?.id },
    { name: 'Cafe', systemServiceTypeId: barType?.id },
    { name: 'Hookah', systemServiceTypeId: barType?.id },
    { name: 'Karaoke', systemServiceTypeId: barType?.id },
    { name: 'SkyBar', systemServiceTypeId: barType?.id },

    // FoodOther
    { name: 'Gazebos', systemServiceTypeId: foodOtherType?.id },
    { name: 'Mangal', systemServiceTypeId: foodOtherType?.id },
    { name: 'BbqEquipment', systemServiceTypeId: foodOtherType?.id },
    { name: 'BanquetHall', systemServiceTypeId: foodOtherType?.id },
    { name: 'OutdoorKitchen', systemServiceTypeId: foodOtherType?.id },

    // Halls
    { name: 'ConferenceHall', systemServiceTypeId: hallsType?.id },
    { name: 'MeetingRoom', systemServiceTypeId: hallsType?.id },
    { name: 'Office', systemServiceTypeId: hallsType?.id },
    { name: 'CouncilHall', systemServiceTypeId: hallsType?.id },

    // SwimmingPool
    { name: 'Indoor', systemServiceTypeId: swimmingPoolType?.id },
    { name: 'Outdoor', systemServiceTypeId: swimmingPoolType?.id },
    { name: 'HeatedOutdoor', systemServiceTypeId: swimmingPoolType?.id },
    { name: 'HeatedIndoor', systemServiceTypeId: swimmingPoolType?.id },
    { name: 'Children', systemServiceTypeId: swimmingPoolType?.id },
    { name: 'MineralTherapeutic', systemServiceTypeId: swimmingPoolType?.id },
    { name: 'WaterPark', systemServiceTypeId: swimmingPoolType?.id },
    { name: 'PoolBar', systemServiceTypeId: swimmingPoolType?.id },
    { name: 'Jacuzzi', systemServiceTypeId: swimmingPoolType?.id },

    // Sauna
    { name: 'Finnish', systemServiceTypeId: saunaType?.id },
    { name: 'TurkishHammam', systemServiceTypeId: saunaType?.id },
    { name: 'Oriental', systemServiceTypeId: saunaType?.id },
    { name: 'Infrared', systemServiceTypeId: saunaType?.id },
    { name: 'Russian', systemServiceTypeId: saunaType?.id },
    { name: 'FurakoJapanese', systemServiceTypeId: saunaType?.id },
    // SpaServices
    { name: 'Massage', systemServiceTypeId: spaServicesType?.id },
    { name: 'SaltRoom', systemServiceTypeId: spaServicesType?.id },
    { name: 'InhalationRoom', systemServiceTypeId: spaServicesType?.id },
    { name: 'TeaRoom', systemServiceTypeId: spaServicesType?.id },

    // DiagnosticsAndTreatments
    {
      name: 'Gastrointestinal',
      systemServiceTypeId: diagnosticsAndTreatmentsType?.id,
    },
    {
      name: 'Cardiovascular',
      systemServiceTypeId: diagnosticsAndTreatmentsType?.id,
    },
    {
      name: 'Respiratory',
      systemServiceTypeId: diagnosticsAndTreatmentsType?.id,
    },
    {
      name: 'Musculoskeletal',
      systemServiceTypeId: diagnosticsAndTreatmentsType?.id,
    },

    // Fitness
    { name: 'Gym', systemServiceTypeId: fitnessType?.id },
    { name: 'AerobicsHall', systemServiceTypeId: fitnessType?.id },
    { name: 'DanceHall', systemServiceTypeId: fitnessType?.id },
    { name: 'PersonalTraining', systemServiceTypeId: fitnessType?.id },
    { name: 'GroupTraining', systemServiceTypeId: fitnessType?.id },
  ];

  const existingServices = await prisma.systemService.findMany();
  if (existingServices.length === 0) {
    await prisma.systemService.createMany({
      data: services as any,
      skipDuplicates: true,
    });
  }

  console.log('✅ Услуги отеля загружены!');
  console.log(`   📦 Групп: ${groups.length}`);
  console.log(`   📋 Типов: ${types.length}`);
  console.log(`   🔧 Сервисов: ${services.length}`);
}
