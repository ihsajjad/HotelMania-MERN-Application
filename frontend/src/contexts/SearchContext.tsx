import { ReactNode, createContext, useState } from "react";

export type SearchContextType = {
  destination: string;
  adultCount: number;
  childCount: number;
  checkInDate: Date;
  checkOutDate: Date;
  hotelId: string;
  saveSearchValues: (
    destination: string,
    adultCount: number,
    childCount: number,
    checkInDate: Date,
    checkOutDate: Date
  ) => void;
};

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);

export const SearchContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [destination, setDestination] = useState<string>(
    () => sessionStorage.getItem("destination") || ""
  );
  const [adultCount, setAdultCount] = useState<number>(() =>
    parseInt(sessionStorage.getItem("adultCount") || "1")
  );
  const [childCount, setChildCount] = useState<number>(() =>
    parseInt(sessionStorage.getItem("childCount") || "1")
  );
  const [checkInDate, setCheckInDate] = useState<Date>(
    () =>
      new Date(
        sessionStorage.getItem("checkInDate") || new Date().toISOString()
      )
  );
  const [checkOutDate, setCheckOutDate] = useState<Date>(
    () =>
      new Date(
        sessionStorage.getItem("checkOutDate") || new Date().toISOString()
      )
  );
  const [hotelId, setHotelId] = useState<string>(
    () => sessionStorage.getItem("hotelId") || ""
  );

  const saveSearchValues = (
    destination: string,
    adultCount: number,
    childCount: number,
    checkInDate: Date,
    checkOutDate: Date,
    hotelId?: string
  ) => {
    setDestination(destination);
    setAdultCount(adultCount);
    setChildCount(childCount);
    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);
    if (hotelId) setHotelId(hotelId);

    sessionStorage.setItem("destination", destination);
    sessionStorage.setItem("adultCount", adultCount.toString());
    sessionStorage.setItem("childCount", childCount.toString());
    sessionStorage.setItem("checkInDate", checkInDate.toString());
    sessionStorage.setItem("checkOutDate", checkOutDate.toString());
  };

  return (
    <SearchContext.Provider
      value={{
        destination,
        adultCount,
        childCount,
        checkInDate,
        checkOutDate,
        hotelId,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
