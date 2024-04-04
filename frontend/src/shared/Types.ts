export type PartnerType = {
  _id: string;
  name: string;
  profile: string;
  isVerified: boolean;
  country: string;
};

export type FormInputProps = {
  label: string;
  type: string;
  placeholder: string;
  property: string;
};

export type PartnerFormData = {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword?: string;
  country: string;
  bankName: string;
  bankAddress: string;
  accountNumber: string;
  profile: FileList;
};

export type HotelDataType = {
  _id: string;
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

export type HotelFormData = {
  name: string;
  description: string;
  city: string;
  country: string;
  type: string;
  pricePerNight: number;
  adultCount: number;
  childCount: number;
  facilities: string[];
  images: { label: string; image: string }[];
};
