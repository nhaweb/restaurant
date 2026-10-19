import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { blogPosts as staticPosts } from "@/data/content";
import { getBlogPost, getBlogPosts } from "@/lib/content/blog";
import { assets } from "@/lib/assets";
import { BreadcrumbJsonLd } from "@/lib/json-ld";
import { pageImages } from "@/lib/page-images";
import { pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  const slugs = posts.length ? posts : staticPosts;
  return slugs.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) {
    return pageMetadata({
      title: "Bài viết",
      description: "Bài viết blog PML Food.",
      path: `/blog/${slug}`,
    });
  }
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <PageHero
        variant="banner"
        title={post.title}
        backgroundImage={pageImages.blogHero}
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />
      <article className="pb-16 md:pb-24">
        <div className="container-site max-w-3xl">
          <div className="relative mb-8 aspect-[16/10] overflow-hidden rounded-[6px]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
          <div className="mb-6 flex flex-wrap items-center gap-4 text-base text-gray-1/60">
            <span className="inline-flex items-center gap-2">
              <Image src={assets.calendar} alt="" width={20} height={20} />
              {post.dateLabel}
            </span>
            <span className="inline-flex items-center gap-2">
              <Image src={assets.chats} alt="" width={20} height={20} />
              {post.comments} Comments
            </span>
          </div>
          <div className="space-y-5 text-base leading-7 text-gray-2">
            {post.content.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/blog" variant="outline">
              Back to blog
            </Button>
            <Button href="/reservation">Đặt bàn</Button>
          </div>
          <p className="mt-6 text-sm text-gray-3">
            <Link href="/blog" className="text-primary hover:underline">
              ← Tất cả bài viết
            </Link>
          </p>
        </div>
      </article>
    </PageShell>
  );
}
