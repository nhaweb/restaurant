import Image from "next/image";
import { assets } from "@/lib/assets";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  showLeaf?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  showLeaf = false,
}: Props) {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";
  const titleColor = light ? "text-white" : "text-gray-1";
  const descColor = light ? "text-white" : "text-gray-3";

  return (
    <div className={`relative mb-8 flex flex-col gap-2.5 sm:mb-10 sm:gap-3 md:mb-14 ${alignClass}`}>
      {showLeaf && (
        <Image
          src={assets.leaf}
          alt=""
          width={80}
          height={160}
          className={`pointer-events-none absolute -top-8 left-1/2 hidden h-40 w-20 -translate-x-1/2 rotate-[37deg] md:block ${
            light ? "opacity-90 mix-blend-screen" : "mix-blend-screen opacity-90"
          }`}
        />
      )}
      {eyebrow && (
        <div className="flex items-center gap-2">
          <p className="font-script text-base leading-[26px] text-primary sm:text-lg">
            {eyebrow}
          </p>
          <span className="hidden h-px w-[34px] bg-primary sm:block" aria-hidden />
        </div>
      )}
      <h2 className={`text-heading relative z-10 font-bold ${titleColor}`}>{title}</h2>
      {description && (
        <p
          className={`max-w-xl text-sm leading-6 sm:text-base ${descColor} ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
