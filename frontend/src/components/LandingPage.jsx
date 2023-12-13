import React from "react";
import dotGrid from "../assets/dot.png";
import logo from "../assets/logo.gif";
import track from "../assets/track.png";
import { IonCaretForward } from "../assets/icons/otherTools";

const LandingPage = () => {
  return (
    <>
      <div className="fixed inset-0 background w-full h-full "></div>
      <div className="background-1 fixed inset-0 w-full h-full "></div>
      <div>
        <img src={dotGrid} className="w-56 h-56 fixed top-6 left-6 " />
        <img src={dotGrid} className="w-56 h-56 fixed left-[30%]" />
        <img src={dotGrid} className="w-56 h-56 fixed bottom-32 left-30" />
        <img src={dotGrid} className="w-56 h-56 fixed top-22 right-64" />
      </div>
      <div className="flex justify-center h-screen items-center relative">
        <div className="flex flex-col items-center">
          <h1 className="title text-3xl md:text-5xl text-[#0A0857] ">
            Habit Tracker
          </h1>
          <p className="my-4">Persistance with your habits.</p>
          <div className="bg-[#0A0857] text-slate-100 rounded px-3 py-1 flex justify-between items-center text-l">
            <button className="mr-2">Get Started</button>
            <IonCaretForward />
          </div>
        </div>
        <div>
          <img src={logo} className="fixed left-[20%] top-[30%] w-32" />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
