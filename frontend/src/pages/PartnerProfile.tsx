import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import PageTitle from "../components/PageTitle";

const PartnerProfile = () => {
  const { userId } = useParams();
  const { data: partner } = useQuery("fetchPartnerData", () =>
    apiClient.fetchPartnerData(userId as string)
  );

  return (
    <div className="">
      <PageTitle title="Profile" />
      <div className="flex-center md:mt-32 mt-20 p-3">
        <div className="bg-gradient-to-r from-[var(--main-color)] bg-opacity-20 to-white border-2 border-[var(--bg-color)] md:w-3/4 rounded-lg md:px-6 px-2 pb-6 shadow-lg shadow-slate-300">
          <div className="flex-center flex-col gap-2">
            <img
              src={partner?.profile}
              alt=""
              className="md:h-40 md:w-40 h-32 w-32 rounded-full md:-mt-20 -mt-16 border-2 border-[var(--bg-color)] bg-white"
            />
            <h3 className="text-2xl font-bold text-center text-[var(--second-bg-color)] mb-3">
              {partner?.name}
            </h3>
          </div>
          <div className="flex md:flex-row flex-col border border-[var(--second-bg-color)] rounded font-semibold">
            <div className="flex-1 md:border-r md:border-b-0 border-b border-[var(--second-bg-color)]">
              <h5 className="border-b border-[var(--second-bg-color)] text-lg font-bold py-1 px-2">
                Contact Information
              </h5>
              <div className="space-y-1 p-2">
                <div className="flex flex-row items-center justify-between gap-3">
                  <span>Email : </span>
                  <span>{partner?.email}</span>
                </div>
                <div className="flex flex-row items-center justify-between gap-3">
                  <span>Phone : </span>
                  <span>{partner?.phone}</span>
                </div>
                <div className="flex flex-row items-center justify-between gap-3">
                  <span>Country : </span>
                  <span>{partner?.country}</span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex-1">
                <h5 className="border-b border-[var(--second-bg-color)] text-lg font-bold md:text-right py-1 px-2">
                  Bank Information
                </h5>
                <div className="space-y-1 p-2">
                  <div className="flex flex-row items-center justify-between gap-3">
                    <span>Bank Name : </span>
                    <span>{partner?.bankName}</span>
                  </div>
                  <div className="flex flex-row items-center justify-between gap-3">
                    <span>Bank Address : </span>
                    <span>{partner?.bankAddress}</span>
                  </div>
                  <div className="flex flex-row items-center justify-between gap-3 ">
                    <span>Account Number : </span>
                    <span>{partner?.accountNumber}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerProfile;
