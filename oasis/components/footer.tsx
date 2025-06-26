import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex flex-col row-start-3 gap-[24px] flex-wrap items-center justify-center">
    <div className="grid grid-cols-3 gap-[24px] flex-wrap items-center justify-center">
      <div className="flex flex-col items-center justify-center">Follow us on</div>
      <div className="flex flex-col items-center justify-center">
        <Link href="/">Facebook</Link>
        <Link href="/">Youtube</Link>
        <Link href="/">Twitter</Link>
      </div>

      <div className="flex flex-col items-center justify-center">Blog</div>
      <div className="flex flex-col items-center justify-center">Copyright © 2025 Oasis. All rights reserved.</div>
    </div>
    </footer>
  );
}