import { FoodType } from '../../../common/enums';

export class HotelFood {
  id: number;
  hotelId: number;
  foodType: FoodType;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  hotel?: any; // Will be properly typed when Hotel entity is available
  hotelFoodCuisines?: HotelFoodCuisine[];
  hotelFoodOfferTypes?: HotelFoodOfferType[];
}

export class HotelFoodCuisine {
  id: number;
  hotelFoodId: number;
  cuisineId: number;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  hotelFood?: HotelFood;
  cuisine?: any; // Will be properly typed when Cuisine entity is available
}

export class HotelFoodOfferType {
  id: number;
  hotelFoodId: number;
  foodOfferTypeId: number;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  hotelFood?: HotelFood;
  foodOfferType?: any; // Will be properly typed when FoodOfferType entity is available
}
