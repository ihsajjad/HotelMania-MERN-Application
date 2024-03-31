import { LoginType } from "./pages/Login";
import { PartnerType } from "./sheared/Types";

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
    // headers: { "Content-Type": "multipart/form-data" },
    body: formData,
  });

  const result = await res.json();
  console.log(result);
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

export const fetchAllPartners = async (): Promise<PartnerType[]> => {
  const res = await fetch(`${API_BASE_URL}/api/partners`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch partners");

  return res.json();
};
