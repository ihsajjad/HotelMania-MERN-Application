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
