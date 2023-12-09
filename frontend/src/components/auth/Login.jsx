import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useAuthFunction } from "../../hook/useAuthForm.js";
import Loading from "../Loading.jsx";

const Login = ({ handleOpen }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { isSuccess, isError, error, isLoading, mutate } = useAuthFunction();

  if (isSuccess) {
    return <Navigate to="/home" />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const onHandleSubmit = (data, e) => {
    e.preventDefault();

    mutate({ formData: data, query: "login" });
  };

  return (
    <div className="bg-zinc-400 flex flex-col justify-center items-center flex-1">
      <form
        onSubmit={handleSubmit(onHandleSubmit)}
        className="bg-slate-100 w-fit p-6"
      >
        <div>
          <input
            type="text"
            {...register("username", { required: true })}
            className="bg-blue-100 border border-black"
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
            className="bg-blue-100 border border-black w-fit"
            placeholder="Enter password"
          />
          {errors.password && (
            <p className="text-red-900">Password is required</p>
          )}
        </div>

        <input
          type="submit"
          className="bg-blue-900 text-white px-4 rounded-sm w-full"
          value="login"
        />
      </form>
      {isError && <p>{error.message}</p>}
      <button
        className="bg-blue-500 text-slate-50 px-3 rounded mt-3"
        onClick={handleOpen}
      >
        Create new account
      </button>
    </div>
  );
};
// const EnhancedAuthForm = withApiFunctions(AuthForm);
export default Login;
