import { habitApiFunctions } from "../services/apis/habits";
const withApiFunctions = (WrappedComponent) => (props) => {
  // const WithApiFunctions = (props) => {
  return <WrappedComponent {...props} habitApiFunctions={habitApiFunctions} />;
  // };

  // return WithApiFunctions;
};

export default withApiFunctions;
