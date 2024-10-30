import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "../../style/Auth.module.css";
import { useLoginMutation } from "../../features/auth/authApi.js";
import { useAppDispatch, useAppSelector } from "../../app/hook.js";
import { tokenReceived } from "../../features/auth/authSlice.js";

const Login = () => {
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const authState = useAppSelector((state) => state.auth.token);
  console.log(authState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onHandleSubmit = async (data, e) => {
    e.preventDefault();
    try {
      const result = await login(data);
      const { username, userId, token } = result.data;
      localStorage.setItem("user", JSON.stringify({ username, userId, token }));
      dispatch(tokenReceived({ username, userId, token }));
      navigate("/habits");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gradient-to-b from-indigo-200 to-indigo-300 flex flex-col justify-center h-[100dvh] items-center">
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
          disabled={isLoading}
          value={isLoading ? "Loging in" : "Login"}
        />

        {isError && (
          <p className="mb-3 text-center text-red-600">{error.data}</p>
        )}
        <button
          className="px-3 py-1 border border-gray-300 rounded text-sm text-blue-800"
          onClick={() => navigate("/signup")}
        >
          Create new accout
        </button>
      </form>
    </div>
  );
};

export default Login;
