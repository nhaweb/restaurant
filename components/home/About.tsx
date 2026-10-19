import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutCopy } from "@/data/content";
import { assets } from "@/lib/assets";

export function About() {
  return (
    <section id="about" className="relative overflow-x-clip py-14 sm:py-16 md:py-24">
      <div className="container-site grid items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
        <FadeIn className="relative grid grid-cols-[1.1fr_1fr] gap-3 sm:gap-4 md:gap-6">
          <div className="relative row-span-2 min-h-[240px] overflow-hidden rounded-[6px] sm:min-h-[320px] md:min-h-[536px]">
            <Image
              src={assets.aboutTall}
              alt="Đầu bếp chuẩn bị món tươi"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 336px"
            />
          </div>
          <div className="relative min-h-[120px] overflow-hidden rounded-[6px] sm:min-h-[160px] md:min-h-[271px]">
            <Image
              src={assets.aboutTop}
              alt="Chuẩn bị trong bếp"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 45vw, 309px"
            />
          </div>
          <div className="relative min-h-[150px] overflow-hidden rounded-[6px] sm:min-h-[200px] md:min-h-[382px]">
            <Image
              src={assets.aboutBottom}
              alt="Đĩa salad tươi"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 45vw, 309px"
            />
          </div>
          <Image
            src={assets.aboutLeaf}
            alt=""
            width={180}
            height={220}
            className="pointer-events-none absolute -bottom-10 -left-16 hidden w-44 rotate-[48deg] mix-blend-screen lg:block"
          />
        </FadeIn>

        <FadeIn delay={0.08}>
          <SectionHeading
            align="left"
            eyebrow={aboutCopy.eyebrow}
            title={aboutCopy.title}
          />
          <p className="mb-6 text-sm leading-6 text-gray-2 sm:mb-8 sm:text-base">{aboutCopy.body}</p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <Button href="/menu">Xem thực đơn</Button>
            <Button href="/reservation" variant="outline">
              Đặt bàn
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
