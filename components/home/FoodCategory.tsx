import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerChildren, StaggerItem } from "@/components/ui/StaggerChildren";
import { foodCategories } from "@/data/menu";

const categories = foodCategories.slice(0, 4);

export function FoodCategory() {
  return (
    <section className="relative overflow-x-clip py-14 sm:py-16 md:py-24">

      <div className="container-site relative z-10">
        <SectionHeading
          showLeaf
          title="Danh mục món ăn"
          description="Khám phá các bộ sưu tập signature — pasta yêu thích và món theo mùa chế biến tươi mỗi ngày."
        />

        <StaggerChildren
          as="ul"
          className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
          stagger={0.08}
        >
          {categories.map((item) => (
            <StaggerItem key={item.id} as="li">
              <Link
                href={item.href}
                className="block cursor-pointer transition-opacity duration-200 hover:opacity-95"
              >
                <article>
                  <div className="relative mb-3 aspect-[312/364] overflow-hidden rounded-[6px] sm:mb-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 ease-out motion-safe:hover:scale-105"
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 25vw"
                      quality={70}
                    />
                  </div>
                  <h3 className="text-center text-base font-bold leading-7 text-gray-2 sm:text-xl">
                    {item.name}
                  </h3>
                  <p className="text-center text-sm leading-6 text-gray-3 sm:text-base">
                    {item.itemCount} món
                  </p>
                </article>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
