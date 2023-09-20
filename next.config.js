/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',

    images: {
        unoptimized: true,
        domains: [
            "flagcdn.com"
        ]
    }
}

module.exports = nextConfig


