const withApiFunctions = (Component) => (props) => {
  return <Component {...props} apiFunctions={apiFunctions} />;
};

export default withApiFunctions;
