import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { assets } from "@/lib/assets";

const partnerLogos = assets.partners;

export function Partners() {
  return (
    <section className="overflow-x-clip py-16 md:py-20">
      <div className="container-site">
        <SectionHeading
          showLeaf
          eyebrow="Đối tác & khách hàng"
          title="Hợp tác cùng những thương hiệu uy tín"
        />
      </div>

      <div
        className="partners-marquee"
        role="region"
        aria-label="Danh sách thương hiệu đối tác"
      >
        <div className="partners-marquee__track">
          {[...partnerLogos, ...partnerLogos].map((src, index) => {
            const logoIndex = (index % partnerLogos.length) + 1;
            const isDuplicate = index >= partnerLogos.length;

            return (
              <div
                key={`${src}-${index}`}
                className="partners-marquee__item"
                aria-hidden={isDuplicate}
              >
                <Image
                  src={src}
                  alt={isDuplicate ? "" : `Logo đối tác ${logoIndex}`}
                  width={160}
                  height={64}
                  className="h-12 w-auto max-w-[140px] object-contain opacity-35 grayscale transition-[opacity,filter] duration-300 sm:h-14 sm:max-w-[160px] md:h-16"
                  sizes="140px"
                  quality={60}
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
