import { PartnerType } from "../shared/Types";

interface Props {
  partner: PartnerType;
  i: number;
}

const PartnersTableItem = ({ partner, i }: Props) => {
  return (
    <tr className="hover">
      <th>{i + 1}</th>
      <td>
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <img
              src={
                partner?.profile ||
                "https://minio.production.cloudplatform.tech/scalable-pages/2022/05/5star.svg"
              }
              alt="Avatar Tailwind CSS Component"
            />
          </div>
        </div>
      </td>
      <td>{partner.name}</td>
      <td>{partner.country}</td>
      <td>
        <span
          className={`${partner.isVerified ? "bg-green-400" : "bg-red-300"} inline-block w-24 font-semibold text-white text-xs py-1 px-2 rounded`}
        >
          {partner.isVerified ? "Verified" : "Not Verified"}
        </span>
      </td>
      <td>
        <button className="custom-btn w-24 inline-block font-semibold">
          View Details
        </button>
      </td>
    </tr>
  );
};

export default PartnersTableItem;
