import subsrt from "subsrt-ts";

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

export const cleanAllSubs = async (sub: string) => {
  const cc = await fetch(sub);
  const result = await cc.text();
  var sss = subsrt.parse(result);
  var resynced = subsrt.resync(sss, { offset: -2200 });
  var options = { format: "vtt" };
  var content = subsrt.build(resynced, options);

  content = cleanSubtitles(content);

  return content;
};
