import subsrt from "subsrt-ts";
import FileSaver from "file-saver";

export const getSubtitles = async (sub: string) => {
  const res = await fetch(sub);
  const url = await res.text();

  var captions = subsrt.parse(url);

  const newCap = subsrt.build(captions, {
    format: "srt",
    eol: "\n",
  });

  return newCap;
};
