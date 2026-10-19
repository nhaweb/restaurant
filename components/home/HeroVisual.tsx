"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { assets } from "@/lib/assets";

export function HeroVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[380px] sm:max-w-[460px] md:max-w-[540px] lg:ml-auto lg:mr-0 lg:max-w-none">
      {/* Clip blob on mobile so it never covers CTAs above */}
      <div className="relative aspect-square overflow-hidden sm:overflow-visible">
        <motion.div
          className="absolute inset-[2%] sm:inset-0 lg:-right-[4%] lg:left-auto lg:top-[-4%] lg:h-[108%] lg:w-[108%]"
          aria-hidden
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={assets.heroBlob}
            alt=""
            fill
            className="object-contain object-center lg:object-right"
            priority
            sizes="(max-width: 1024px) 90vw, 50vw"
          />
        </motion.div>

        {/* Keep LCP bowl visible immediately — no opacity:0 entrance */}
        <motion.div
          className="absolute inset-[12%] z-10 sm:inset-[10%]"
          initial={reduceMotion ? false : { y: 18 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="relative h-full w-full"
            animate={
              reduceMotion
                ? undefined
                : { y: [0, -8, 0] }
            }
            transition={
              reduceMotion
                ? undefined
                : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <Image
              src={assets.heroBowl}
              alt="Tô salad tươi với rau xanh, bơ, đậu và cà chua"
              fill
              className="object-contain drop-shadow-[0_18px_40px_rgba(25,90,0,0.18)]"
              priority
              fetchPriority="high"
              sizes="(max-width: 640px) 85vw, (max-width: 1024px) 55vw, 42vw"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute left-[10%] top-[14%] z-20 w-[18%] max-w-[88px]"
          aria-hidden
          animate={reduceMotion ? undefined : { y: [0, 6, 0], rotate: [-67, -62, -67] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }
          }
        >
          <Image
            src={assets.heroLeaf}
            alt=""
            width={140}
            height={160}
            className="h-auto w-full mix-blend-screen"
          />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute bottom-[10%] right-[14%] z-20 w-[22%] max-w-[110px]"
          aria-hidden
          animate={reduceMotion ? undefined : { y: [0, -7, 0], rotate: [129, 124, 129] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }
          }
        >
          <Image
            src={assets.heroLeaf}
            alt=""
            width={160}
            height={180}
            className="h-auto w-full mix-blend-screen"
          />
        </motion.div>
      </div>
    </div>
  );
}
