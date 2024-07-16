/** @type {import('next').NextConfig} */
// next.config.js
nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://cronitor.io/api/:path*', // Proxy to external API
            },
        ];
    },
};


module.exports = nextConfig
