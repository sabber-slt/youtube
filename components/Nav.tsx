import { useRouter } from "next/router";
import React from "react";
import { SiYoutubeshorts, SiGithub } from "react-icons/si";
import { BsArrowLeft } from "react-icons/bs";

const Nav = () => {
  const router = useRouter();
  return (
    <div className="w-full h-12 hstack justify-between px-5 text-rose-500">
      <div className="flex items-center">
        <h3 className="pt-2 font-bold">YTB</h3>
        <a
          href="https://github.com/sabber-slt/youtube"
          target="_blank"
          title="YTB on Github"
        >
          <SiGithub className="text-2xl ms-6 text-gray-400 hover:text-gray-200" />
        </a>
      </div>
      <div className="flex items-center">
        <SiYoutubeshorts className="text-2xl" />
        {router.asPath.includes("video") && (
          <BsArrowLeft className="text-2xl ms-6 text-gray-400" onClick={() => router.back()} />
        )}
      </div>
    </div>
  );
};

export default Nav;
