/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // This option is recommended to reduce memory usage during builds.
    outputFileTracingExcludes: {
      "**/*": [
        "node_modules/@swc/core-linux-x64-gnu",
        "node_modules/@swc/core-linux-x64-musl",
        "node_modules/@esbuild/linux-x64",
      ],
    },
  },
};

module.exports = nextConfig;
