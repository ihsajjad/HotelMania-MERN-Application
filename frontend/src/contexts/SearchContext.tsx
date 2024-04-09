import { ReactNode, createContext, useState } from "react";

export type SearchContextType = {
  destination: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  hotelId: string;
  saveSearchValues: (
    destination: string,
    adultCount: number,
    childCount: number,
    checkIn: Date,
    checkOut: Date
  ) => void;
  clearSearchValues: () => void;
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
  const [checkIn, setCheckIn] = useState<Date>(
    () =>
      new Date(sessionStorage.getItem("checkIn") || new Date().toISOString())
  );
  const [checkOut, setCheckOut] = useState<Date>(
    () =>
      new Date(sessionStorage.getItem("checkOut") || new Date().toISOString())
  );
  const [hotelId, setHotelId] = useState<string>(
    () => sessionStorage.getItem("hotelId") || ""
  );

  const saveSearchValues = (
    destination: string,
    adultCount: number,
    childCount: number,
    checkIn: Date,
    checkOut: Date,
    hotelId?: string
  ) => {
    setDestination(destination);
    setAdultCount(adultCount);
    setChildCount(childCount);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    if (hotelId) setHotelId(hotelId);

    sessionStorage.setItem("destination", destination);
    sessionStorage.setItem("adultCount", adultCount.toString());
    sessionStorage.setItem("childCount", childCount.toString());
    sessionStorage.setItem("checkIn", checkIn.toString());
    sessionStorage.setItem("checkOut", checkOut.toString());
  };

  const clearSearchValues = () => {
    sessionStorage.removeItem("destination");
    sessionStorage.removeItem("adultCount");
    sessionStorage.removeItem("childCount");
    sessionStorage.removeItem("checkIn");
    sessionStorage.removeItem("checkOut");

    setDestination("");
    setAdultCount(1);
    setChildCount(0);
    setCheckIn(new Date());
    setCheckOut(new Date());
  };

  return (
    <SearchContext.Provider
      value={{
        destination,
        adultCount,
        childCount,
        checkIn,
        checkOut,
        hotelId,
        saveSearchValues,
        clearSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
