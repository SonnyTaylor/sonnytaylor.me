import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "nice try diddy",
  robots: "noindex, nofollow",
};

export default function NiceTryPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black">
      <div className="relative flex flex-col items-center gap-8">
        <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-white/10 shadow-2xl shadow-white/5">
          <Image
            src="/sonny.jpeg"
            alt="nice try diddy"
            fill
            className="object-cover"
            priority
          />
        </div>

        <h1 className="font-mono text-4xl font-bold tracking-tight text-white sm:text-6xl">
          nice try diddy
        </h1>

        <div className="flex flex-col items-center gap-1 font-mono text-sm text-white/30">
          <span>HTTP 200 &mdash; but you found nothing</span>
          <span className="text-xs text-white/15">all your packets are belong to us</span>
        </div>
      </div>
    </div>
  );
}
