import { HotelDataType } from "../../../backend/src/shared/types";

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

export type Pagination = {
  total: number;
  page: number;
  pages: number;
};

export type HotelsResponse = {
  data: HotelDataType[];
  pagination: Pagination;
};

export type SearchParams = {
  destination: string;
  adultCount: string;
  childCount: string;
  page: string | undefined;
  stars: string[] | undefined;
  types: string[] | undefined;
  facilities: string[] | undefined;
  maxPrice: string | undefined;
  sortOptions: string | undefined;
};

export type PaymentIntentResType = {
  clientSecret: string;
  paymentIntentId: string;
  total: number;
};
