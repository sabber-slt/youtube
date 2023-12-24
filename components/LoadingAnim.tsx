import React from "react";
import Lottie from "react-lottie-player";
import lottieJson from "../public/loading.json";

type Props = {};

const LoadingAnim = (props: Props) => {
  return (
    <div className="w-full h-screen center">
      <div className="w-full fixed top-0 h-screen bg-background z-50 center">
        <div className="relative w-20 h-20 center lg:w-96 lg:h-64">
          <Lottie
            loop
            animationData={lottieJson}
            play
            style={{
              position: "absolute",
              zIndex: 0,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingAnim;
