import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { errorToast, showInputError, successToast } from "../shared/utils";

type RegisterFormDataType = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  profile: FileList;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormDataType>();

  const { mutate: saveUser, isLoading } = useMutation(apiClient.userRegister, {
    onSuccess: () => {
      successToast("Registration successful");
    },
    onError: (error: Error) => {
      errorToast(error.message);
    },
  });

  const currentPass = watch("password");

  const onSubmit = handleSubmit((data: RegisterFormDataType) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("profile", data.profile[0]);

    saveUser(formData);
  });

  return (
    <div className="hero bg-base-200 py-12 px-5">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100 border-[var(--main-color)] border-2">
        <h2 className="text-3xl font-bold text-center mt-8">
          Please Register!
        </h2>
        <form
          onSubmit={onSubmit}
          className="card-body overflow-x-hidden"
          encType="multipart/form-data"
        >
          <div className="flex flex-col ">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name*</span>
              </label>
              <input
                type="text"
                placeholder="Full Name"
                {...register("name", { required: true })}
                className="input input-bordered"
              />
              {errors.name && showInputError()}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email*</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
                className="input input-bordered"
              />
              {errors.email && showInputError()}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password*</span>
              </label>
              <input
                type="password"
                placeholder="password"
                {...register("password", {
                  required: true,
                  // minLength: 6,
                  // maxLength: 20,
                  // pattern: /(?=.*[A-Z])(?=.*[!@#$&%*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                className="input input-bordered"
              />
              {errors.password && showInputError()}
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
                    if (val !== currentPass) return "Password doesn't match";
                  },
                })}
                className="input input-bordered"
              />
            </div>
            {errors.confirmPassword &&
              showInputError(errors.confirmPassword.message as string)}
            <div className="form-control overflow-x-hidden">
              <label className="label">
                <span className="label-text">Select Profile</span>
              </label>
              <div className="border p-2 rounded-md border-slate-300">
                <input
                  type="file"
                  accept="image/*"
                  className="w-[250px]"
                  {...register("profile", {
                    validate: (files: FileList) => {
                      if (files[0]?.size > 1024 * 1024) {
                        return "Maximum file size 1 MB";
                      }
                    },
                  })}
                />
              </div>

              {errors.profile && showInputError(errors.profile.message)}
            </div>
          </div>
          <div className="form-control mb-0">
            <button className="custom-btn text-xl">
              {isLoading ? (
                <AiOutlineLoading3Quarters
                  size={24}
                  className="animate-spin mx-auto my-0.5"
                />
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>

        <p className="text-center mb-4">
          Already have an account? please{" "}
          <Link to="/login" className="underline text-[var(--main-color)]">
            Login
          </Link>
        </p>
        <p className="text-center mb-4 text-sm">
          Want to become a partner?{" "}
          <Link
            to="/partner/register"
            className="underline text-[var(--main-color)]"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
