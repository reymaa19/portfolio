import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "reymaa19.github.io",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "assets.aceternity.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
    /* config options here */
};

export default nextConfig;
