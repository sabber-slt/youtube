import React, { ReactElement, useEffect, useState } from "react";
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
import Layout from "../layout";
import { useRouter } from "next/router";

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

const Video = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const [loading, setLoading] = useState<boolean>(true);
  const { setVideo, setSrt, video, srt, enSrt, setEnSrt } = useVideo();
  const [playerObj, setPlayer] = useState<OpenPlayerJS | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [downloadLink, setDownloadLink] = useState<string>("");
  const [downloadLinkEn, setDownloadLinkEn] = useState<string>("");

  const router = useRouter();

  const initPlayer = () => {
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
  }

  const fetchData = async (link: string) => {
    
    try {
      const res = await fetch("/api/video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link: link }),
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

      initPlayer();
    } catch (error) {
      console.error("Error submitting form: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!router.query?.url) {
      router.replace("/");
      return;
    }
    setLoading(true);
    fetchData(router.query.url as string);
  }, []);

  return (
    <>
      {loading && <LoadingAnim />}
      <>
        {!loading && 
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
        }
      </>
    </>
  );
};

Video.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Video;
