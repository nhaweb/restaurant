import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { pageImages } from "@/lib/page-images";
import { assets } from "@/lib/assets";

const stats = [
  { value: "420", label: "Đầu bếp chuyên nghiệp", icon: assets.hamburger },
  { value: "320", label: "Món trên thực đơn", icon: assets.factory },
  { value: "30+", label: "Năm kinh nghiệm", icon: assets.timer },
  { value: "220", label: "Khách hàng hài lòng", icon: assets.truck },
] as const;

export function StatsBanner() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <Image
        src={pageImages.statsBg}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[#0d0d0d]/85" aria-hidden />
      <div className="container-site relative z-10">
        <ul className="grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat, index) => (
            <FadeIn key={stat.label} delay={index * 0.06}>
              <li className="flex flex-col items-center text-center text-white">
                <Image
                  src={stat.icon}
                  alt=""
                  width={80}
                  height={80}
                  className="mb-6 size-16 brightness-0 invert md:size-20"
                />
                <p className="text-[36px] font-bold leading-[48px] md:text-[40px]">
                  {stat.value}
                </p>
                <p className="mt-2 text-lg font-bold leading-8 md:text-2xl">
                  {stat.label}
                </p>
              </li>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
