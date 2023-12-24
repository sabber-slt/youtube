// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import HttpsProxyAgent from "https-proxy-agent";
import { getCaptions, getVideo } from "@/utils/youtube";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { link } = req.body;
    console.log(link);
    const video = await getVideo(link);
    const captions = (await getCaptions(link)) as any;

    res.status(200).json({
      data: {
        url: video ? video : null,
        srt: captions ? captions.subtitle : null,
        description: captions ? captions.description : null,
        title: captions ? captions.title : null,
      },
    });
  }
}
