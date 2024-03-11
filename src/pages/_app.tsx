import { belleza } from "@/styles/fonts";
import "@/styles/globals.css";
import classNames from "classnames";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Buzzplans</title>
        <meta name="description" content="A good plan makes a good trip" />
        <link rel="icon" href="https://api.iconify.design/carbon/plan.svg" />
      </Head>
      <main className="flex h-full min-h-screen w-screen max-w-full justify-center bg-neutral-300">
        <div className="h-screen w-screen max-w-5xl overflow-y-auto bg-neutral-100">
          <div
            className={classNames(
              "flex w-full flex-col items-center justify-center gap-4 px-6 pt-8",
              belleza.className,
            )}
          >
            <Component {...pageProps} />
          </div>
        </div>
      </main>
    </>
  );
}
