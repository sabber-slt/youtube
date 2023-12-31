import React from "react";
import Head from "next/head";

const SEO = () => {
  return (
    <Head>
      <title>YTB</title>
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <meta
        content="Enjoy YouTube Videos With Persian Subtitles!"
        name="description"
      />
      <meta property="og:url" content={`https://ytb.sabber.dev/`} />
      <link rel="canonical" href={`https://ytb.sabber.dev/`} />
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="YTB" />
      <meta
        property="og:description"
        content="Enjoy YouTube Videos With Persian Subtitles!"
      />
      <meta property="og:title" content="YTB" />
      <meta
        name="image"
        property="og:image"
        content="https://res.cloudinary.com/dcxu5wipn/image/upload/fl_attachment/w6ehts6dgf7l8kkz0k0v"
      />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@sabber_dev" />
      <meta name="twitter:title" content="YTB" />
      <meta
        name="twitter:description"
        content="Enjoy YouTube Videos With Persian Subtitles!"
      />
      <meta
        name="twitter:image"
        content="https://res.cloudinary.com/dcxu5wipn/image/upload/fl_attachment/w6ehts6dgf7l8kkz0k0v"
      />
    </Head>
  );
};

export default SEO;
