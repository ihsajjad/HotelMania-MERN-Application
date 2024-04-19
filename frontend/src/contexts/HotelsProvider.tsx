import { ReactNode, createContext } from "react";
import { useQuery } from "react-query";
import { GalleryType, HotelDataType } from "../../../backend/src/shared/types";
import * as apiClient from "../api-client";

export type HotelsContextType = {
  topHotels: HotelDataType[];
  loadingTopHotels: boolean;
  gallery: GalleryType[];
  galleryLoading: boolean;
};

export const HotelsContext = createContext<HotelsContextType>({
  topHotels: [],
  loadingTopHotels: true,
  gallery: [],
  galleryLoading: true,
});

export const HotelsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { data: hotels, isLoading: loadingTopHotels } = useQuery(
    "fetchTopHotels",
    apiClient.fetchTopHotels,
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const { data: galleryImages, isLoading: galleryLoading } = useQuery(
    "fetchGalleryImages",
    apiClient.fetchGalleryImages,
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const topHotels = hotels ? hotels : [];
  const gallery = galleryImages ? galleryImages : [];
  return (
    <HotelsContext.Provider
      value={{ topHotels, loadingTopHotels, gallery, galleryLoading }}
    >
      {children}
    </HotelsContext.Provider>
  );
};
