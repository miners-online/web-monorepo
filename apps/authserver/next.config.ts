import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/account",
        destination: "/account/profile",
        permanent: false,
      },
      {
        source: "/",
        destination: process.env.NEXT_PUBLIC_HOME_URL!,
        permanent: false,
      },
    ];
  }
};

export default nextConfig;
