/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produces a minimal, self-contained server build (only the files needed
  // to run `node server.js`) — this is what the production Dockerfile copies.
  output: 'standalone',
};

export default nextConfig;
