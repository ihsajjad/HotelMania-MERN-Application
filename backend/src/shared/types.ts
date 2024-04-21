export type UserType = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  profile: string;
  role: "Admin" | "User" | "Sub Admin" | "Hotel";
};

export type HotelOwnerType = {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  profile: string;
  bankName: string;
  bankAddress: string;
  accountNumber: string;
  country: string;
  hotelAddress: string;
  isVerified: boolean;
};

export type HotelDataType = {
  _id?: string;
  userId: string;
  name: string;
  description: string;
  city: string;
  country: string;
  type: string;
  pricePerNight: number;
  starRating?: number;
  adultCount: number;
  childCount: number;
  facilities: string[];
  images: { label: string; image: string }[];
  lastUpdated: Date;
};

export type AuthUserType = {
  _id: string;
  name?: string;
  email: string;
  role: string;
  profile: string;
  isVerified?: boolean;
};

export type GalleryType = { url: string; _id: string; name: string };

export type BookingType = {
  _id?: string;
  userId: string;
  hotelOwner: HotelOwnerType | string;
  hotel?: HotelDataType | string;
  paymentIntentId: string;
  numberOfNights: number;
  total: number;
  checkIn: Date;
  checkOut: Date;
  bookedAt?: Date;
};

export type StatisticsDataType = {
  _id?: string;
  date: Date;
  amount: number;
  quantity: number;
  year: number;
  month: string;
};

export type HotelCardType = {
  _id: string;
  name: string;
  coverPhoto: { url: string; label: string };
  city: string;
  country: string;
  starRating: number;
  type: string;
  pricePerNight: number;
  facilities: string[];
  description: string;
  lastUpdated?: Date;
};

export type TableHotelType = {
  _id: string;
  name: string;
  city: string;
  country: string;
  pricePerNight: number;
  type: string;
  lastUpdated: Date;
  userId?: string;
};
