import styles from "../style/Spinner.module.css";
const LoadingSpinner = () => {
  return (
    <button className=" flex items-center">
      <div className={styles.spinner}></div>
      <p className="text-l ml-2">Fetching user data...</p>
    </button>
  );
};

export default LoadingSpinner;
