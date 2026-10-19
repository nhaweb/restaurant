import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { features, whyChooseCopy } from "@/data/content";
import { assets } from "@/lib/assets";

export function WhyChooseUs() {
  return (
    <section className="overflow-x-clip py-14 sm:py-16 md:py-24">
      <div className="container-site grid items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-20">
        <FadeIn className="relative mx-auto w-full max-w-[700px]">
          <div className="grid grid-cols-[1.1fr_1fr] gap-3 sm:gap-4 lg:gap-0">
            <div className="relative z-10 min-h-[200px] overflow-hidden rounded-[6px] sm:min-h-[280px] md:min-h-[523px]">
              <Image
                src={assets.whyMain}
                alt="Đầu bếp chuẩn bị nguyên liệu tươi"
                fill
                className="object-cover pb-16"
                sizes="(max-width: 1024px) 55vw, 424px"
              />
            </div>
            <div className="relative z-10 mt-6 min-h-[180px] overflow-hidden rounded-[6px] sm:mt-10 sm:min-h-[260px] md:mt-24 md:min-h-[516px] lg:!relative right-10!">
              <Image
                src={assets.whySide}
                alt="Salad và nước ép lành mạnh"
                fill
                className="object-cover "
                sizes="(max-width: 1024px) 45vw, 385px"
              />
            </div>
          </div>
          <Image
            src={assets.whyLeaf}
            alt=""
            width={160}
            height={200}
            className="pointer-events-none absolute -top-10 z-0 left-1/2 -translate-x-1/3 hidden w-80 rotate-[42deg] lg:block"
          />
        </FadeIn>

        <FadeIn delay={0.08}>
          <SectionHeading
            align="left"
            eyebrow={whyChooseCopy.eyebrow}
            title={whyChooseCopy.title}
          />
          <p className="mb-6 text-sm leading-6 text-gray-3 sm:mb-8 sm:text-base">{whyChooseCopy.body}</p>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="relative flex items-center gap-3 overflow-hidden rounded-[6px] bg-white py-3.5 pl-3.5 pr-3 shadow-[0px_0px_80px_0px_rgba(205,205,205,0.25)] sm:gap-4 sm:py-4 sm:pl-4"
              >
                {index === 0 && (
                  <span className="absolute inset-y-0 left-0 w-1 rounded-l-[6px] bg-primary" />
                )}
                <Image src={feature.icon} alt="" width={48} height={48} className="size-10 shrink-0 sm:size-12" />
                <p className="text-base font-bold leading-6 text-gray-2 sm:text-xl sm:leading-7">
                  {feature.title}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
