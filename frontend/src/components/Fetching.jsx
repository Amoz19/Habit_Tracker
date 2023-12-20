import styles from "./Fetching.module.css";

const Fetching = () => {
  return (
    <div className="flex flex-1  justify-center items-center bg-gradient-to-b from-indigo-200 to-indigo-300 h-[100dvh]">
      <div className={styles.progress}></div>
    </div>
  );
};

export default Fetching;
