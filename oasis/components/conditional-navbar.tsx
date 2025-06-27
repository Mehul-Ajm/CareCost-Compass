"use client";
import { usePathname } from "next/navigation";
import { NavbarDemo } from "./navbar";

export function ConditionalNavbar() {
  const pathname = usePathname();
  const isLandingPage = pathname.startsWith("/landing");

  if (isLandingPage) {
    return null;
  }

  return <NavbarDemo />;
} 