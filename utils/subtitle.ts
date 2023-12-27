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

export const cleanAllSubs = async (sub: string, lang: string) => {
  const cc = await fetch(sub);
  const result = await cc.text();
  var sss = subsrt.parse(result);
  if (lang === "fa") {
    var sss1 = sss.map((item: any) => {
      return {
        ...item,
        text: `<bdi dir="rtl">${item.text}</bdi>`,
      };
    });
    var resynced = subsrt.resync(sss1, (a) => [a[0], a[1] + 500]);
    var resynced = subsrt.resync(resynced, { offset: -2300 });
  } else {
    var resynced = subsrt.resync(sss, (a) => [a[0], a[1] + 500]);

    var resynced = subsrt.resync(resynced, { offset: -2300 });
  }

  var options = { format: "vtt" };
  var content = subsrt.build(resynced, options);

  if (lang === "fa") {
    content = cleanSubtitles(content);
  }
  return content;
};
