/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        BACKEND_URL: process.env.BACKEND_URL,
        TMDB_API: process.env.TMDB_API,
        ADMIN_TOKEN: process.env.ADMIN_TOKEN,
        TMDB_READ_ACCESS_KEY: process.env.TMDB_READ_ACCESS_KEY,
    },
    async redirects() {
        return [
            // {
            //     source: "/home",
            //     destination: "/",
            //     permanent: true,
            // },
        ];
    },
};

module.exports = nextConfig;
