import React from "react";
import Logo from "../images/eg-logo.svg";

function Header() {
  return (
    <div className="w-screen top-0 z-[1]">
      <p className="w-full h-20 p-3 bg-[#232937] text-white text-xl text-center flex justify-center items-center ">
       <Logo />
      </p>
    </div>
  );
}

export default Header;
