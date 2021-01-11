import * as React from 'react';
import Head from 'next/head';

const CustomHead = () => {
  return (
    <Head>
        <title>Alversary</title>
        <meta name="description" content="These albums were released on this date!!"></meta>
 
        <meta property="og:url" content="https://alversary.vercel.app/" />
        <meta property="og:type" content="website" />
        
        <meta property="og:title" content="Alversary" />
        
        <meta property="og:description" content="These albums were released on this date!!" />
        
        <meta property="og:site_name" content="Alversary" />
        
        <meta property="og:image" content="https://alversary.s3-ap-northeast-1.amazonaws.com/ogp-alversary.png" />
    </Head>
  );
};

export default CustomHead;
