import { useQuery } from "react-query";
import * as apiClient from "../../../api-client";
import PageTitle from "../../../components/PageTitle";
import PartnersTableItem from "../../../components/PartnersTableItem";

const Partners = () => {
  const { data: partners } = useQuery(
    "fetchAllPartners",
    apiClient.fetchAllPartners
  );
  console.log(partners);
  return (
    <div>
      <PageTitle title="Hotel Partners" />

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
        pP
      </div>
    </div>
  );
};

export default Partners;
