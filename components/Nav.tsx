import React from "react";
import { SiYoutubeshorts } from "react-icons/si";

const Nav = () => {
  return (
    <div className="w-full h-12 hstack justify-between px-5 text-rose-500">
      <h3 className="pt-2">YTB</h3>
      <SiYoutubeshorts className="text-2xl" />
    </div>
  );
};

export default Nav;
