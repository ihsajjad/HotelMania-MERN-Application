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
