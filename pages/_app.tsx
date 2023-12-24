import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { Vazirmatn } from "next/font/google";

const vazir = Vazirmatn({
  weight: ["500", "600", "700", "800"],
  style: ["normal"],
  subsets: ["arabic"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
      <main className={`text-foreground bg-background ${vazir.className}`}>
        <Component {...pageProps} />
      </main>
    </NextUIProvider>
  );
}
