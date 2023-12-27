export const homeVideos = async () => {
  const res = await fetch("/api/videos/home");
  const result = await res.json();
  return result;
};
