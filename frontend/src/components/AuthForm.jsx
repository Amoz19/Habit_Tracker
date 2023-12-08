import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import withApiFunctions from "../hoc/withApiFunctions";

const AuthForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    setSearchParams({ mode: "register" });
  }, []);
    
    const isLoginMode = searchParams.get("mode") === "login"

    const login = async () => {
        
    }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ username, password }) => {};
  return (
      <form onSubmit={handleSubmit()}>
          <div>
               <input
              type="text"
                  {...register("username"), { required: true }} />
                {errors.username && <p className="bg-red-900">Username is required</p>}
          </div>
         
          <input
              type="password"
              {...register("password"), { required: true }} />
            {errors.password && <p className="bg-red-900">Password is required</p>}
          <input
              type="submit"
          />
    </form>
  );
};

const enhancedAuthForm = withApiFunctions(AuthForm)

export default enhancedAuthForm;
