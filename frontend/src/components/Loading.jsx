import styles from "../style/progress.module.css";
const Loading = () => {
  return (
    <div className="flex flex-1  justify-center items-center bg-gradient-to-b from-indigo-200 to-indigo-300 h-screen">
      <div className={`${styles.progress} flex`}></div>
    </div>
  );
};

export default Loading;
