import { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'


const nextConfig:NextConfig = {
    reactStrictMode: false,
    basePath: '/nextjs-demo',
    assetPrefix: isProd ? 'https://www.paritydeals.com/nextjs-demo/' : undefined,

};
export default nextConfig;