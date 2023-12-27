import styles from "../style/Loading.module.css";
const Loading = () => {
  return (
    <div className="flex flex-1  justify-center items-center  h-[100dvh] bg-gradient-to-b from-[#e6e6e6] via-[#ffffff] to-[#d4e6f1]">
      <div className={`${styles.progress} flex`}></div>
    </div>
  );
};

export default Loading;
