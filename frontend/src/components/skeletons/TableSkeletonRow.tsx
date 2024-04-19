const TableSkeletonRow = ({ type }: { type: string }) => {
  return (
    <tr>
      <th>
        <div className="skeleton h-6 w-8 mx-auto"></div>
      </th>
      <td className="flex-center">
        <div className="skeleton w-12 h-12 mx-auto"></div>
      </td>
      <td>
        <div className="skeleton w-20 h-6 mx-auto"></div>
      </td>
      <td>
        <div className="skeleton w-20 h-6 mx-auto"></div>
      </td>
      <td>
        <div className="skeleton w-16 h-6 mx-auto"></div>
      </td>
      {type === "hotels" && (
        <td>
          <div className="w-[100px] h-6 skeleton mx-auto"></div>
        </td>
      )}
      {type === "bookings" && (
        <>
          <td>
            <div className="w-[100px] h-6 skeleton mx-auto"></div>
          </td>
          <td>
            <div className="w-[100px] h-6 skeleton mx-auto"></div>
          </td>
        </>
      )}
      <td>
        <div className="w-[100px] h-8 skeleton mx-auto"></div>
      </td>
    </tr>
  );
};

export default TableSkeletonRow;
