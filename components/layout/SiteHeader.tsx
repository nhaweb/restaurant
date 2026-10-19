"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CartLink } from "@/components/shop/CartLink";
import { Logo } from "@/components/ui/Logo";
import { primaryNav } from "@/data/navigation";
import { assets } from "@/lib/assets";

type Props = {
  /** Transparent over hero on the home page; becomes solid on scroll */
  variant?: "overlay" | "solid";
};

export function SiteHeader({ variant = "solid" }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (variant !== "overlay") return;
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  const isOverlay = variant === "overlay";
  const solidLook = !isOverlay || scrolled || open;

  const linkClass = (href: string) => {
    const active =
      href === "/"
        ? pathname === "/"
        : pathname === href || pathname.startsWith(`${href}/`);
    return `relative cursor-pointer text-sm leading-6 transition-colors duration-200 md:text-base ${
      active ? "font-bold text-gray-1" : "font-normal text-gray-1 hover:text-primary"
    }`;
  };

  return (
    <header
      className={
        isOverlay
          ? `fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300 ${
              solidLook
                ? "border-b border-gray-5/80 bg-white/95 shadow-sm backdrop-blur-md"
                : "border-b border-transparent bg-transparent"
            }`
          : "sticky top-0 z-50 border-b border-gray-5/80 bg-white/95 backdrop-blur-md"
      }
    >
      <div className="container-site flex h-16 items-center justify-between gap-3 md:h-20 md:gap-4">
        <Logo />

        <nav className="hidden items-center gap-5 xl:flex xl:gap-6" aria-label="Điều hướng chính">
          {primaryNav.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.label}
                {active && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 xl:flex xl:gap-3">
          <Link
            href="/menu#full-menu"
            className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-transparent transition-colors hover:border-primary/20 hover:bg-gray-6"
            aria-label="Xem thực đơn"
          >
            <Image src={assets.search} alt="" width={22} height={22} className="brightness-0" />
          </Link>
          <CartLink />
          <Link
            href="/reservation"
            className="inline-flex cursor-pointer items-center justify-center rounded-none bg-primary px-4 py-2 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#144800]"
          >
            Đặt bàn
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-primary/30 transition-colors hover:bg-primary/5 xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Đóng" : "Mở"} menu</span>
          <span className="flex flex-col gap-1.5" aria-hidden>
            <span
              className={`block h-0.5 w-5 bg-primary transition duration-200 ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-primary transition duration-200 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-primary transition duration-200 ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-gray-5 bg-white shadow-lg xl:hidden"
        >
          <nav className="container-site flex flex-col gap-1 py-4" aria-label="Menu di động">
            {primaryNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="cursor-pointer rounded-md px-2 py-3 text-base text-gray-1 transition-colors hover:bg-gray-6"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/reservation#pre-order"
              className="cursor-pointer rounded-md px-2 py-3 text-base text-gray-1 transition-colors hover:bg-gray-6"
              onClick={() => setOpen(false)}
            >
              Món đã chọn
            </Link>
            <Link
              href="/reservation"
              className="mt-2 inline-flex cursor-pointer items-center justify-center rounded-none bg-primary px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#144800]"
              onClick={() => setOpen(false)}
            >
              Đặt bàn
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
