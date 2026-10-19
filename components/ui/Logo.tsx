import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`cursor-pointer text-xl font-bold leading-8 text-black transition-opacity hover:opacity-90 sm:text-2xl ${className}`}
    >
      PML <span className="text-primary">Food</span>
    </Link>
  );
}
