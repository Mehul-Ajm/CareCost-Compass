"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2 border-transparent" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-3xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <div className="flex items-center justify-center bg-white rounded-lg p-1 w-12.5 h-9 left-10">
          <Image 
            src="/logo.svg" 
            alt="Oasis Workflow" 
            width={24} 
            height={24} 
            className="w-8 h-6 filter text-black"
          />
        </div>
        <Link href="/" className="underline-animation navbar-links rounded-lg w-32 h-9 text-center duration-300 font-saira flex justify-center items-center">
          Home
        </Link>
        <MenuItem setActive={setActive} active={active} item="Purchase">
          <div className="flex flex-col space-y-2 text-sm">
            <HoveredLink href="/hobby">Lite</HoveredLink>
            <HoveredLink href="/individual">Pro</HoveredLink>
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
            <div className="col-span-full text-center items-center justify-center border-2 border-white/[0.2] rounded-lg">
              <ProductItem
                title="More Products"
                href="https://userogue.com"
                src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
                description="More products coming soon"
              />
            </div>
          </div>
        </MenuItem>
        <Link href="/blog" className="underline-animation navbar-links rounded-lg w-32 h-9 text-center duration-300 font-saira flex justify-center items-center">
          The Blog
        </Link>
        <Link href="/support" className="underline-animation navbar-links rounded-lg w-32 h-9 text-center duration-300 font-saira flex justify-center items-center">
         Support
        </Link>
        <Link href="/login" className="bg-white text-black rounded-lg w-32 h-9 text-center duration-300 font-saira text-lg flex justify-center items-center">
          Login
        </Link>
      </Menu>
    </div>
  );
}
