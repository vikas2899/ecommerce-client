/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: [
      "d2bps9p1kiy4ka.cloudfront.net",
      "i.ytimg.com",
      "api.penpencil.xyz",
      "penpencil.pc.cdn.bitgravity.com",
      "penpencil-static-content.s3.ap-south-1.amazonaws.com",
      "penpencil-drive.sgp1.cdn.digitaloceanspaces.com",
      "www.pw.live",
      "pw2.pc.cdn.bitgravity.com",
      "localhost",
    ],
  },
};

module.exports = nextConfig;
