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
import { useRouter } from "next/router";
import Layout from "./layout";

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

const Home = () => {
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
  const router = useRouter();

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
    router.push({
      pathname: "/video",
      query: {
        url: data.link,
      },
    });
  };

  return (
    <>
      {loading && <LoadingAnim />}
      <>
        <div className="w-full h-screen vstack justify-center -mt-16 hidden md:flex">
          <span className="text-red-500 text-[92px]">YTB</span>
          <p className="text-medium mb-4">متاسفانه این سرویس تنها در گوشی‌های موبایل در دسترس می‌باشد</p>
        </div>
        <div className="w-full h-screen vstack justify-center -mt-16 lg:hidden">
          <h3 className="text-xl font-[800] w-80 text-center mb-5">
            <span className="text-red-500 text-3xl">Youtube</span>
            <br />
            را با زیر نویس فارسی ببینید
          </h3>
          <p className="text-sm mb-4">لینک ویدیوی مورد نظر خود را وارد کنید</p>
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
      </>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
