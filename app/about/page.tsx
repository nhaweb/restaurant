import { About } from "@/components/home/About";
import { Team } from "@/components/home/Team";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { restaurant } from "@/data/restaurant";
import { BreadcrumbJsonLd } from "@/lib/json-ld";
import { pageImages } from "@/lib/page-images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Giới thiệu",
  description: `Tìm hiểu về ${restaurant.name} — bếp, đội ngũ và cách chúng tôi làm món tươi, cân bằng.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", path: "/" },
          { name: "Giới thiệu", path: "/about" },
        ]}
      />
      <PageHero
        variant="banner"
        title="Về chúng tôi"
        backgroundImage={pageImages.aboutHero}
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Giới thiệu" },
        ]}
      />
      <About />
      <WhyChooseUs />
      <Team />
      <section className="pb-16 md:pb-24">
        <div className="container-site flex flex-wrap justify-center gap-2.5">
          <Button href="/menu">Xem thực đơn</Button>
          <Button href="/reservation" variant="outline" shape="square">
            Đặt bàn
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
