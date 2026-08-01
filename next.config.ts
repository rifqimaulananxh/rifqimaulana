import type { NextConfig } from "next";

const devOrigins = process.env.DEV_ORIGIN
  ? [process.env.DEV_ORIGIN, "localhost", "127.0.0.1"]
  : ["localhost", "127.0.0.1"];

const nextConfig: NextConfig = {
  allowedDevOrigins: devOrigins,
};

export default nextConfig;
