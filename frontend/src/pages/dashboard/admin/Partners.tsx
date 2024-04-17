import { ChangeEvent, useState } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../../../api-client";
import PageTitle from "../../../components/PageTitle";
import PartnersTableItem from "../../../components/tableItems/PartnersTableItem";
import TablePagination from "../../../components/tableItems/TablePagination";
import { Pagination, PartnerType } from "../../../shared/Types";

const Partners = () => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { data } = useQuery(
    ["fetchAllPartners", itemsPerPage, pageNumber],
    () => apiClient.fetchAllPartners(itemsPerPage, pageNumber)
  );

  let partners: PartnerType[] = [];
  let pagination: Pagination = { total: 0, page: 0, pages: 0 };

  if (data) {
    partners = data.data;
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
    <div>
      <PageTitle title="Hotel Partners" />

      <div className="p-5 bg-slate-50">
        <div className="overflow-x-auto shadow-xl shadow-[#00000044]">
          <table className="table bg-white text-center">
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
                  <PartnersTableItem
                    key={partner._id}
                    partner={partner}
                    i={i}
                  />
                ))}
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

export default Partners;
