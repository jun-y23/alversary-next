import Head from 'next/head';
import * as React from 'react';

export const CustomHead = () => {
  return (
    <Head>
      <title>Alversary</title>
      <meta
        name='description'
        content='These albums were released on this date!!'></meta>

      <meta property='og:url' content='https://alversary.vercel.app/' />
      <meta property='og:type' content='website' />

      <meta
        property='og:title'
        content='These albums were released on this date!!'
      />

      <meta
        property='og:description'
        content='This is the site to introduce the albums released on this date.'
      />

      <meta property='og:site_name' content='Alversary' />

      <meta
        property='og:image'
        content='https://alversary.vercel.app/images/ogp-alversary.png'
      />
      <meta name='twitter:card' content='summary' />
    </Head>
  );
};
