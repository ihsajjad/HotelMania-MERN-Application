import { useQuery } from "react-query";
import * as apiClient from "../../../api-client";
import BookingsTableItem from "../../../components/BookingsTableItem";
import PageTitle from "../../../components/PageTitle";

const AllBookings = () => {
  const { data: allBookings } = useQuery(
    "fetchAllBookings",
    apiClient.fetchAllBookings
  );

  return (
    <div className="min-h-screen">
      <PageTitle title="All Bookings" />
      <div className="overflow-x-auto p-5 bg-slate-50 min-h-screen">
        <table className="table bg-white shadow-xl shadow-[#00000044] text-center">
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
            {allBookings &&
              allBookings.map((booking, i) => (
                <BookingsTableItem key={booking._id} booking={booking} i={i} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBookings;
