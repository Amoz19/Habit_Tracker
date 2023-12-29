import { useEffect, useState } from "react";
import {
  SolarMoonStarsBold,
  MaterialSymbolsLightModeOutline,
} from "../../util/icon";

const Theme = () => {
  const [isDark, setIsDark] = useState(undefined);

  useEffect(() => {
    if (isDark) {
      localStorage.setItem("DarkMode", "true");
      document.documentElement.classList.add("dark");
    } else if (isDark === false) {
      localStorage.setItem("DarkMode", "false");
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(localStorage.getItem("DarkMode") === "true");
    }
  }, [isDark]);

  return (
    <div onClick={() => setIsDark(!isDark)} className="ml-2">
      {isDark ? <SolarMoonStarsBold /> : <MaterialSymbolsLightModeOutline />}
    </div>
  );
};

export default Theme;
