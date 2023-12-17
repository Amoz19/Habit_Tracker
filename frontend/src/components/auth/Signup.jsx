import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useAuthFunction } from "../../hook/useAuthForm.js";
import Loading from "../Loading.jsx";

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
    <div className="bg-gradient-to-b from-indigo-200 to-indigo-300 flex flex-col justify-center items-center flex-1">
      <form
        onSubmit={handleSubmit(onHandleSubmit)}
        className="bg-slate-100 w-fit p-6 rounded"
      >
        <div
          onClick={handleClose}
          className=" flex justify-between items-center mb-3"
        >
          {isSuccess && <p className="text-green-600">Success</p>}
          <div className="w-fit py-1  text-white">
            {
              <div onClick={handleClose}>
                {isSuccess ? (
                  <p className="bg-green-600 px-3 py-1 rounded">Login</p>
                ) : (
                  <p className="bg-red-600 px-3 py-1 rounded">X</p>
                )}
              </div>
            }
          </div>
        </div>
        <div>
          <input
            type="text"
            {...register("username", { required: true })}
            className="bg-blue-100 py-1 px-3 focus:outline outline-blue-100 rounded"
            placeholder="Enter username"
          />
          {errors.username && (
            <p className="text-red-900">Username is required</p>
          )}
        </div>
        <div className="py-6">
          <input
            type="password"
            {...register("password", { required: true })}
            className="bg-blue-100 py-1 px-3 focus:outline outline-blue-100 rounded"
            placeholder="Enter password"
          />
          {errors.password && (
            <p className="text-red-900">Password is required</p>
          )}
        </div>

        <input
          type="submit"
          className="bg-blue-900 text-white px-4 py-1 rounded-sm w-full disabled:opacity-40"
          value="signup"
          disabled={isLoading}
        />
        {isError && (
          <p className="mt-3 text-center text-red-600">{error.message}</p>
        )}
      </form>
    </div>
  );
};

export default Signup;
