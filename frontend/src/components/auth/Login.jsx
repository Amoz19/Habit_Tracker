import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthFunction } from "../../hook/useAuthForm.js";
import { useUser } from "../../context/AuthContext.jsx";
// import { QueryClient } from "react-query";

const Login = ({ handleOpen }) => {
  // const queryClient = QueryClient();
  const { login } = useUser();
  const { isError, error, isLoading, mutate } = useAuthFunction();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onHandleSubmit = (data, e) => {
    e.preventDefault();

    mutate(
      { formData: data, query: "login" },
      {
        onSuccess: (data) => {
          login(data.user);
          navigate("/habits");
        },
      }
    );
  };

  return (
    <div className="bg-zinc-900 flex flex-col justify-center items-center flex-1">
      <form
        onSubmit={handleSubmit(onHandleSubmit)}
        className="bg-slate-100 w-fit p-6 rounded"
      >
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
          className="bg-blue-900 text-white px-4 py-1 rounded-sm w-full mb-6 disabled:opacity-40"
          value="login"
          disabled={isLoading}
        />
        {isError && (
          <p className="mb-3 text-center text-red-600">{error.message}</p>
        )}
        <button
          className="bg-green-500 w-full rounded text-white "
          onClick={handleOpen}
        >
          Create new accout
        </button>
      </form>
    </div>
  );
};

export default Login;
