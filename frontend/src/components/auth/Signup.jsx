import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useAuthFunction } from "../../hook/useAuthForm.js";
import Loading from "../Loading.jsx";
import styles from "./Auth.module.css";

const Signup = ({ handleClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { isSuccess, isError, isLoading, error, mutate } = useAuthFunction();

  const onHandleSubmit = (data, e) => {
    e.preventDefault();

    mutate({ formData: data, query: "signup" });
  };

  return (
    <div className="bg-gradient-to-b from-indigo-200 to-indigo-300 flex flex-col justify-center h-screen items-center">
      <form
        onSubmit={handleSubmit(onHandleSubmit)}
        className="bg-slate-100 w-[90%] md:w-3/6 p-6 rounded mx-8"
      >
        {isError && (
          <p className="mt-3 text-center text-red-600 bg-white rounded py-1 shadow">
            {error.message}
          </p>
        )}
        <div
          onClick={handleClose}
          className=" flex justify-between items-center mb-3"
        >
          {isSuccess && <p className="text-blue-600">Success✓</p>}
          <div className="w-fit py-1  text-white">
            {
              <div onClick={handleClose}>
                {isSuccess ? (
                  <p className="text-blue-600 px-3 py-1 rounded border border-gray-300">
                    Login
                  </p>
                ) : (
                  <p className="px-3 py-1 rounded text-red-600 border border-gray-300">
                    X
                  </p>
                )}
              </div>
            }
          </div>
        </div>
        <h1 className="text-2xl font-black text-blue-900 mb-4 ">
          Create New Account
        </h1>
        <div className="my-4 flex flex-col">
          <label htmlFor="username" className="mb-2 text-slate-700">
            Username
          </label>
          <input
            type="text"
            {...register("username", { required: true })}
            className={`border border-gray-300 py-1 px-3 focus:outline outline-blue-100 rounded  ::placeholder:text-sm text-slate-700 ${styles.placeholder}`}
            id="username"
            placeholder="Enter username"
          />
          {errors.username && (
            <p className="text-red-600 mt-2 px-1">Username is required</p>
          )}
        </div>
        <div className="my-4 flex flex-col">
          <label htmlFor="password" className="mb-2 text-slate-700">
            Password
          </label>
          <input
            type="password"
            {...register("password", { required: true })}
            id="password"
            className={`border border-gray-300 py-1 px-3 focus:outline outline-blue-100 rounded ${styles.placeholder} text-slate-800`}
            placeholder="Enter password"
          />
          {errors.password && (
            <p className="text-red-600 mt-2 px-1">Password is required</p>
          )}
        </div>

        <input
          type="submit"
          className="bg-blue-900 text-white px-4 py-1 rounded disabled:opacity-40"
          value="signup"
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default Signup;
