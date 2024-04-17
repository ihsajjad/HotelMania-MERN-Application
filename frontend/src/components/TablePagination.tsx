import { ChangeEvent } from "react";

type Props = {
  changeItemsPerPage: (e: ChangeEvent<HTMLSelectElement>) => void;
  itemsPerPage: number;
  changePageNumber: (page: number) => void;
  pages: number;
  page: number;
};

const TablePagination = ({
  changeItemsPerPage,
  changePageNumber,
  itemsPerPage,
  pages,
  page,
}: Props) => {
  return (
    <div className="bg-slate-300 w-full flex-center py-2 gap-2">
      <div>
        Hotels Per Page :{" "}
        <select value={itemsPerPage} onChange={changeItemsPerPage} id="">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
      </div>

      <div className="flex items-center gap-1">
        <span>Pages:</span>
        <div className="flex gap-1">
          {Array(pages)
            .fill(undefined)
            ?.map((_, i) => {
              const value = i + 1;
              return (
                <button
                  key={value}
                  onClick={(e) =>
                    changePageNumber(parseInt(e.currentTarget.innerHTML))
                  }
                  className={`h-6 w-6 text-lg flex-center font-bold rounded ${page === value ? "bg-[var(--main-color)] text-white" : "bg-white text-slate-500"}`}
                >
                  {value}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
