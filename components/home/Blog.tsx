import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blogPosts as defaultPosts, type BlogPost } from "@/data/content";
import { assets } from "@/lib/assets";

type Props = {
  /** Hide section heading when the page already has a banner title */
  showHeading?: boolean;
  posts?: BlogPost[];
};

export function Blog({ showHeading = true, posts }: Props) {
  const blogPosts = posts ?? defaultPosts;

  return (
    <section id="blog" className="py-14 sm:py-16 md:py-24">
      <div className="container-site">
        {showHeading && (
          <SectionHeading
            showLeaf
            title="Tin mới & Blog"
            description="Câu chuyện từ bếp PML Food — món theo mùa, ghi chú tráng miệng và cách chúng tôi giữ độ tươi mỗi ngày."
          />
        )}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {blogPosts.map((post, index) => (
            <FadeIn key={post.slug} delay={index * 0.05}>
              <article className="rounded-[6px] bg-white p-4 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
                <div className="relative mb-5 aspect-[392/313] overflow-hidden rounded-[6px]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 50vw, 392px"
                  />
                </div>
                <div className="mb-3 flex flex-wrap items-center gap-4 text-base text-gray-1/60">
                  <span className="inline-flex items-center gap-2">
                    <Image src={assets.calendar} alt="" width={20} height={20} />
                    {post.dateLabel}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Image src={assets.chats} alt="" width={20} height={20} />
                    {post.comments} Comments
                  </span>
                </div>
                <h3 className="mb-4 text-xl font-bold leading-7 text-gray-1">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                    {post.title}
                  </Link>
                </h3>
                <p className="mb-4 text-base leading-6 text-gray-2">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-base font-bold text-primary"
                >
                  Learn More
                  <Image src={assets.arrowRight} alt="" width={16} height={16} />
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
