import ytdl from "ytdl-core";
import youtubedl from "youtube-dl-exec";

export const getVideo = async (url: string) => {
  try {
    const data = await ytdl
      .getInfo(url)
      .then((info) => {
        let format = ytdl.chooseFormat(info.formats, {
          quality: "18" || "140",
        });
        return format.url;
      })
      .catch((error) => {
        console.error("Error getting video info:", error);
        return null;
      });

    return data;
  } catch (error) {
    console.error("Error getting video info:", error);
  }
};

export const getCaptions = async (url: string) => {
  try {
    const res = youtubedl(url, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: ["referer:youtube.com", "user-agent:googlebot"],
    }).then(async (output) => {
      // @ts-ignore
      const subtitle = output.automatic_captions.fa[5].url;
      const title = output.fulltitle;
      const description = output.description;

      return {
        subtitle,
        title,
        description,
      };
    });
    return res;
  } catch (error) {
    return error;
  }
};
