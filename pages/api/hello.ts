// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import ytdl from "ytdl-core";
import HttpsProxyAgent from "https-proxy-agent";
import { getCaptions, getVideo } from "@/utils/youtube";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const url = "https://www.youtube.com/watch?v=mFIsZHSAzJ0";
    const video = await getVideo(url);
    const captions = await getCaptions(url);

    res.status(200).json({
      data: {
        url: video,
        srt: captions,
      },
    });
  }
}
