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
