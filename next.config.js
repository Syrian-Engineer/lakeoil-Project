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
  reactStrictMode:false,
};

module.exports = (nextConfig);




// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: [
//       'isomorphic-furyroad.s3.amazonaws.com',
//       's3.amazonaws.com'
//     ]
//   },
//   reactStrictMode: false,

//   // ✅ Add i18n config directly for next-intl
//   i18n: {
//     locales: ['en', 'fr'], // Add more locales as needed
//     defaultLocale: 'en'
//   },

//   // Optional but recommended if using serverActions
//   experimental: {
//     serverActions: true
//   }
// };

// module.exports = withBundleAnalyzer(nextConfig);
withBundleAnalyzer