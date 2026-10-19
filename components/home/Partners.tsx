import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { assets } from "@/lib/assets";

export function Partners() {
  return (
    <section className="py-16 md:py-20">
      <div className="container-site">
        <SectionHeading
          showLeaf
          eyebrow="Đối tác & khách hàng"
          title="Hợp tác cùng những thương hiệu uy tín"
        />
        <div className="grid grid-cols-2 items-center gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {assets.partners.map((src, index) => (
            <div
              key={src}
              className="relative mx-auto flex h-24 w-full max-w-[160px] items-center justify-center opacity-30 grayscale"
            >
              <Image
                src={src}
                alt={`Logo đối tác ${index + 1}`}
                fill
                className="object-contain"
                sizes="160px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
