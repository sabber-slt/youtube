import React, { useEffect, useRef } from "react";
import OpenPlayerJS from "openplayerjs";
import "openplayerjs/dist/openplayer.css";
import { useVideo } from "@/store/useVideo";

const VideoPlay = () => {
  const ref = useRef<HTMLVideoElement>(null);
  const { video, srt } = useVideo();
  const [hydration, setHydration] = React.useState(false);
  const [srtContent, setSrtContent] = React.useState("");
  const [load, setLoad] = React.useState(false);
  useEffect(() => {
    setHydration(true);
    let player: OpenPlayerJS;
    player = new OpenPlayerJS("my-player", {
      width: "100%",
      height: 300,

      mode: "responsive",
      controls: {
        alwaysVisible: true,
        layers: {
          left: ["play", "time", "volume"],
          middle: ["progress"],
          right: ["captions", "settings", "fullscreen"],
        },
      },
    });
    player
      .init()
      .catch((error) => console.error("Player initialization failed", error));
  }, [video, srt]);

  return (
    <div className="w-full h-96 aspect-video">
      {load && (
        <video id="my-player" playsInline className="op-player__media">
          <source src={video} type="video/mp4" />
          <track
            kind="subtitles"
            srcLang="fa"
            src={
              srtContent
                ? `data:text/plain;charset=utf-8,${encodeURIComponent(
                    srtContent
                  )}`
                : ""
            }
            label="Farsi"
          />
        </video>
      )}
    </div>
  );
};

export default VideoPlay;
