import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  formatCalories,
  formatPrice,
  type MenuItem,
} from "@/data/menu";

type Section = {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  imageLeft: boolean;
  items: MenuItem[];
  highlightId?: string;
};

type Props = {
  sections: Section[];
};

function CoffeeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-6 shrink-0 fill-primary"
      aria-hidden
    >
      <path d="M6 3h10a1 1 0 0 1 1 1v2h1.5A1.5 1.5 0 0 1 20 7.5V9a5 5 0 0 1-4 4.9V19h2v2H6v-2h2v-5.1A5 5 0 0 1 4 9V7.5A1.5 1.5 0 0 1 5.5 6H7V4a1 1 0 0 1 1-1Zm11 5H7v1a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3V8Z" />
    </svg>
  );
}

function MenuRow({
  item,
  highlight,
}: {
  item: MenuItem;
  highlight?: boolean;
}) {
  return (
    <article className="border-b border-gray-5 pb-6">
      <div className="mb-2 flex items-start justify-between gap-4">
        <h3
          className={`text-xl font-bold leading-8 md:text-2xl ${
            highlight ? "text-primary" : "text-gray-1"
          }`}
        >
          {item.name}
        </h3>
        <p className="shrink-0 text-xl font-bold leading-8 text-primary md:text-2xl">
          {formatPrice(item.price)}
        </p>
      </div>
      <p className="mb-1 text-base leading-6 text-gray-2">{item.description}</p>
      {item.calories != null && (
        <p className="text-base leading-6 text-gray-3">
          {formatCalories(item.calories)}
        </p>
      )}
    </article>
  );
}

export function MenuSections({ sections }: Props) {
  return (
    <div className="space-y-16 md:space-y-24">
      {sections.map((section, sectionIndex) => (
        <FadeIn key={section.id} delay={sectionIndex * 0.04}>
          <section
            aria-labelledby={`menu-section-${section.id}`}
            className="grid items-start gap-10 lg:grid-cols-[minmax(0,448px)_minmax(0,1fr)] lg:gap-14"
          >
            <div
              className={`relative mx-auto aspect-[448/626] w-full max-w-[448px] overflow-hidden ${
                section.imageLeft ? "lg:order-1" : "lg:order-2"
              }`}
            >
              <Image
                src={section.image}
                alt={section.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 448px"
                priority={sectionIndex === 0}
              />
            </div>

            <div className={section.imageLeft ? "lg:order-2" : "lg:order-1"}>
              <div className="mb-8 flex items-start gap-3">
                <CoffeeIcon />
                <h2
                  id={`menu-section-${section.id}`}
                  className="text-[32px] font-bold leading-10 text-gray-1 md:text-[48px] md:leading-[56px]"
                >
                  {section.title}
                </h2>
              </div>
              <div className="flex flex-col gap-8">
                {section.items.map((item) => (
                  <MenuRow
                    key={item.id}
                    item={item}
                    highlight={item.id === section.highlightId}
                  />
                ))}
              </div>
            </div>
          </section>
        </FadeIn>
      ))}
    </div>
  );
}
