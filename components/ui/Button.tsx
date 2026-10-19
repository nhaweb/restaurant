import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "solid" | "outline";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
  href?: string;
};

const styles: Record<Variant, string> = {
  solid: "bg-primary text-white hover:bg-[#144800] active:bg-[#123f00]",
  outline:
    "border border-primary text-primary bg-transparent hover:bg-primary/5 active:bg-primary/10",
};

export function Button({
  variant = "solid",
  children,
  className = "",
  href,
  ...props
}: Props) {
  const classes = `inline-flex cursor-pointer items-center justify-center rounded-[6px] px-6 py-3.5 text-base font-bold leading-6 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 sm:px-8 sm:py-4 sm:text-lg sm:leading-[26px] ${styles[variant]} ${className}`;

  if (href) {
    const external =
      href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
    if (external) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
