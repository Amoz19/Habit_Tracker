import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthFunction } from "../../hook/useAuthForm.js";
import { useUser } from "../../context/AuthContext.jsx";
import styles from "./Auth.module.css";

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
    <div className="bg-gradient-to-b from-indigo-200 to-indigo-300 flex flex-col justify-center h-screen items-center">
      <form
        onSubmit={handleSubmit(onHandleSubmit)}
        className="bg-slate-100 w-[90%] md:w-3/6 p-6 rounded"
      >
        <h1 className="text-2xl font-black mb-4 text-blue-900">Login</h1>
        <div className="flex flex-col">
          <label htmlFor="username" className="mb-2 text-slate-700">
            Username
          </label>
          <input
            type="text"
            {...register("username", { required: true })}
            id="username"
            className={`border border-gray-300 py-1 px-3 focus:outline outline-blue-100 rounded text-slate-700 ${styles.placeholder}`}
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
            className={`border border-gray-300 py-1 px-3 focus:outline outline-blue-100 rounded text-slate-700 ${styles.placeholder}`}
            placeholder="Enter password"
          />
          {errors.password && (
            <p className="text-red-600 mt-2 px-1">Password is required</p>
          )}
        </div>

        <input
          type="submit"
          className="bg-blue-900 text-white px-4 py-1 rounded mb-6 disabled:opacity-40 text-sm mr-2"
          value="Login"
          disabled={isLoading}
        />
        {isError && (
          <p className="mb-3 text-center text-red-600">{error.message}</p>
        )}
        <button
          className="px-3 py-1 border border-gray-300 rounded text-sm text-blue-800"
          onClick={handleOpen}
        >
          Create new accout
        </button>
      </form>
    </div>
  );
};

export default Login;
