import { HeroVisual } from "@/components/home/HeroVisual";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { restaurant } from "@/data/restaurant";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-x-clip bg-white pt-[var(--header-height)]"
    >
      {/* Soft brand atmosphere — not a flat white plane */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_85%_55%,rgba(168,188,161,0.28)_0%,transparent_58%),radial-gradient(60%_50%_at_10%_20%,rgba(25,90,0,0.06)_0%,transparent_55%)]"
        aria-hidden
      />

      <div className="container-site relative grid items-center gap-8 pb-12 pt-8 sm:gap-10 sm:pb-16 sm:pt-10 lg:grid-cols-2 lg:gap-10 lg:pb-20 lg:pt-12 xl:gap-14">
        {/* Copy stays above visual in stacking + document order on mobile */}
        <FadeIn className="relative z-20 mx-auto w-full max-w-[34rem] text-center lg:mx-0 lg:max-w-[520px] lg:text-left">
          <p className="mb-3 text-[1.75rem] font-bold leading-none tracking-tight text-gray-1 sm:mb-4 sm:text-[2.125rem]">
            PML <span className="text-primary">Food</span>
          </p>

          <div className="mb-4 flex items-center justify-center gap-3 lg:justify-start">
            <p className="font-script text-base text-primary sm:text-lg sm:leading-[26px]">
              {restaurant.tagline}
            </p>
            <span className="h-px w-7 shrink-0 rounded bg-primary sm:w-8" aria-hidden />
          </div>

          <h1 className="text-display mb-4 font-bold text-gray-1 sm:mb-5">
            Tận hưởng cuộc sống lành mạnh
            <br className="hidden min-[380px]:block" />
            <span className="min-[380px]:hidden"> </span>
            &amp; món ăn ngon.
          </h1>

          <p className="mx-auto mb-7 max-w-[26rem] text-sm leading-6 text-gray-2 sm:mb-8 sm:text-base lg:mx-0">
            {restaurant.shortDescription}
          </p>

          <div className="flex flex-col items-stretch gap-3 min-[420px]:flex-row min-[420px]:flex-wrap min-[420px]:items-center min-[420px]:justify-center sm:gap-4 lg:justify-start">
            <Button href="/about" className="w-full min-[420px]:w-auto">
              Xem thêm
            </Button>
            <Button href="/menu" variant="outline" className="w-full min-[420px]:w-auto">
              Xem thực đơn
            </Button>
          </div>
        </FadeIn>

        {/* Isolated visual plane — blob cannot paint over CTAs */}
        <div className="relative z-0 isolate min-w-0">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
