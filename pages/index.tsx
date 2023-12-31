import React, { useEffect, useState } from "react";
import OpenPlayerJS from "openplayerjs";
import { useForm, SubmitHandler } from "react-hook-form";
import "openplayerjs/dist/openplayer.css";

import Form from "@/components/Form";
import LoadingAnim from "@/components/LoadingAnim";
import Nav from "@/components/Nav";
import SEO from "@/components/SEO";
import { PiSubtitlesBold } from "react-icons/pi";
import Link from "next/link";

import { useVideo } from "@/store/useVideo";

interface IFormInput {
  link: string;
}

interface IVideoData {
  url: string;
  srt: string;
  enSrt: string;
  title: string;
  description: string;
  downloadFa: string;
  downloadEn: string;
}

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const [loading, setLoading] = useState<boolean>(false);
  const { setVideo, setSrt, video, srt, enSrt, setEnSrt } = useVideo();
  const [playerObj, setPlayer] = useState<OpenPlayerJS | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [downloadLink, setDownloadLink] = useState<string>("");
  const [downloadLinkEn, setDownloadLinkEn] = useState<string>("");

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

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    try {
      const res = await fetch("/api/video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link: data.link }),
      });

      const result = await res.json();
      if (result.error) {
        alert(result.error);
        setLoading(false);
        return;
      }

      const srtContent = `data:text/plain;charset=utf-8,${encodeURIComponent(
        result.data.downloadFa
      )}`;
      const srtContentEn = `data:text/plain;charset=utf-8,${encodeURIComponent(
        result.data.downloadEn
      )}`;

      setDownloadLinkEn(srtContentEn);
      setDownloadLink(srtContent);
      setVideo(result.data.url);
      setSrt(result.data.srt);
      setEnSrt(result.data.enSrt);
      setTitle(result.data.title);
      setDescription(result.data.description);
    } catch (error) {
      console.error("Error submitting form: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO />
      <Nav />
      {loading && <LoadingAnim />}
      <>
        {video !== null ? (
          <div className="w-full">
            <div
              style={{
                direction: "ltr",
              }}
              className="w-full aspect-video"
            >
              <video id="my-player" playsInline className="op-player__media">
                <source src={video} />
                <track
                  kind="subtitles"
                  default
                  srcLang="fa"
                  src={`data:text/plain;charset=utf-8,${encodeURIComponent(
                    srt
                  )}`}
                  label="Farsi"
                />
                <track
                  kind="subtitles"
                  srcLang="en"
                  src={`data:text/plain;charset=utf-8,${encodeURIComponent(
                    enSrt
                  )}`}
                  label="English"
                />
              </video>
            </div>
            <div
              style={{
                direction: "ltr",
              }}
              className="w-full flex flex-col items vstack justify-center px-5"
            >
              <div className="hstack mb-5 justify-center space-x-5">
                <Link
                  href={`${downloadLink}`}
                  className="vstack"
                  download={"FaSub.vtt"}
                >
                  <PiSubtitlesBold className="text-red-500 text-3xl" />
                  <p className="text-center text-xs text-zinc-300">Fa</p>
                </Link>
                <Link
                  href={`${downloadLinkEn}`}
                  className="vstack"
                  download={"EnSub.vtt"}
                >
                  <PiSubtitlesBold className="text-red-500 text-3xl" />
                  <p className="text-center text-xs text-zinc-300">En</p>
                </Link>
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
              register={
                register("link", {
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
                }) as any
              }
              handleSubmit={handleSubmit(onSubmit) as any}
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
