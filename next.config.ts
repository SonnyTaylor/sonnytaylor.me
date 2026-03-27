import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`;

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: cspHeader.replace(/\n/g, "").replace(/\s{2,}/g, " ").trim(),
  },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: process.cwd(),
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/.env", destination: "/nice-try" },
      { source: "/.env.local", destination: "/nice-try" },
      { source: "/wp-admin", destination: "/nice-try" },
      { source: "/wp-login.php", destination: "/nice-try" },
      { source: "/wp-login", destination: "/nice-try" },
      { source: "/administrator", destination: "/nice-try" },
      { source: "/phpmyadmin", destination: "/nice-try" },
    ];
  },
};

export default nextConfig;
