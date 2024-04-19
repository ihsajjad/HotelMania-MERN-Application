import { ChangeEvent, useState } from "react";
import { useQuery } from "react-query";
import { BookingType } from "../../../../../backend/src/shared/types";
import * as apiClient from "../../../api-client";
import PageTitle from "../../../components/PageTitle";
import TableSkeletonRow from "../../../components/skeletons/TableSkeletonRow";
import BookingsTableItem from "../../../components/tableItems/BookingsTableItem";
import TablePagination from "../../../components/tableItems/TablePagination";
import { Pagination } from "../../../shared/Types";

const AllBookings = () => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { data, isLoading } = useQuery(
    ["fetchAllBookings", itemsPerPage, pageNumber],
    () => apiClient.fetchAllBookings(itemsPerPage, pageNumber)
  );

  let allBookings: BookingType[] = [];
  let pagination: Pagination = { total: 0, page: 0, pages: 0 };

  if (data) {
    allBookings = data.data;
    pagination = data.pagination;
  }

  const changeItemsPerPage = (event: ChangeEvent<HTMLSelectElement>) => {
    const items = parseInt(event.target.value);
    setItemsPerPage(items);
  };

  const changePageNumber = (page: number) => {
    setPageNumber(page);
  };

  return (
    <div className="min-h-screen">
      <PageTitle title="All Bookings" />
      <div className="p-5 bg-slate-50">
        <div className="overflow-x-auto shadow-xl shadow-[#00000044]">
          <table className="table bg-white  text-center rounded-none">
            {/* head */}
            <thead className="bg-slate-300 text-lg text-slate-700">
              <tr>
                <th>SL</th>
                <th>Hotel</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Nights</th>
                <th>$ Paid</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <>
                  <TableSkeletonRow type="bookings" />
                  <TableSkeletonRow type="bookings" />
                  <TableSkeletonRow type="bookings" />
                  <TableSkeletonRow type="bookings" />
                  <TableSkeletonRow type="bookings" />
                  <TableSkeletonRow type="bookings" />
                </>
              ) : (
                allBookings &&
                allBookings.map((booking, i) => (
                  <BookingsTableItem
                    key={booking._id}
                    booking={booking}
                    i={i}
                  />
                ))
              )}
            </tbody>
          </table>
          <TablePagination
            changeItemsPerPage={changeItemsPerPage}
            changePageNumber={changePageNumber}
            itemsPerPage={itemsPerPage}
            page={pagination?.page}
            pages={pagination?.pages}
          />
        </div>
      </div>
    </div>
  );
};

export default AllBookings;
