"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <Link href="/" className="underline-animation text-lg text-black hover:opacity-[0.9] dark:text-white hover:text-orange-500 rounded-lg w-32 text-center duration-300">
          Home
        </Link>
        <MenuItem setActive={setActive} active={active} item="Purchase">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">Lite</HoveredLink>
            <HoveredLink href="/individual" className="hover:text-yellow-400">Pro</HoveredLink>
            <HoveredLink href="/team">Business</HoveredLink>
            <HoveredLink href="/enterprise">Business Plus</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Add Ons">
          <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 p-4 lg:text-5 md:text-lg text-sm">
            <ProductItem
              title="Algochurn"
              href="https://algochurn.com"
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Tailwind Master Kit"
              href="https://tailwindmasterkit.com"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="Production ready Tailwind css components for your next project"
            />
            <ProductItem
              title="Moonbeam"
              href="https://gomoonbeam.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="Rogue"
              href="https://userogue.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
            <div className="col-span-full">
              <ProductItem
                title="More Products"
                href="https://userogue.com"
                src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
                description="More products coming soon"
              />
            </div>
          </div>
        </MenuItem>
        <Link href="/" className="underline-animation text-lg text-black hover:opacity-[0.9] dark:text-white hover:text-orange-500 rounded-lg w-32 text-center duration-300">
          The Blog
        </Link>
        <Link href="/" className="underline-animation text-lg text-black hover:opacity-[0.9] dark:text-white hover:text-orange-500 rounded-lg w-32 text-center duration-300">
          Support
        </Link>
      </Menu>
    </div>
  );
}
