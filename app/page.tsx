import { About } from "@/components/home/About";
import { Blog } from "@/components/home/Blog";
import { FoodCategory } from "@/components/home/FoodCategory";
import { FoodMenu } from "@/components/home/FoodMenu";
import { Hero } from "@/components/home/Hero";
import { Partners } from "@/components/home/Partners";
import { Team } from "@/components/home/Team";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getBlogPosts } from "@/lib/content/blog";
import { getTeamMembers, getTestimonials } from "@/lib/content/home";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Ẩm thực lành mạnh & ngon miệng",
  description:
    "PML Food — món tươi, đĩa ăn cân bằng và không gian thân thiện tại TP. Hồ Chí Minh.",
  path: "/",
});

export default async function Home() {
  const [posts, team, testimonials] = await Promise.all([
    getBlogPosts(),
    getTeamMembers(),
    getTestimonials(),
  ]);

  return (
    <>
      <SiteHeader variant="overlay" />
      <main className="flex-1 overflow-x-clip bg-white">
        <Hero />
        <About />
        <FoodCategory />
        <WhyChooseUs />
        <FoodMenu />
        <Team members={team} />
        <Testimonials items={testimonials} />
        <Blog posts={posts} />
        <Partners />
      </main>
      <SiteFooter />
    </>
  );
}
