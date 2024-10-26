import React from "react";
import logo from "../../Images/ZMCLogo-.png";
import ButtonDis from "../../Components/Button/ButtonDis";
import { useSelector } from "react-redux";

const LoaderScreen = ({ onClick }) => {
  const sendToParent = () => {
    onClick(true);
  };
  return (
    <div className="bg-gray-500 text-white h-full">
      <div className="h-screen flex flex-col justify-center items-center">
        <img src={logo} alt="" />
        <ButtonDis title={"Login"} onClick={sendToParent} />
      </div>
    </div>
  );
};

export default LoaderScreen;
