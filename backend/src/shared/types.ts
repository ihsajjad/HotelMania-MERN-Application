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
  email: string;
  role: string;
  profile: string;
  isVerified?: boolean;
};

export type GalleryType = { url: string; _id: string };

export type BookingType = {
  userId: string;
  hotelId: string;
  numberOfNights: number;
  total: number;
  checkIn: Date;
  checkOut: Date;
  bookedAt: Date;
};
