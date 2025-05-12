import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["3000-firebase-cba-firebase-1746957717949.cluster-jbb3mjctu5cbgsi6hwq6u4btwe.cloudworkstations.dev"]
};

const updatedNextConfig: NextConfig = {
  ...nextConfig,
  allowedDevOrigins: ["3000-firebase-cba-firebase-1746957717949.cluster-jbb3mjctu5cbgsi6hwq6u4btwe.cloudworkstations.dev", "3001-firebase-cba-firebase-1746957717949.cluster-jbb3mjctu5cbgsi6hwq6u4btwe.cloudworkstations.dev"],
};

export default updatedNextConfig;
