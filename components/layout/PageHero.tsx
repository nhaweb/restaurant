"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/lib/assets";

type Crumb = { label: string; href?: string };

type Props = {
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
  /** Dark full-bleed banner matching Elite inner-page heroes */
  variant?: "default" | "banner";
  backgroundImage?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function PageHero({
  title,
  description,
  breadcrumbs,
  variant = "default",
  backgroundImage,
}: Props) {
  const reduceMotion = useReducedMotion();

  const textItem = {
    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease },
    },
  };

  const textContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.1,
        delayChildren: reduceMotion ? 0 : 0.08,
      },
    },
  };

  if (variant === "banner") {
    const bg = backgroundImage ?? assets.teamBg;
    return (
      <section className="relative flex min-h-[260px] items-center justify-center overflow-hidden py-16 md:min-h-[310px] md:py-20">
        <motion.div
          className="absolute inset-0"
          initial={reduceMotion ? false : { scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.1, ease }}
        >
          <Image
            src={bg}
            alt=""
            fill
            priority
            className="object-cover object-[72%_65%]"
            sizes="100vw"
          />
        </motion.div>
        {/* Soft vignette: keep food readable, text still clear */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/45 to-black/60"
          aria-hidden
        />
        <motion.div
          className="container-site relative z-10 text-center"
          initial="hidden"
          animate="show"
          variants={textContainer}
        >
          <motion.h1
            className="text-[36px] font-bold leading-tight text-white md:text-[48px] md:leading-[56px]"
            variants={textItem}
          >
            {title}
          </motion.h1>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <motion.nav
              aria-label="Đường dẫn"
              className="mt-2 md:mt-3"
              variants={textItem}
            >
              <ol className="flex flex-wrap items-center justify-center gap-2 text-base leading-7 md:text-xl">
                {breadcrumbs.map((crumb, index) => (
                  <li
                    key={`${crumb.label}-${index}`}
                    className="inline-flex items-center gap-2"
                  >
                    {index > 0 && (
                      <span className="text-white" aria-hidden>
                        &gt;
                      </span>
                    )}
                    {crumb.href ? (
                      <Link
                        href={crumb.href}
                        className="text-white transition-colors hover:text-primary"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="font-medium text-primary">{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </motion.nav>
          )}
          {description && (
            <motion.p
              className="mx-auto mt-4 max-w-2xl text-base leading-6 text-white/80"
              variants={textItem}
            >
              {description}
            </motion.p>
          )}
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(168,188,161,0.28)_0%,rgba(255,255,255,0)_100%)] py-14 md:py-20">
      <motion.div
        className="container-site"
        initial="hidden"
        animate="show"
        variants={textContainer}
      >
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.nav
            aria-label="Đường dẫn"
            className="mb-4 text-sm text-gray-3"
            variants={textItem}
          >
            <ol className="flex flex-wrap items-center gap-2">
              {breadcrumbs.map((crumb, index) => (
                <li
                  key={`${crumb.label}-${index}`}
                  className="inline-flex items-center gap-2"
                >
                  {index > 0 && <span aria-hidden>/</span>}
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-primary">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-gray-1">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </motion.nav>
        )}
        <motion.h1
          className="text-[36px] font-bold leading-tight text-gray-1 md:text-[48px] md:leading-[56px]"
          variants={textItem}
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            className="mt-4 max-w-2xl text-base leading-6 text-gray-2"
            variants={textItem}
          >
            {description}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
