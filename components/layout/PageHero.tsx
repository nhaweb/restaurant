import Image from "next/image";
import Link from "next/link";
import { assets } from "@/lib/assets";

type Crumb = { label: string; href?: string };

type Props = {
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
  /** Dark full-bleed banner matching Elite inner-page heroes */
  variant?: "default" | "banner";
  backgroundImage?: string;
};

export function PageHero({
  title,
  description,
  breadcrumbs,
  variant = "default",
  backgroundImage,
}: Props) {
  if (variant === "banner") {
    const bg = backgroundImage ?? assets.teamBg;
    return (
      <section className="relative flex min-h-[260px] items-center justify-center overflow-hidden py-16 md:min-h-[310px] md:py-20">
        <Image
          src={bg}
          alt=""
          fill
          priority
          className="object-cover object-[72%_65%]"
          sizes="100vw"
        />
        {/* Soft vignette: keep food readable, text still clear */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/45 to-black/60"
          aria-hidden
        />
        <div className="container-site relative z-10 text-center">
          <h1 className="text-[36px] font-bold leading-tight text-white md:text-[48px] md:leading-[56px]">
            {title}
          </h1>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav aria-label="Đường dẫn" className="mt-2 md:mt-3">
              <ol className="flex flex-wrap items-center justify-center gap-2 text-base leading-7 md:text-xl">
                {breadcrumbs.map((crumb, index) => (
                  <li
                    key={`${crumb.label}-${index}`}
                    className="inline-flex items-center gap-2"
                  >
                    {index > 0 && (
                      <span className="text-white" aria-hidden>
                        &gt;
                      </span>
                    )}
                    {crumb.href ? (
                      <Link
                        href={crumb.href}
                        className="text-white transition-colors hover:text-primary"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="font-medium text-primary">{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-base leading-6 text-white/80">
              {description}
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(168,188,161,0.28)_0%,rgba(255,255,255,0)_100%)] py-14 md:py-20">
      <div className="container-site">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Đường dẫn" className="mb-4 text-sm text-gray-3">
            <ol className="flex flex-wrap items-center gap-2">
              {breadcrumbs.map((crumb, index) => (
                <li
                  key={`${crumb.label}-${index}`}
                  className="inline-flex items-center gap-2"
                >
                  {index > 0 && <span aria-hidden>/</span>}
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-primary">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-gray-1">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="text-[36px] font-bold leading-tight text-gray-1 md:text-[48px] md:leading-[56px]">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-6 text-gray-2">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
