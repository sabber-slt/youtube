// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import HttpsProxyAgent from "https-proxy-agent";
import { getCaptions, getVideo } from "@/utils/youtube";
import subsrt from "subsrt-ts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { link } = req.body;

    if (!link) {
      return res.status(400).json({ error: "Link is required" });
    }

    const youtubeRegex =
      /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/.{1,100}$/;
    if (!link || !youtubeRegex.test(link)) {
      return res.status(400).json({ error: "Invalid or missing YouTube link" });
    }

    try {
      const video = await getVideo(link);
      const captions = (await getCaptions(link)) as any;

      if (!video || !captions) {
        return res.status(404).json({ error: "Video or captions not found" });
      }
      const ddd = await fetch(captions.subtitle);
      const url = await ddd.text();
      var capt = subsrt.parse(url);

      const newCap = subsrt.build(capt, {
        format: "srt",
        eol: "\r\n",
        verbose: true,
      });
      res.status(200).json({
        data: {
          url: video ? video : null,
          srt: captions ? url : null,
          description: captions ? captions.description : null,
          title: captions ? captions.title : null,
        },
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({ error: "لینک وارد شده معتبر نمی‌باشد" });
    }
  }
}
