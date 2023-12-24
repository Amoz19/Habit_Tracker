import styles from "../style/Loading.module.css";
const Loading = () => {
  return (
    <div className="flex flex-1  justify-center items-center bg-gradient-to-b bg-[#2c3e50] h-[100dvh]">
      <div className={`${styles.progress} flex`}></div>
    </div>
  );
};

export default Loading;
