"use client";

import Image from "next/image";
import { ArrowLeft, Truck } from "lucide-react";
import NavigationLink from "@/components/next-intl/NavigationLink";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-neutral-900 px-6 text-center text-white">
      <div className="absolute top-10">
        <Image
          src="/logo.svg"
          alt="Crystal Logistics"
          width={120}
          height={60}
          className="opacity-90"
          priority
        />
      </div>

      <Truck className="mb-6 h-20 w-20 animate-pulse text-yellow-400" />

      <h1 className="mb-3 text-7xl font-bold text-yellow-400">404</h1>

      <h2 className="mb-4 text-2xl font-semibold md:text-3xl">
        Page not found
      </h2>

      <p className="mb-10 max-w-lg text-gray-300 leading-relaxed">
        Sorry, the page you&apos;re looking for doesn&apos;t exist, may have
        been moved, or is temporarily unavailable.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <NavigationLink
          href="/"
          className="flex items-center gap-2 rounded-full bg-yellow-400 px-8 py-3 font-semibold text-black transition-all hover:bg-yellow-500"
        >
          <ArrowLeft size={20} />
          Back to homepage
        </NavigationLink>

        <NavigationLink
          href="/solutii"
          className="rounded-full border border-yellow-400 px-8 py-3 font-semibold text-yellow-400 transition-all hover:bg-yellow-400 hover:text-black"
        >
          Our Solutions
        </NavigationLink>
      </div>

      <div className="absolute bottom-6 text-xs text-gray-500">
        © {new Date().getFullYear()} Crystal Logistics
      </div>
    </div>
  );
}
