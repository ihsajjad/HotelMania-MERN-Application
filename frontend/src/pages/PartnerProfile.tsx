import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import PageTitle from "../components/PageTitle";

const PartnerProfile = () => {
  const { userId } = useParams();
  const { handleSubmit, register, setValue } = useForm();

  const { data: partner } = useQuery(
    "fetchPartnerData",
    () => apiClient.fetchPartnerData(userId as string),
    { enabled: !!userId }
  );

  useEffect(() => {
    setValue("status", partner?.isVerified);
  }, [setValue, partner]);

  const handleStatus = handleSubmit((data) => {
    if (data.status === "true") {
      console.log("success");
    } else if (data.status === "false") {
      console.log("failed");
    }
  });

  return (
    <div className="">
      <PageTitle title="Profile" />
      <div className="flex-center flex-col md:mt-24 mt-20 p-3">
        <div className="bg-gradient-to-r from-[var(--main-color)] bg-opacity-20 to-white border-2 border-[var(--bg-color)] sm:w-3/4 w-full rounded-lg md:px-3 px-2 pb-6 shadow-lg shadow-slate-300 relative">
          <span
            className={`${partner?.isVerified ? "bg-green-500" : "bg-red-500"} font-bold md:text-lg text-sm py-1 md:px-3 px-2 text-white rounded mt-3 absolute top-0 md:right-3 right-2 shadow-md shadow-[#0000004e]`}
          >
            {partner?.isVerified ? "Verified" : "Not Verified"}
          </span>
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

          <form
            className="flex items-center justify-between mt-3 p-2 rounded border border-[var(--bg-color)]"
            onSubmit={handleStatus}
          >
            <select
              {...register("status")}
              className="py-1 px-2 focus:outline-slate-400 rounded"
            >
              <option value="true">Verified</option>
              <option value="false">Not Verified</option>
            </select>
            <button type="submit" className="custom-btn">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PartnerProfile;
