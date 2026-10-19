import { Blog } from "@/components/home/Blog";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { getBlogPosts } from "@/lib/content/blog";
import { BreadcrumbJsonLd } from "@/lib/json-ld";
import { pageImages } from "@/lib/page-images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Tin tức và ghi chú bếp PML Food — món theo mùa, tráng miệng và cách chúng tôi nấu.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />
      <PageHero
        variant="banner"
        title="Blog"
        backgroundImage={pageImages.blogHero}
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Blog" },
        ]}
      />
      <Blog showHeading={false} posts={posts} />
    </PageShell>
  );
}
