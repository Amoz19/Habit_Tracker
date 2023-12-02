import { apiFunctions } from "../services/apis/habits";
const withApiFunctions = (WrappedComponent) => (props) => {
  return <WrappedComponent {...props} apiFunctions={apiFunctions} />;
};

export default withApiFunctions;
