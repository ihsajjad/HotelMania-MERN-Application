import { LoginType } from "./pages/Login";
import { HotelDataType, HotelFormData, PartnerType } from "./shared/Types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const fetchUserData = async () => {
  const res = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Unauthorized access");

  return res.json();
};

export const userLogin = async (formData: LoginType) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message);

  return result;
};

export const userRegister = async (formData: FormData) => {
  const res = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message);

  return result;
};

export const partnerRegister = async (formData: FormData) => {
  const res = await fetch(`${API_BASE_URL}/api/partners/register`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const result = await res.json();

  if (!res.ok) throw new Error(result.message);

  return result;
};

export const logoutUser = async () => {
  const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  return res.json();
};

export const uploadImage = async (file: FormData): Promise<{ url: string }> => {
  const res = await fetch(`${API_BASE_URL}/api/hotels/upload-image`, {
    method: "POST",
    credentials: "include",
    body: file,
  });

  if (!res.ok) throw new Error("Failed to upload the image");

  return res.json();
};

/**================================================================================
                                    Admin Functions
 ================================================================================*/

export const fetchAllPartners = async (): Promise<PartnerType[]> => {
  const res = await fetch(`${API_BASE_URL}/api/partners`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch partners");

  return res.json();
};

/**================================================================================
                                    Partner Functions
 ================================================================================*/

export const fetchMyHotels = async (): Promise<HotelDataType[]> => {
  const res = await fetch(`${API_BASE_URL}/api/hotels/my-hotels`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Something went wrong");

  return res.json();
};

export const addMyHotel = async (formData: HotelFormData) => {
  const res = await fetch(`${API_BASE_URL}/api/hotels/add-hotel`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(formData),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message);

  return result;
};

export const deleteSingleHotel = async (hotelId: string) => {
  const res = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`, {
    method: "DELETE",
    credentials: "include",
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message);

  return result;
};
