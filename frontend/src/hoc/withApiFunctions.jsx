import { habitApiFunctions } from "../services/apis/habits";
const withApiFunctions = (WrappedComponent) => (props) => {
  return <WrappedComponent {...props} habitApiFunctions={habitApiFunctions} />;
};

export default withApiFunctions;
