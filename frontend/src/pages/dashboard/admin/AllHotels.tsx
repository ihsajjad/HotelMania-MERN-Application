import { useState } from "react";
import { useQuery } from "react-query";
import { HotelDataType } from "../../../../../backend/src/shared/types";
import * as apiClient from "../../../api-client";
import HotelsTableItem from "../../../components/HotelsTableItem";
import PageTitle from "../../../components/PageTitle";
import { Pagination } from "../../../shared/Types";

const AllHotels = () => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { data } = useQuery(["fetchAllHotels", itemsPerPage, pageNumber], () =>
    apiClient.fetchAllHotels(pageNumber, itemsPerPage)
  );

  let hotels: HotelDataType[] = [];
  let pagination: Pagination = { total: 0, page: 0, pages: 0 };

  if (data) {
    hotels = data.data;
    pagination = data.pagination;
  }

  return (
    <div>
      <PageTitle title="All Hotels" />
      <div className="p-5 bg-slate-50">
        <h3 className="text-xl font-bold text-slate-600 mb-2">
          {pagination.total} Hotels available
        </h3>
        <div className="overflow-x-auto min-h-screen shadow-xl shadow-[#00000044]">
          <table className="table bg-white text-center rounded-none border">
            {/* head */}
            <thead className="bg-slate-300 text-lg text-slate-700">
              <tr>
                <th>SL</th>
                <th>Name</th>
                <th>Address</th>
                <th>Price Per Night</th>
                <th>Type</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {hotels &&
                hotels.map((hotel, i) => (
                  <HotelsTableItem key={hotel._id} hotel={hotel} i={i} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllHotels;
