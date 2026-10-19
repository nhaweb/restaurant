import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { restaurant } from "@/data/restaurant";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Điều khoản sử dụng",
  description: `Điều khoản sử dụng website ${restaurant.name}.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <PageShell>
      <PageHero
        title="Điều khoản sử dụng"
        description={`Hướng dẫn sử dụng website ${restaurant.name}.`}
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Điều khoản sử dụng" },
        ]}
      />
      <section className="pb-16 md:pb-24">
        <div className="container-site max-w-3xl space-y-5 text-base leading-7 text-gray-2">
          <p>
            Nội dung trên website cung cấp thông tin chung về {restaurant.name},
            gồm thực đơn, giờ mở cửa và liên hệ. Món ăn và giá có thể thay đổi;
            vui lòng xác nhận khi dùng bữa hoặc đặt món qua điện thoại.
          </p>
          <p>
            Form đặt bàn và liên hệ chỉ gửi yêu cầu. Yêu cầu đã gửi chưa phải
            xác nhận đặt chỗ trừ khi chúng tôi phản hồi rõ ràng.
          </p>
          <p>
            Câu hỏi về điều khoản gửi tới{" "}
            <a className="text-primary hover:underline" href={`mailto:${restaurant.email}`}>
              {restaurant.email}
            </a>
            .
          </p>
          <p className="text-sm text-gray-3">
            Trang này là bản tóm tắt placeholder. Thay bằng điều khoản đã được tư
            vấn pháp lý trước khi vận hành chính thức nếu cần.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
