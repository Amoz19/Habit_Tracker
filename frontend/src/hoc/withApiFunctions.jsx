import { apiFunctions } from "../services/apis/apifunctions";

const withApiFunctions = (WrappedComponent) => (props) => {
  return <WrappedComponent {...props} apiFunctions={apiFunctions} />;
};

export default withApiFunctions;
