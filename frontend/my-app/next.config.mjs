import dotenv from 'dotenv';
/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        SERVER_URI: process.env.SERVER_URI,
    }
};

export default nextConfig;
