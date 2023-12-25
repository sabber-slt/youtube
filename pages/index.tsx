import Form from "@/components/Form";
import { set, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import LoadingAnim from "@/components/LoadingAnim";
import { useVideo } from "@/store/useVideo";
import OpenPlayerJS from "openplayerjs";
import "openplayerjs/dist/openplayer.css";
import Nav from "@/components/Nav";
import { FaCloudDownloadAlt } from "react-icons/fa";
import Link from "next/link";
import SEO from "@/components/SEO";
import { getSubtitles } from "@/utils/subtitle";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();
  const [Loading, setLoading] = useState(false);
  const { setVideo, setSrt, video, srt } = useVideo();
  const [playerObj, setPlayer] = useState<any>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [downloadLink, setDownloadLink] = useState<any>();
  const [srt1, setSrt1] = useState<any>();

  useEffect(() => {
    const player = new OpenPlayerJS("my-player", {
      width: "100%",
      height: 300,
      mode: "fit",
      controls: {
        alwaysVisible: false,
        layers: {
          left: ["play", "time", "volume"],
          middle: ["progress"],
          right: ["captions", "fullscreen"],
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
    const srtContent = `data:text/plain;charset=utf-8,${encodeURIComponent(
      result?.data?.srt
    )}`;

    setDownloadLink(srtContent);
    setVideo(result?.data?.url);

    const txtContent = `data:text/plain;charset=utf-8,${encodeURIComponent(
      result?.data?.srt
    )}`;
    setSrt1(txtContent);
    setSrt(txtContent);

    setTitle(result?.data?.title);
    setDescription(result?.data?.description);
    setLoading(false);
  };
  return (
    <>
      <SEO />
      <Nav />
      {Loading && <LoadingAnim />}
      <>
        {video !== null ? (
          <div className="w-full">
            <div
              style={{
                direction: "ltr",
              }}
              className="w-full aspect-video whitespace-pre-line text-sm  font-semibold break-words hyphens-auto "
            >
              <video id="my-player" playsInline className="op-player__media ">
                <source src={video} />

                <track
                  kind="subtitles"
                  srcLang="fa"
                  default
                  src={srt}
                  label="Farsi"
                />
              </video>
            </div>
            <div
              style={{
                direction: "ltr",
              }}
              className="w-full flex flex-col items vstack justify-center px-5"
            >
              <div className="hstack mb-5 justify-center">
                {/* <Link href={srt} className="vstack" download={downloadLink}>
                  <FaCloudDownloadAlt className="text-red-500 text-3xl" />
                  <p className="text-center text-xs text-zinc-300">زیرنویس</p>
                </Link> */}
              </div>
              <h3 className="text-lg text-red-400 w-[90%]">{title}</h3>
              <p className="text-sm text-zinc-500 whitespace-pre-line w-[90%] mt-3 mb-10">
                {description}
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full h-screen vstack justify-center -mt-16 lg:hidden">
            <h3 className="text-xl font-[800] w-80 text-center mb-5">
              <span className="text-red-500 text-3xl">Youtube</span>
              <br />
              را با زیر نویس فارسی ببینید
            </h3>
            <p className="text-sm mb-4">
              لینک ویدیوی مورد نظر خود را وارد کنید
            </p>
            <Form
              register={register("link", {
                required: true,
                pattern: {
                  value:
                    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/,
                  message: "لینک وارد شده معتبر نیست",
                },
                max: {
                  value: 200,
                  message: "لینک وارد شده معتبر نیست",
                },
              })}
              handleSubmit={handleSubmit(onSubmit)}
            />
            {errors?.link && (
              <p className="text-xs text-red-500 mt-2">
                {errors?.link.message as any}
              </p>
            )}
          </div>
        )}
      </>
      <div className="fixed bottom-5 text-xs center w-full">
        <p>
          Developed by{" "}
          <span className="text-red-500 text-[16px] font-semibold">
            Sabber Soltani
          </span>{" "}
        </p>
      </div>
    </>
  );
}
