import styles from "./Fetching.module.css";

const Fetching = () => {
  return (
    <div className="flex flex-1  justify-center items-center bg-[#2c3e50]">
      <div className={styles.progress}></div>
    </div>
  );
};

export default Fetching;
