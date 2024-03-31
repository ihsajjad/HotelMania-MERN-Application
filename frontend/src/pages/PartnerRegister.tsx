import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FormInputProps } from "../shared/Types";
import { countries, showInputError } from "../shared/utils";

const PartnerRegister = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const onSubmit = handleSubmit((data) => console.log(data));

  const formInput = ({
    label,
    type,
    placeholder,
    property,
  }: FormInputProps) => (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}*</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(property, { required: "This field is required" })}
        className="input input-bordered"
      />
      {errors?.[property] && showInputError("This field is required")}
    </div>
  );

  const password = watch("password");

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
            {formInput({
              label: "Full Name",
              type: "text",
              placeholder: "Full Name",
              property: "name",
            })}
            {formInput({
              label: "Hotel Address",
              type: "text",
              placeholder: "Hotel Address",
              property: "hotelAddress",
            })}
            {formInput({
              label: "Phone",
              type: "text",
              placeholder: "Phone Number",
              property: "phone",
            })}
            {formInput({
              label: "Email",
              type: "email",
              placeholder: "example@gmail.com",
              property: "email",
            })}
            {formInput({
              label: "Password",
              type: "password",
              placeholder: "Password",
              property: "password",
            })}
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
                showInputError(errors.confirmPassword.message as string)}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Country*</span>
              </label>
              <select className="select select-bordered w-full">
                <option disabled selected>
                  Country
                </option>
                {countries.map((country) => (
                  <option value={country} key={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            {formInput({
              label: "Bank Name",
              type: "text",
              placeholder: "Bank Name",
              property: "bankName",
            })}
            {formInput({
              label: "Bank Address",
              type: "text",
              placeholder: "Bank Address",
              property: "bankAddress",
            })}
            {formInput({
              label: "Account Number",
              type: "text",
              placeholder: "Bank Account Number",
              property: "accountNumber",
            })}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Select Profile</span>
              </label>
              <input
                type="file"
                className="file-input w-full max-w-xs"
                multiple
                accept="image/*"
                // {...register("profile")}
              />
              {/* {errors.image && (
                  <span className="text-red-500">Image is required</span>
                )} */}
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
