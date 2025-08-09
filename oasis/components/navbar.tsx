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
        <Link href="/blog" className="underline-animation navbar-links rounded-lg w-32 h-9 text-center duration-300 font-saira flex justify-center items-center">
          More Info
        </Link>
        <Link href="/support" className="underline-animation navbar-links rounded-lg w-32 h-9 text-center duration-300 font-saira flex justify-center items-center">
         Support
        </Link>
        <Link href="/login" className="bg-white text-black rounded-lg w-32 h-9 text-center duration-300 font-saira text-lg flex justify-center items-center">
          Login
        </Link>
        <Link href="/signup" className="bg-white text-black rounded-lg w-32 h-9 text-center duration-300 font-saira text-lg flex justify-center items-center">
          Sign Up
        </Link>
      </Menu>
    </div>
  );
}
