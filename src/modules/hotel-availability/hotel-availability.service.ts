import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHotelAvailabilityDto } from './dto/create-hotel-availability.dto';
import { UpdateHotelAvailabilityDto } from './dto/update-hotel-availability.dto';
import { HotelAvailability } from '@prisma/client';
import { HotelAgeAssignmentService } from '../hotel-age-assignment/hotel-age-assignment.service';
import { UpdateHotelAvailabilityListDto } from './dto/update-hotel-availability-with-dates.dto';
import { generateRandomColor } from '../../common/utils/color.util';
import * as puppeteer from 'puppeteer';
import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { I18nService } from '../../i18n/i18n.service';

@Injectable()
export class HotelAvailabilityService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hotelAgeAssignmentService: HotelAgeAssignmentService,
    private readonly i18nService: I18nService,
  ) {}

  async create(
    createHotelAvailabilityDto: CreateHotelAvailabilityDto,
    hotelId: number,
  ): Promise<HotelAvailability> {
    const { title, checkInTime, checkoutTime, hotelAgeAssignments } =
      createHotelAvailabilityDto;

    const hotelAvailability = await this.prisma.hotelAvailability.create({
      data: {
        hotelId,
        title,
        color: generateRandomColor(),
        checkInTime,
        checkoutTime,
      },
    });
    if (hotelAgeAssignments && hotelAgeAssignments.length > 0) {
      for (const assignment of hotelAgeAssignments) {
        await this.hotelAgeAssignmentService.create({
          ...assignment,
          hotelAvailabilityId: hotelAvailability.id,
        });
      }
    }

    return hotelAvailability;
  }

  async update(
    availabilityId: number,
    updateHotelAvailabilityDto: UpdateHotelAvailabilityDto,
  ): Promise<HotelAvailability> {
    const { title, checkInTime, checkoutTime, hotelAgeAssignments } =
      updateHotelAvailabilityDto;

    // Update the hotel availability (only title, checkInTime, checkoutTime)
    const hotelAvailability = await this.prisma.hotelAvailability.update({
      where: { id: availabilityId },
      data: {
        title,
        checkInTime,
        checkoutTime,
      },
    });


    return hotelAvailability;
  }

  async findByHotelId(hotelId: number): Promise<HotelAvailability[]> {
    return this.prisma.hotelAvailability.findMany({
      where: { hotelId },
    });
  }

  async findDetailById(availabilityId: number) {
    const availability = await this.prisma.hotelAvailability.findUnique({
      where: { id: availabilityId },
      include: {
        // hotel: {
        //   include: {
        //     currency: true,
        //   },
        // },
        hotelRoomPrices: {
          include: {
            hotelRoom: {
              include: {
                roomClass: true,
                roomView: true,
                hotelRoomParts: {
                  include: {
                    roomPart: true,
                    hotelRoomPartBeds: {
                      include: {
                        roomBedType: true,
                        roomBedSize: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        hotelFoodPrices: {
          include: {
            hotelFood: {
              include: {
                hotelFoodCuisines: {
                  include: {
                    cuisine: true,
                  },
                },
                hotelFoodOfferTypes: {
                  include: {
                    offerType: true,
                  },
                },
              },
            },
            hotelAgeAssignment: true,
          },
        },
        hotelServicePrices: {
          include: {
            hotelService: {
              include: {
                service: {
                  include: {
                    systemServiceType: {
                      include: {
                        systemServiceGroup: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        hotelAdditionalServices: {
          include: {
            hotelService: {
              include: {
                service: true,
              },
            },
            hotelRoom: true,
          },
        },
        hotelAgeAssignments: true,
        hotel: {
          include: {
            hotelRooms: {
              include: {
                roomClass: true,
                roomView: true,
                hotelRoomParts: {
                  include: {
                    roomPart: true,
                    hotelRoomPartBeds: {
                      include: {
                        roomBedType: true,
                        roomBedSize: true,
                      },
                    },
                  },
                },
                hotelAgeAssignmentPrice: {
                  include: {
                    hotelAgeAssignment: true,
                  },
                },
              },
            },
            hotelFoods: {
              include: {
                hotelFoodCuisines: {
                  include: {
                    cuisine: true,
                  },
                },
                hotelFoodOfferTypes: {
                  include: {
                    offerType: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return availability;
  }

  async findByHotelIdWithDates(hotelId: number): Promise<HotelAvailability[]> {
    return this.prisma.hotelAvailability.findMany({
      where: { hotelId },
      include: {
        hotelAvailabilityDateCommissions: true,
      },
    });
  }

  async updateByHotelIdWithDates(
    hotelId: number,
    dto: UpdateHotelAvailabilityListDto,
  ): Promise<HotelAvailability[]> {
    const { availability, commissionDate } = dto; // ← ОДИН объект

    if (!availability || !availability.id) {
      // throw new BadRequestException('Availability data is required');
      console.log(1234567);
    }

    try {
      await this.prisma.$transaction(async (tx) => {
        // 1️⃣ Получаем существующие даты из БД для этого availability
        const existingDates = await tx.hotelAvailabilityDateCommission.findMany(
          {
            where: { hotelAvailabilityId: availability.id },
          },
        );

        const existingCalendarIds = existingDates.map((d) => d.calendarId);
        const newCalendarIdsClone =
          availability.hotelAvailabilityDateCommissions.map(
            (d) => d.calendarId,
          );
        const newCalendarIds = availability.hotelAvailabilityDateCommissions
          .filter((d) => !d.serviceFee)
          .map((d) => d.calendarId);

        // const toDeleteIds = availability.hotelAvailabilityDateCommissions.map(
        //   (d) => d.calendarId,
        // );

        // 2️⃣ Что удалить (были в БД, но больше нет в новом списке)
        const toDelete = existingCalendarIds.filter(
          (id) => !newCalendarIdsClone.includes(id),
        );

        // // 3️⃣ Что обновить (есть и в БД и в новом списке)
        const toUpdate = newCalendarIds.filter((id) =>
          existingCalendarIds.includes(id),
        );

        // 4️⃣ Что создать (новые, которых не было в БД)
        const toCreate = newCalendarIds.filter(
          (id) => !existingCalendarIds.includes(id),
        );

        // console.log('toCreate', toCreate);

        // 🔥 ВАЖНО: Удаляем новые calendarIds из ВСЕХ других availability этого отеля
        if (newCalendarIds.length > 0) {
          await tx.hotelAvailabilityDateCommission.deleteMany({
            where: {
              calendarId: { in: newCalendarIds },
              hotelAvailabilityId: { not: availability.id },
              hotelAvailability: { hotelId },
            },
          });
        }

        // 🗑️ УДАЛЯЕМ старые даты
        if (toDelete.length > 0) {
          await tx.hotelAvailabilityDateCommission.deleteMany({
            where: {
              hotelAvailabilityId: availability.id,
              calendarId: { in: toDelete },
            },
          });
        }

        // ✏️ ОБНОВЛЯЕМ существующие даты (новые комиссии)
        if (toUpdate.length > 0 && commissionDate) {
          for (const calendarId of toUpdate) {
            await tx.hotelAvailabilityDateCommission.updateMany({
              where: {
                hotelAvailabilityId: availability.id,
                calendarId: calendarId,
              },
              data: {
                roomFee: commissionDate.roomFee ?? 0,
                foodFee: commissionDate.foodFee ?? 0,
                additionalFee: commissionDate.additionalFee ?? 0,
                serviceFee: commissionDate.serviceFee ?? 0,
                updatedAt: new Date(),
              },
            });
          }
        }

        // ➕ СОЗДАЕМ новые даты
        if (toCreate.length > 0) {
          const newDates = availability.hotelAvailabilityDateCommissions
            .filter((d) => toCreate.includes(d.calendarId))
            .map((d) => ({
              hotelAvailabilityId: availability.id,
              date: new Date(d.date),
              calendarId: d.calendarId,
              roomFee: commissionDate?.roomFee ?? 0,
              foodFee: commissionDate?.foodFee ?? 0,
              additionalFee: commissionDate?.additionalFee ?? 0,
              serviceFee: commissionDate?.serviceFee ?? 0,
              startDate: new Date(),
              endDate: null,
              createdAt: new Date(),
              updatedAt: new Date(),
            }));

          await tx.hotelAvailabilityDateCommission.createMany({
            data: newDates,
            skipDuplicates: true,
          });
        }

        // 🔄 Обновляем основные данные availability (если нужно)
        await tx.hotelAvailability.update({
          where: { id: availability.id },
          data: {
            title: availability.title,
            color: availability.color,
            checkInTime: availability.checkInTime,
            checkoutTime: availability.checkoutTime,
            confirmed: availability.confirmed ?? false,
            updatedAt: new Date(),
          },
        });
      });

      // 5️⃣ Возвращаем ВСЕ availability для этого отеля (обновленные)
      const updated = await this.prisma.hotelAvailability.findMany({
        where: { hotelId },
        include: {
          hotelAvailabilityDateCommissions: true,
        },
        orderBy: { id: 'asc' },
      });

      return updated;
    } catch (error) {
      console.error('Error updating hotel availability with dates:', error);
      throw error;
    }
  }

  async deleteDate(
    calendarId: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.prisma.hotelAvailabilityDateCommission.deleteMany({
        where: { calendarId },
      });

      return {
        success: true,
        message: `Date with calendarId ${calendarId} deleted successfully`,
      };
    } catch (error) {
      console.error('Error deleting date:', error);
      throw error;
    }
  }

  async deleteDatesBatch(
    calendarIds: string[],
  ): Promise<{ success: boolean; message: string; count: number }> {
    try {
      const result =
        await this.prisma.hotelAvailabilityDateCommission.deleteMany({
          where: {
            calendarId: { in: calendarIds },
          },
        });

      return {
        success: true,
        message: `${result.count} dates deleted successfully`,
        count: result.count,
      };
    } catch (error) {
      console.error('Error deleting dates batch:', error);
      throw error;
    }
  }

  async copyAvailability(
    availabilityId: number,
  ): Promise<HotelAvailability> {
    try {
      // 1️⃣ Получаем оригинальный availability со всеми связями
      const original = await this.prisma.hotelAvailability.findUnique({
        where: { id: availabilityId },
        include: {
          hotelAgeAssignments: true,
          hotelRoomPrices: true,
          hotelServicePrices: true,
          hotelFoodPrices: true,
          hotelAdditionalServices: true,
        },
      });

      if (!original) {
        throw new Error(
          `Hotel availability with ID ${availabilityId} not found`,
        );
      }

      // 2️⃣ Создаем копию в транзакции
      return await this.prisma.$transaction(async (tx) => {
        // Создаем новый availability с "(Copy)" в названии
        const newAvailability = await tx.hotelAvailability.create({
          data: {
            hotelId: original.hotelId,
            title: `${original.title} (Copy)`,
            color: generateRandomColor(),
            checkInTime: original.checkInTime,
            checkoutTime: original.checkoutTime,
            confirmed: false,
          },
        });

        // 3️⃣ Копируем hotelAgeAssignments
        if (original.hotelAgeAssignments.length > 0) {
          await tx.hotelAgeAssignment.createMany({
            data: original.hotelAgeAssignments.map((assignment) => ({
              hotelAvailabilityId: newAvailability.id,
              name: assignment.name,
              fromAge: assignment.fromAge,
              toAge: assignment.toAge,
              bedType: assignment.bedType,
              isAdditional: assignment.isAdditional,
            })),
          });
        }

        // 4️⃣ Копируем hotelRoomPrices
        if (original.hotelRoomPrices.length > 0) {
          await tx.hotelRoomPrice.createMany({
            data: original.hotelRoomPrices.map((price) => ({
              hotelAvailabilityId: newAvailability.id,
              hotelRoomId: price.hotelRoomId,
              price: price.price,
              dateFrom: price.dateFrom,
              dateTo: price.dateTo,
              isActive: price.isActive,
            })),
          });
        }

        // 5️⃣ Копируем hotelServicePrices
        if (original.hotelServicePrices.length > 0) {
          await tx.hotelServicePrice.createMany({
            data: original.hotelServicePrices.map((price) => ({
              hotelAvailabilityId: newAvailability.id,
              hotelServiceId: price.hotelServiceId,
              priceType: price.priceType,
              price: price.price,
              dateFrom: price.dateFrom,
              dateTo: price.dateTo,
            })),
          });
        }

        // 6️⃣ Копируем hotelFoodPrices
        if (original.hotelFoodPrices.length > 0) {
          await tx.hotelFoodPrice.createMany({
            data: original.hotelFoodPrices.map((price) => ({
              hotelAvailabilityId: newAvailability.id,
              hotelAgeAssignmentId: price.hotelAgeAssignmentId,
              hotelFoodId: price.hotelFoodId,
              hotelRoomId: price.hotelRoomId,
              price: price.price,
              includedInPrice: price.includedInPrice,
              isActive: price.isActive,
            })),
          });
        }

        // 7️⃣ Копируем hotelAdditionalServices
        if (original.hotelAdditionalServices.length > 0) {
          await tx.hotelAdditionalService.createMany({
            data: original.hotelAdditionalServices.map((service) => ({
              hotelAvailabilityId: newAvailability.id,
              hotelServiceId: service.hotelServiceId,
              hotelRoomId: service.hotelRoomId,
              isTimeLimited: service.isTimeLimited,
              price: service.price,
              startTime: service.startTime,
              percentage: service.percentage,
              notConstantValue: service.notConstantValue,
              serviceName: service.serviceName,
              isActive: service.isActive,
            })),
          });
        }

        // 8️⃣ Возвращаем новый availability
        return newAvailability;
      });
    } catch (error) {
      console.error('Error copying hotel availability:', error);
      throw error;
    }
  }

  async generateAvailabilityPdf(availabilityId: number, lang: string = 'hy'): Promise<Buffer> {
    try {
      // 1️⃣ Получаем данные availability с полной информацией
      const availability = await this.findDetailById(availabilityId);

      if (!availability) {
        throw new Error(
          `Hotel availability with ID ${availabilityId} not found`,
        );
      }

      // 2️⃣ Подготавливаем данные для шаблона
      const templateData = this.prepareTemplateData(availability, lang);

      // 3️⃣ Загружаем и компилируем Handlebars шаблон
      // Используем путь относительно корня проекта (process.cwd())
      const templatePath = path.join(
        process.cwd(),
        'src',
        'modules',
        'hotel-availability',
        'templates',
        'availability-pdf.hbs',
      );
      const templateSource = fs.readFileSync(templatePath, 'utf-8');
      const template = Handlebars.compile(templateSource);
      const html = template(templateData);

      // 4️⃣ Генерируем PDF через Puppeteer
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20px',
          right: '20px',
          bottom: '20px',
          left: '20px',
        },
      });

      await browser.close();

      return Buffer.from(pdfBuffer);
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  }

  private prepareTemplateData(availability: any, lang: string = 'hy') {
    const t = this.i18nService.getTranslations(lang, 'availability-pdf');

    const translate = (key: string, category: string) => {
      if (!key) return '';
      const translated = t[category]?.[key];
      return translated || key; // Если нет перевода, возвращаем исходный ключ
    };

    const formatTime = (date: string) => {
      return new Date(date).toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      });
    };

    const formatDate = (date: string) => {
      return new Date(date).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    };

    // Подготовка данных комнат
    const rooms = availability.hotel?.hotelRooms?.map((room: any) => {
      // Получаем ВСЕ цены для этой комнаты
      const roomPrices = availability.hotelRoomPrices
        ?.filter((rp: any) => rp.hotelRoomId === room.id)
        ?.map((rp: any) => ({
          guestCount: rp.guestCount,
          price: Number(rp.price),
        }))
        ?.sort((a: any, b: any) => a.guestCount - b.guestCount) || [];

      // Подготовка данных питания для комнаты с возрастными диапазонами
      const foodTypesMap = new Map();
      
      availability.hotelFoodPrices
        ?.filter((fp: any) => fp.hotelRoomId === room.id)
        ?.forEach((fp: any) => {
          const foodType = fp.hotelFood.foodType;
          if (!foodTypesMap.has(foodType)) {
            foodTypesMap.set(foodType, {
              foodType,
              prices: [],
            });
          }
          foodTypesMap.get(foodType).prices.push({
            ageAssignmentId: fp.hotelAgeAssignmentId,
            price: fp.price ? Number(fp.price) : '0.00',
          });
        });

      const roomFoodPrices = Array.from(foodTypesMap.values()).map((food) => {
        // Сортируем цены по порядку возрастных диапазонов
        const sortedPrices = availability.hotelAgeAssignments
          ?.map((age: any) => {
            const priceObj = food.prices.find(
              (p: any) => p.ageAssignmentId === age.id,
            );
            return priceObj ? priceObj.price : '0.00';
          }) || [];

        return {
          foodType: translate(food.foodType, 'foods'),
          prices: sortedPrices,
        };
      });

      const roomAdditionalServices = availability.hotelAdditionalServices
        ?.filter((as: any) => as.hotelRoomId === room.id)
        ?.map((service: any) => ({
          serviceName: service.serviceName || translate(service.hotelService.service.name, 'system_services'),
          serviceType: translate(service.hotelService.service.name, 'system_services'),
          isTimeLimited: service.isTimeLimited,
          startTime: service.startTime
            ? formatTime(service.startTime)
            : null,
          price: service.price ? Number(service.price) : null,
          percentage: service.percentage,
        }));

      const beds = room.hotelRoomParts?.map((part: any) => ({
        partName: translate(part.roomPart.name, 'room_parts_options'),
        bedDetails: part.hotelRoomPartBeds?.map((bed: any) => ({
          quantity: bed.quantity,
          bedType: translate(bed.roomBedType.name, 'room_bed_types_names_options'),
          bedSize: bed.roomBedSize.size || '',
        })),
      }));

      // Проверка наличия кроватки типа "cradle"
      const hasCradle = room.hotelRoomParts?.some((part: any) =>
        part.hotelRoomPartBeds?.some((bed: any) =>
          bed.roomBedType.name.toLowerCase().includes('cradle')  )
      ) || false;

      const ageAssignmentPrices = room.hotelAgeAssignmentPrice?.map(
        (aap: any) => ({
          ageRange: `${aap.hotelAgeAssignment.fromAge}-${aap.hotelAgeAssignment.toAge}`,
          price: Number(aap.price),
        }),
      );

      return {
        name: room.name,
        area: room.area,
        roomClass: translate(room.roomClass.name, 'room_class_options'),
        roomView: room.roomView?.name ? translate(room.roomView.name, 'room_view_options') : '',
        roomNumberQuantity: room.roomNumberQuantity,
        mainGuestQuantity: room.mainGuestQuantity,
        additionalGuestQuantity: room.additionalGuestQuantity,
        roomPrices, // Массив цен по количеству гостей
        beds,
        hasCradle,
        ageAssignmentPrices,
        ageAssignments: availability.hotelAgeAssignments?.map((age: any) => ({
          fromAge: age.fromAge,
          toAge: age.toAge,
        })),
        foodPrices: roomFoodPrices,
        additionalServices: roomAdditionalServices,
      };
    });

    // Общие данные - группировка сервисов по иерархии
    const servicesHierarchy = availability.hotelServicePrices?.reduce((acc: any[], sp: any) => {
      const groupNameKey = sp.hotelService.service.systemServiceType.systemServiceGroup.name;
      const typeNameKey = sp.hotelService.service.systemServiceType.name;
      const serviceNameKey = sp.hotelService.service.name;
      const servicePriceTypeKey = sp.priceType;
      
      const groupName = translate(groupNameKey, 'service_groups');
      const typeName = translate(typeNameKey, 'service_types');
      const serviceName = translate(serviceNameKey, 'system_services');
      const servicePriceType = servicePriceTypeKey ? translate(servicePriceTypeKey, 'service_price_types') : '';
      const price = Number(sp.price)

      let group = acc.find((g: any) => g.groupName === groupName);
      if (!group) {
        group = { groupName, types: [] };
        acc.push(group);
      }

      let type = group.types.find((t: any) => t.typeName === typeName);
      if (!type) {
        type = { typeName, services: [] };
        group.types.push(type);
      }

      type.services.push({ serviceName, priceType: servicePriceType, price });

      return acc;
    }, []);

    const generalFoodPrices = availability.hotel?.hotelFoods
      ?.filter((food: any) => food.isFoodAvailable)
      ?.map((food: any) => ({
        name: food.name,
        description: food.description,
        foodType: translate(food.foodType, 'foods'),
        offerTypes:
          food.hotelFoodOfferTypes
            ?.map((o: any) => translate(o.offerType.name, 'food_offer_types'))
            .join(', ') || '-',
        cuisines:
          food.hotelFoodCuisines
            ?.map((c: any) => translate(c.cuisine.name, 'cuisines'))
            .join(', ') || '-',
        times: `${food.startDate}-${food.endDate}`,
        isFoodAvailable: food.isFoodAvailable,
      }));

    const templateData = {
      title: availability.title,
      dateRange: `${formatDate(availability.checkInTime)} - ${formatDate(availability.checkoutTime)}`,
      infoText:
        'Հյուրանոցի հիմնական արժեքները սահմանվում են սենյակների և ծառայությունների համար որոշակի ժամկետով։',
      hotelName: availability.hotel?.name || 'Hotel',
      hotelBankAccount: availability.hotel?.bankAccountNumber || '',
      hotelTin: availability.hotel?.tinNumber || '',
      hotelDirector: availability.hotel?.director || '',
      hotelPhone: availability.hotel?.phoneNumber ? `+${availability.hotel.phoneCode || ''} ${availability.hotel.phoneNumber}` : '',
      checkInTime: availability.checkInTime,
      checkoutTime:availability.checkoutTime,
      rooms,
      totalRooms: rooms?.reduce((sum: number, room: any) => sum + (room.roomNumberQuantity || 0), 0) || 0,
      totalGuestsWithMainBeds: rooms?.reduce((sum: number, room: any) => sum + (room.mainGuestQuantity ), 0) || 0,
      generalServices:
        servicesHierarchy?.length ||
        generalFoodPrices?.length,
      servicesHierarchy,
      generalFoodPrices,
      createdDate: formatDate(new Date().toISOString()),
      hotelAddress: availability.hotel?.address || '',
      t,
    };
    return templateData;
  }
}
