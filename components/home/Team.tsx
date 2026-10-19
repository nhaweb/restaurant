import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { teamMembers as defaultTeam } from "@/data/content";
import { restaurant } from "@/data/restaurant";
import type { TeamMember } from "@/lib/content/home";
import { assets } from "@/lib/assets";

const teamSocial = restaurant.social.slice(0, 4);

type Props = {
  members?: TeamMember[];
};

export function Team({ members }: Props) {
  const teamMembers = members ?? defaultTeam.map((m) => ({ ...m }));

  return (
    <section id="team" className="relative overflow-x-clip pb-16 pt-14 sm:pb-20 sm:pt-16 md:pb-28 md:pt-24">
      {/* Full-bleed green band behind heading + upper half of photos */}
      <div className="absolute inset-x-0 top-0 h-[420px] overflow-hidden md:h-[480px]">
        <Image
          src={assets.teamBg}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[var(--team-overlay)]" />
      </div>

      <div className="container-site relative z-10">
        <SectionHeading
          showLeaf
          light
          title="Đội ngũ"
          description="Những người đứng sau PML Food — lòng hiếu khách, tay nghề bếp và sự chăm sóc khách hàng mỗi ngày."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {teamMembers.map((member, index) => (
            <FadeIn key={member.name} delay={index * 0.05} className="w-full">
              <article className="relative w-full overflow-hidden bg-white shadow-[0px_0px_80px_0px_rgba(205,205,205,0.25)]">
                <div className="relative aspect-[312/310] bg-[#7a7a7a]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 312px"
                  />
                  <ul
                    className="absolute right-3 top-3 flex flex-col gap-2"
                    aria-label={`${member.name} social profiles`}
                  >
                    {teamSocial.map((item) => (
                      <li key={item.label}>
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex size-9 items-center justify-center bg-white transition hover:opacity-90"
                            aria-label={`${member.name} on ${item.label}`}
                          >
                            <Image
                              src={item.icon}
                              alt=""
                              width={20}
                              height={20}
                              className="size-5 object-contain"
                            />
                          </a>
                        ) : (
                          <span className="flex size-9 items-center justify-center bg-white">
                            <Image
                              src={item.icon}
                              alt=""
                              width={20}
                              height={20}
                              className="size-5 object-contain"
                            />
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white px-4 py-5 text-center">
                  <h3 className="text-xl font-bold leading-7 text-gray-2">
                    {member.name}
                  </h3>
                  <p className="text-base leading-6 text-gray-3">{member.role}</p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
