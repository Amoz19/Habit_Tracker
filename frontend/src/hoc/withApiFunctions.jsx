import { apiFunctions } from "../services/apis/apifunctions";
const withApiFunctions = (WrappedComponent) => (props) => {
  // const WithApiFunctions = (props) => {
  return <WrappedComponent {...props} apiFunctions={apiFunctions} />;
  // };

  // return WithApiFunctions;
};

export default withApiFunctions;
