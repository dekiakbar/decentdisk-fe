/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    dangerouslyAllowSVG: true,
    remotePatterns:[
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      }
    ]
  }
}

module.exports = nextConfig