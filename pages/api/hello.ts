// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import HttpsProxyAgent from "https-proxy-agent";
import { getCaptions, getVideo } from "@/utils/youtube";
import subsrt from "subsrt-ts";
import { cleanAllSubs } from "@/utils/subtitle";

function cleanSubtitles(srtContent: any) {
  const lines = srtContent.split("\n");
  let previousText = "";
  let cleanedLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Check if line is a subtitle text
    if (!line.match(/^\d+$/) && !line.match(/-->/)) {
      if (line.trim() !== previousText.trim()) {
        cleanedLines.push(line);
        previousText = line;
      }
    } else {
      cleanedLines.push(line); // Add non-subtitle text as is
    }
  }

  return cleanedLines.join("\n");
}

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

      if (!video) {
        return res.status(404).json({ error: "Video or captions not found" });
      }
      const cc = await cleanAllSubs(captions.enSubtitle);
      const fa = await cleanAllSubs(captions.subtitle);

      res.status(200).json({
        data: {
          url: video ? video : null,
          srt: captions ? fa : null,
          enSrt: captions ? cc : null,
          description: captions ? captions.description : null,
          title: captions ? captions.title : null,
          downloadFa: captions ? captions.subtitle : null,
          downloadEn: captions ? captions.enSubtitle : null,
        },
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({ error: "لینک وارد شده معتبر نمی‌باشد" });
    }
  }
}
