import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useMutation } from "react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/UseContexts";
import { errorToast, successToast } from "../shared/utils";

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
  const { setUser } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const { mutate: loginUser } = useMutation(apiClient.userLogin, {
    onSuccess: (data) => {
      setUser(data);
      successToast("Login successful");
      navigate(location.state?.from || "/", { replace: true });
    },
    onError: (error: Error) => {
      errorToast(error.message);
    },
  });

  const onSubmit = handleSubmit(async (data: LoginType) => {
    loginUser(data);
  });

  return (
    <div className="hero bg-base-200 py-12">
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
            <button type="submit" className="custom-btn text-xl">
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
