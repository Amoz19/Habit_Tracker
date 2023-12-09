import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useAuthFunction } from "../../hook/useAuthForm.js";
import Loading from "../Loading.jsx";

const Signup = ({ handleClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const { isSuccess, isError, isLoading, mutate } = useAuthFunction();

  if (isSuccess) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const onHandleSubmit = (data, e) => {
    e.preventDefault();

    mutate({ formData: data, query: "signup" });
  };

  return (
    <div className="bg-red-100 flex flex-col justify-center items-center flex-1">
      <form
        onSubmit={handleSubmit(onHandleSubmit)}
        className="bg-slate-100 w-fit p-6"
      >
        <div onClick={handleClose}>
          <p>X</p>
        </div>
        <div>
          <input
            type="text"
            {...register("username", { required: true })}
            className="bg-blue-100 border border-black px-6"
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
            className="bg-blue-100 border border-black w-fit px-6"
            placeholder="Enter password"
          />
          {errors.password && (
            <p className="text-red-900">Password is required</p>
          )}
        </div>

        <input
          type="submit"
          className="bg-blue-900 text-white px-4 rounded-sm w-full"
          value="signup"
        />
      </form>
      {isError && <p>Username already taken</p>}
    </div>
  );
};

export default Signup;
