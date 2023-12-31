// Importing necessary modules and types
import type { NextApiRequest, NextApiResponse } from "next";
import { getCaptions, getVideo } from "@/utils/youtube";
import { cleanAllSubs } from "@/utils/subtitle";

// Constants
const YOUTUBE_REGEX = /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/.{1,100}$/;

// API handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { link } = req.body;
  if (!link) {
    return res.status(400).json({ error: "Link is required" });
  }

  if (!YOUTUBE_REGEX.test(link)) {
    return res.status(400).json({ error: "Invalid YouTube link" });
  }

  try {
    const video = await getVideo(link);
    const captions = await getCaptions(link);

    if (!video || !captions) {
      return res.status(404).json({ error: "Video or captions not found" });
    }

    const cleanedSubtitles = {
      en: await cleanAllSubs(
        (captions as { enSubtitle: string }).enSubtitle,
        "en"
      ),
      fa: await cleanAllSubs((captions as { subtitle: string }).subtitle, "fa"),
    };

    res.status(200).json({
      data: {
        url: video,
        srt: cleanedSubtitles.fa,
        enSrt: cleanedSubtitles.en,
        description: (captions as { description: string }).description,
        title: (captions as { title: string }).title,
        downloadFa: (captions as { subtitle: string }).subtitle,
        downloadEn: (captions as { enSubtitle: string }).enSubtitle,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the link" });
  }
}
