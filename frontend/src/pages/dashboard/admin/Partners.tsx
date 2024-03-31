import { useQuery } from "react-query";
import * as apiClient from "../../../api-client";
import PartnersTableItem from "../../../components/PartnersTableItem";

const Partners = () => {
  const { data: partners } = useQuery(
    "fetchAllPartners",
    apiClient.fetchAllPartners
  );
  console.log(partners);
  return (
    <div>
      <div className="text-2xl font-bold text-center text-[var(--bg-color)] border border-b-2 border-[var(--bg-color)] py-1">
        Hotel Partners
      </div>

      <div className="overflow-x-auto p-5 bg-slate-50">
        <table className="table bg-white shadow-xl shadow-[#00000044] text-center">
          {/* head */}
          <thead className="bg-slate-300 text-lg text-slate-700">
            <tr>
              <th>SL</th>
              <th>Image</th>
              <th>Name</th>
              <th>Country</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {partners &&
              partners.map((partner, i) => (
                <PartnersTableItem key={partner._id} partner={partner} i={i} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Partners;
