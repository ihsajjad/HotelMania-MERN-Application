import { LoaderFunctionArgs } from "react-router-dom";
import {
  AuthUserType,
  BookingType,
  GalleryType,
  HotelCardType,
  HotelDataType,
  HotelOwnerType,
  StatisticsDataType,
  TableHotelType,
} from "../../backend/src/shared/types";
import { LoginType } from "./pages/Login";

import {
  AllBookingsResponse,
  AllPartnersResponse,
  HotelsResponse,
  Pagination,
  PaymentIntentResType,
  SearchParams,
} from "./shared/Types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const fetchSearchHotels = async (
  searchParams: SearchParams
): Promise<HotelsResponse> => {
  const queryParams = new URLSearchParams();

  queryParams.append("destination", searchParams.destination);
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");
  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOptions", searchParams.sortOptions || "");

  searchParams.facilities?.forEach((facility) =>
    queryParams.append(`facilities`, facility)
  );

  searchParams.types?.forEach((type) => queryParams.append(`types`, type));
  searchParams.stars?.forEach((star) => queryParams.append(`stars`, star));

  const res = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`);

  if (!res) throw new Error("Some thing went wrong");

  return res.json();
};

export const fetchTopHotels = async (): Promise<HotelCardType[]> => {
  const res = await fetch(`${API_BASE_URL}/api/hotels/top-5`);

  if (!res.ok) throw new Error("Something went wrong");

  return res.json();
};

export const fetchGalleryImages = async (): Promise<GalleryType[]> => {
  const res = await fetch(`${API_BASE_URL}/api/hotels/gallery`);

  if (!res.ok) throw new Error("Something went wrong");

  return res.json();
};

export const fetchMe = async (): Promise<AuthUserType> => {
  const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
    credentials: "include",
  });

  // if (!res.ok) throw new Error("Unauthorized access");

  return res.json();
};

export const userLogin = async (formData: LoginType): Promise<AuthUserType> => {
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

export const fetchSingleHotel = async (
  hotelId: string | LoaderFunctionArgs
): Promise<HotelDataType> => {
  const res = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);

  if (!res.ok) throw new Error("Failed to fetch hotel");
  const result = await res.json();

  return result;
};

/**================================================================================
                                    User's Functions
 ================================================================================*/

export const createPaymentIntent = async (
  hotelId: string,
  numberOfNights: number
): Promise<PaymentIntentResType> => {
  const res = await fetch(
    `${API_BASE_URL}/api/bookings/${hotelId}/payment_intent`,
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ numberOfNights }),
    }
  );

  if (!res.ok) throw new Error("Failed to create intent");

  return res.json();
};

export const createBooking = async (booking: BookingType) => {
  const res = await fetch(`${API_BASE_URL}/api/bookings`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });

  const result = await res.json();

  if (!res.ok) throw new Error("Failed to book hotel");

  return result;
};

export const fetchCurrentBookings = async (): Promise<BookingType[]> => {
  const res = await fetch(`${API_BASE_URL}/api/bookings/current_bookings`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch bookings");

  return res.json();
};

export const fetchMyBookings = async (): Promise<BookingType[]> => {
  const res = await fetch(`${API_BASE_URL}/api/bookings/my-bookings`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Something went wrong");

  return res.json();
};

/**================================================================================
                                    Admin's Functions
 ================================================================================*/

export const fetchAllHotels = async (
  pageNumber: number,
  itemsPerPage: number
): Promise<{ data: TableHotelType[]; pagination: Pagination }> => {
  const queryParams = new URLSearchParams();

  queryParams.append("pageNumber", pageNumber.toString());
  queryParams.append("itemsPerPage", itemsPerPage.toString());

  const res = await fetch(`${API_BASE_URL}/api/hotels?${queryParams}`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Something went wrong");

  return res.json();
};

export const fetchAllPartners = async (
  itemsPerPage: number,
  pageNumber: number
): Promise<AllPartnersResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("itemsPerPage", itemsPerPage.toString());
  queryParams.append("pageNumber", pageNumber.toString());

  const res = await fetch(`${API_BASE_URL}/api/partners?${queryParams}`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch partners");

  return res.json();
};

export const changeIsVerifiedStatus = async ({
  userId,
  status,
}: {
  userId: string;
  status: string;
}) => {
  const res = await fetch(
    `${API_BASE_URL}/api/partners/${userId}?isVerified=${status}`,
    { credentials: "include", method: "PUT" }
  );

  const result = await res.json();
  if (!res.ok) throw new Error(result.message);

  return result;
};

export const fetchAllBookings = async (
  itemsPerPage: number,
  pageNumber: number
): Promise<AllBookingsResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("itemsPerPage", itemsPerPage.toString());
  queryParams.append("pageNumber", pageNumber.toString());

  const res = await fetch(`${API_BASE_URL}/api/bookings?${queryParams}`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Something went wrong");

  return res.json();
};

export const fetchStatistics = async (): Promise<StatisticsDataType[]> => {
  const res = await fetch(`${API_BASE_URL}/api/statistics`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Something went wrong");

  return res.json();
};

/**================================================================================
                                    Partner's Functions
 ================================================================================*/

export const fetchMyHotels = async (): Promise<HotelDataType[]> => {
  const res = await fetch(`${API_BASE_URL}/api/hotels/my-hotels`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Something went wrong");

  return res.json();
};

export const fetchPartnerData = async (
  userId: string
): Promise<HotelOwnerType> => {
  const res = await fetch(`${API_BASE_URL}/api/partners/${userId}`, {
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) throw new Error(result.message);

  return result;
};

export const addMyHotel = async (formData: HotelDataType) => {
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

export const updateHotel = async (hotelData: HotelDataType) => {
  const res = await fetch(`${API_BASE_URL}/api/hotels/${hotelData._id}`, {
    credentials: "include",
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(hotelData),
  });

  if (!res.ok) throw new Error("Failed to update hotel");

  return res.json();
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
