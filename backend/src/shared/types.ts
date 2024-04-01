export type UserType = {
  name: string;
  email: string;
  password: string;
  profile: string;
  role: "Admin" | "User" | "Sub Admin" | "Hotel";
};

export type HotelOwnerType = {
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
  userId: string;
  name: string;
  description: string;
  city: string;
  country: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  adultCount: number;
  childCount: number;
  facilities: string[];
  images: { label: string; image: string }[];
  lastUpdated: Date;
};
