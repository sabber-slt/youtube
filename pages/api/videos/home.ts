// Import necessary modules
import type { NextApiRequest, NextApiResponse } from "next";
import youtubedl from "youtube-dl-exec";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const xx = await youtubedl(
        "https://www.youtube.com/watch?v=es-9MgxB-uc",
        {
          dumpSingleJson: true,
          noCheckCertificates: true,
          noWarnings: true,
          preferFreeFormats: true,
          addHeader: ["referer:youtube.com", "user-agent:googlebot"],
        }
      );
      console.log(xx);
      res.status(200).json(xx);
    } else {
      // Handle non-GET requests
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    // Handle any other errors
    console.error("Error occurred in API route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
