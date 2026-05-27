/** @type {import('next').NextConfig} */

import { getPoznavackaFiles } from "./functions/getPoznavackaFiles.ts";

const nextConfig = {
  output: "export", // Outputs a Single-Page Application (SPA).
  distDir: "./dist", // Changes the build output directory to `./dist/`.
  plugins: {
    "@tailwindcss/postcss": {},
  },
  env: {
    // Next.js injects this string value at build time
    NEXT_PUBLIC_FILE_SYSTEM: JSON.stringify(getPoznavackaFiles("./public/assets/poznavacky")),
  },
};

export default nextConfig;
