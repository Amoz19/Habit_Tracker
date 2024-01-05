import styles from "../style/Loading.module.css";
const Loading = () => {
  return (
    <div className="flex flex-1  justify-center items-center  h-[100dvh] bg-gradient-to-b  dark:from-black from-[#e6e6e6] dark:via-[#000000] via-[#ffffff] dark:to-gray-800 to-[#d4e6f1]">
      <div className={`${styles.progress}`}></div>
    </div>
  );
};

export default Loading;
