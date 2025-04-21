const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    domains:[
      'isomorphic-furyroad.s3.amazonaws.com',
      's3.amazonaws.com'
    ]
  },
  reactStrictMode:false
};

module.exports = withBundleAnalyzer(nextConfig);
