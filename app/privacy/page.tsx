import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { restaurant } from "@/data/restaurant";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Chính sách bảo mật",
  description: `Chính sách bảo mật của ${restaurant.name}.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <PageShell>
      <PageHero
        title="Chính sách bảo mật"
        description={`Cách ${restaurant.name} xử lý thông tin gửi qua website.`}
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Chính sách bảo mật" },
        ]}
      />
      <section className="pb-16 md:pb-24">
        <div className="container-site prose-restaurant max-w-3xl space-y-5 text-base leading-7 text-gray-2">
          <p>
            Website có thể thu thập thông tin liên hệ bạn tự nguyện gửi qua form
            (họ tên, email, số điện thoại, nội dung) để phản hồi yêu cầu hoặc đặt bàn.
          </p>
          <p>
            Form chỉ được xử lý khi dịch vụ gửi email được cấu hình. Nếu chưa cấu
            hình, dữ liệu không được lưu hoặc gửi email.
          </p>
          <p>
            Chúng tôi không bán thông tin cá nhân. Câu hỏi về chính sách gửi email{" "}
            <a className="text-primary hover:underline" href={`mailto:${restaurant.email}`}>
              {restaurant.email}
            </a>
            .
          </p>
          <p className="text-sm text-gray-3">
            Trang này là bản tóm tắt placeholder cho website {restaurant.name}.
            Thay bằng văn bản đã được tư vấn pháp lý trước khi ra mắt chính thức nếu
            cần.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
