/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    basePath: "/github-pages",
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
