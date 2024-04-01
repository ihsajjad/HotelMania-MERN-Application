import { useQuery } from "react-query";
import * as apiClient from "../../../api-client";
import PageTitle from "../../../components/PageTitle";
import { useAppContext } from "../../../contexts/UseContexts";
const MyHotels = () => {
  const { user } = useAppContext() || {};

  const { data: hotels } = useQuery(
    "fetchMyHotels",
    () => apiClient.fetchMyHotels(user._id),
    { enabled: !!user._id }
  );
  console.log(hotels);
  return (
    <div>
      <PageTitle title="My Hotels" />
      <div className="p-4">
        <h2 className="text-xl">You have added {hotels?.length} hotels</h2>
        <div className="flex flex-col gap-4 items-center">
          {hotels &&
            hotels.map((hotel) => (
              <div
                key={hotel._id}
                className="flex md:flex-row flex-col w-full border border-zinc-300"
              >
                <div className="flex-1">
                  <img src={hotel.images[0].image} alt="" className="h-40" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{hotel.name}</h3>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyHotels;
