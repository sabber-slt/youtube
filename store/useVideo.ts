import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type CartStore = {
  srt: any | null;
  enSrt: any | null;
  setSrt: (srt: any) => void;
  setEnSrt: (srt: any) => void;
  video: any | null;
  setVideo: (video: any) => void;
};

// num: 0,
// complete: false,
// add: (num: number) => set(() => ({ num: num })),
// setComplete: (complete: boolean) => set(() => ({ complete: complete })),

export const useVideo = create<CartStore>()((set) => ({
  srt: null,
  enSrt: null,
  video: null,
  setSrt: (srt: any) => set(() => ({ srt: srt })),
  setEnSrt: (enSrt: any) => set(() => ({ enSrt: enSrt })),
  setVideo: (video: any) => set(() => ({ video: video })),
}));
