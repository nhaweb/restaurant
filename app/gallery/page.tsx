import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { StaggerChildren, StaggerItem } from "@/components/ui/StaggerChildren";
import { getGalleryImages } from "@/lib/content/gallery";
import { BreadcrumbJsonLd } from "@/lib/json-ld";
import { pageImages } from "@/lib/page-images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Thư viện ảnh",
  description:
    "Khám phá món ăn, nguyên liệu và khoảnh khắc tại bàn của PML Food.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const galleryImages = await getGalleryImages();

  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", path: "/" },
          { name: "Thư viện ảnh", path: "/gallery" },
        ]}
      />
      <PageHero
        variant="banner"
        title="Thư viện ảnh"
        backgroundImage={pageImages.galleryHero}
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Thư viện ảnh" },
        ]}
      />
      <section className="py-14 md:py-20">
        <div className="container-site">
          <StaggerChildren
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.06}
          >
            {galleryImages.map((image) => (
              <StaggerItem key={image.id} as="figure">
                <div className="group relative aspect-square overflow-hidden rounded-[6px] bg-gray-6">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
          <div className="mt-12 flex justify-center">
            <Button href="/reservation">Đặt bàn</Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
