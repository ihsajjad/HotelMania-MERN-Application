import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import * as apiClient from "../api-client";

export interface LoginType {
  email: string;
  password: string;
}

const Login = () => {
  const [show, setShow] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>();

  const { mutate: loginUser } = useMutation({
    mutationFn: apiClient.userLogin,
    onSuccess: () => {
      toast.success("Login successful", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    },
    onError: (error: Error) => {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    },
  });

  const onSubmit = handleSubmit((data: LoginType) => {
    loginUser(data);
  });

  return (
    <div className="hero min-h-screen bg-base-200 md:py-12 py-5">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100 border-[var(--main-color)] border-2">
        <form onSubmit={onSubmit} className="card-body">
          <h2 className="text-3xl font-bold text-center">Please Login!</h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "This field is required" })}
              className="input input-bordered"
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-0.5">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={`${show ? "password" : "text"}`}
              placeholder="Password"
              {...register("password", { required: "This field is required" })}
              className="input input-bordered"
            />
            {errors.password && (
              <span className="text-red-500 text-sm mt-0.5">
                {errors.password.message}
              </span>
            )}

            <span
              onClick={() => setShow(!show)}
              className="absolute right-4 top-[52px] text-xl"
            >
              {show ? <FaEye /> : <FaEyeSlash />}
            </span>

            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control">
            <button type="submit" className="custom-btn-outline">
              Login
            </button>
          </div>
        </form>

        <div className="divider">OR</div>
        <p className="text-center mb-4">
          New to Hotel Mania? please{" "}
          <Link to="/register" className="underline text-[var(--main-color)]">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
