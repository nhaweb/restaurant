import Image from "next/image";
import { assets } from "@/lib/assets";

/**
 * Server-rendered hero art so the LCP bowl is in the initial HTML
 * without waiting on motion/hydration.
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[380px] sm:max-w-[460px] md:max-w-[540px] lg:ml-auto lg:mr-0 lg:max-w-none">
      {/* Clip blob on mobile so it never covers CTAs above */}
      <div className="relative aspect-square overflow-hidden sm:overflow-visible">
        <div
          className="absolute inset-[2%] sm:inset-0 lg:-right-[4%] lg:left-auto lg:top-[-4%] lg:h-[108%] lg:w-[108%]"
          aria-hidden
        >
          <Image
            src={assets.heroBlob}
            alt=""
            fill
            className="object-contain object-center lg:object-right"
            sizes="(max-width: 640px) 300px, (max-width: 1024px) 50vw, 540px"
          />
        </div>

        {/* LCP bowl — no opacity:0, no client wrapper */}
        <div className="absolute inset-[12%] z-10 sm:inset-[10%]">
          <div className="hero-bowl__float relative h-full w-full">
            <Image
              src={assets.heroBowl}
              alt="Tô salad tươi với rau xanh, bơ, đậu và cà chua"
              fill
              className="object-contain drop-shadow-[0_18px_40px_rgba(25,90,0,0.18)]"
              priority
              fetchPriority="high"
              sizes="(max-width: 640px) 290px, (max-width: 1024px) 50vw, 420px"
              quality={70}
            />
          </div>
        </div>

        <div
          className="hero-leaf hero-leaf--a pointer-events-none absolute left-[10%] top-[14%] z-20 w-[18%] max-w-[88px]"
          aria-hidden
        >
          <Image
            src={assets.heroLeaf}
            alt=""
            width={96}
            height={110}
            className="h-auto w-full mix-blend-screen"
            sizes="88px"
          />
        </div>

        <div
          className="hero-leaf hero-leaf--b pointer-events-none absolute bottom-[10%] right-[14%] z-20 w-[22%] max-w-[110px]"
          aria-hidden
        >
          <Image
            src={assets.heroLeaf}
            alt=""
            width={110}
            height={124}
            className="h-auto w-full mix-blend-screen"
            sizes="110px"
          />
        </div>
      </div>
    </div>
  );
}
