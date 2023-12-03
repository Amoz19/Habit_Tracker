import styles from "../style/progress.module.css";
const Loading = () => {
  return (
    <div className="flex flex-1  justify-center items-center">
      <div className={`${styles.progress} flex`}></div>
    </div>
  );
};

export default Loading;
