import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
    domains: [
      // Common news image sources
      'zephyrnet.com',
      'techcrunch.com',
      'cdn.vox-cdn.com',
      'image.cnbcfm.com',
      'assets.techrepublic.com',
      'www.zdnet.com',
      'images.unsplash.com',
      'media.wired.com',
      'spectrum.ieee.org',
      'venturebeat.com',
      'www.theverge.com',
      'gizmodo.com',
      'engadget.com',
      'arstechnica.com',
      'cdn.mos.cms.futurecdn.net',
      'www.bleepingcomputer.com',
      'securityboulevard.com',
      'cybersecuritynews.com',
      // NewsData.io common image sources
      'newsdata.io',
      'static.newsdata.io',
      // Generic image hosting
      'cdn.pixabay.com',
      'images.pexels.com',
      'via.placeholder.com'
    ],
  },
};

export default nextConfig;
