import Form from "@/components/Form";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import LoadingAnim from "@/components/LoadingAnim";
import { useVideo } from "@/store/useVideo";
import OpenPlayerJS from "openplayerjs";
import "openplayerjs/dist/openplayer.css";
import Nav from "@/components/Nav";

export default function Home() {
  const { register, handleSubmit } = useForm();
  const [Loading, setLoading] = useState(false);
  const { setVideo, setSrt, video, srt } = useVideo();
  const [playerObj, setPlayer] = useState<any>();

  useEffect(() => {
    const player = new OpenPlayerJS("my-player", {
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
    player.init();
    setPlayer(player);
  }, [srt, video]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    const res = await fetch("/api/hello", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        link: data.link,
      }),
    });

    const result = await res.json();
    if (result.error) {
      alert(result.error);
      setLoading(false);
      return;
    }
    console.log(result);
    // const srtContent = `data:text/plain;charset=utf-8,${encodeURIComponent(
    //   result?.data?.srt
    // )}`;
    setVideo(result?.data?.url);
    setSrt(result?.data?.srt);
    setLoading(false);
  };
  return (
    <>
      <Nav />
      {Loading && <LoadingAnim />}
      <>
        {video !== null ? (
          <div className="w-full h-screen center -mt-16">
            <div
              style={{
                direction: "ltr",
              }}
              className="w-full h-96 aspect-video"
            >
              <video id="my-player" playsInline className="op-player__media">
                <source src={video} />
                <track kind="subtitles" srcLang="fa" src={srt} label="Farsi" />
              </video>
            </div>
          </div>
        ) : (
          <div className="w-full h-screen vstack justify-center -mt-16">
            <h3 className="text-xl font-[800] w-80 text-center mb-20">
              <span className="text-red-500 text-3xl">Youtube</span>
              <br />
              را با زیر نویس فارسی ببینید
            </h3>
            <p className="text-sm mb-4">
              لینک ویدیوی مورد نظر خود را وارد کنید
            </p>
            <Form
              register={register("link")}
              handleSubmit={handleSubmit(onSubmit)}
            />
          </div>
        )}
      </>
    </>
  );
}
