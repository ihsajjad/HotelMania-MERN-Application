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
                className="flex gap-4 md:flex-row flex-col w-full p-4 rounded md:h-80 border border-zinc-300"
              ></div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyHotels;
