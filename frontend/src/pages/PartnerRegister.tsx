import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { PartnerFormData } from "../shared/Types";
import {
  countries,
  errorToast,
  showInputError,
  successToast,
} from "../shared/utils";

const PartnerRegister = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<PartnerFormData>();

  const { mutate: registerPartner } = useMutation(apiClient.partnerRegister, {
    onSuccess: (result) => {
      console.log(result);
      successToast(result.message);
    },
    onError: (error: Error) => {
      console.log(error);
      errorToast(error.message);
    },
  });

  const onSubmit = handleSubmit((data: PartnerFormData) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("country", data.country);
    formData.append("bankName", data.bankName);
    formData.append("bankAddress", data.bankAddress);
    formData.append("accountNumber", data.accountNumber);
    formData.append("profile", data.profile[0]);

    registerPartner(formData);
  });

  const password = watch("password");
  const country = watch("country");
  console.log(country);

  return (
    <div className="hero min-h-screen bg-base-200 md:py-12 p-5">
      <div className="card md:w-2/3 w-full shadow-2xl bg-base-100 border-[var(--main-color)] border-2">
        <h2 className="text-3xl font-bold text-center mt-8 text-slate-500">
          Register as
          <span className="text-[var(--main-color)]"> Partner</span>
        </h2>
        <form
          onSubmit={onSubmit}
          className="card-body"
          encType="multipart/form-data"
        >
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-x-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name*</span>
              </label>
              <input
                type="text"
                placeholder="Full Name"
                {...register("name", { required: true })}
                className="input input-bordered"
              />
              {errors?.name && showInputError()}
            </div>{" "}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Country*</span>
              </label>
              <select
                {...register("country", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="" disabled selected>
                  Country
                </option>
                {countries.map((country) => (
                  <option value={country} key={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors?.country && showInputError()}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email*</span>
              </label>
              <input
                type="text"
                placeholder="example@gmail.com"
                {...register("email", { required: true })}
                className="input input-bordered"
              />
              {errors?.email && showInputError()}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone*</span>
              </label>
              <input
                type="text"
                placeholder="Phone Number"
                {...register("phone", { required: true })}
                className="input input-bordered"
              />
              {errors?.phone && showInputError()}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password*</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
                className="input input-bordered"
              />
              {errors?.password && showInputError()}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password*</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  validate: (val) => {
                    if (val !== password) return "Password doesn't match";
                  },
                })}
                className="input input-bordered"
              />
              {errors?.confirmPassword &&
                showInputError(errors.confirmPassword.message)}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bank Name*</span>
              </label>
              <input
                type="text"
                placeholder="Bank Name"
                {...register("bankName", { required: true })}
                className="input input-bordered"
              />
              {errors?.bankName && showInputError()}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bank Address*</span>
              </label>
              <input
                type="text"
                placeholder="Bank Address"
                {...register("bankAddress", { required: true })}
                className="input input-bordered"
              />
              {errors?.bankAddress && showInputError()}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Account Number*</span>
              </label>
              <input
                type="text"
                placeholder="Account Number"
                {...register("accountNumber", { required: true })}
                className="input input-bordered"
              />
              {errors?.accountNumber && showInputError()}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Select Profile</span>
              </label>
              <input
                type="file"
                className="file-input w-full max-w-xs"
                accept="image/*"
                {...register("profile", { required: true })}
              />
              {errors?.profile && showInputError()}
            </div>
          </div>
          <div className="form-control mb-0">
            <button className="custom-btn">Register</button>
          </div>
        </form>

        <p className="text-center mb-4">
          Already have an account? please{" "}
          <Link to="/login" className="underline text-[var(--main-color)]">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PartnerRegister;
