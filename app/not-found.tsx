import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <PageShell>
      <section className="container-site flex flex-col items-start gap-6 py-24 md:py-32">
        <p className="font-script text-lg text-primary">404</p>
        <h1 className="text-4xl font-bold text-gray-1 md:text-5xl">
          Không tìm thấy trang
        </h1>
        <p className="max-w-lg text-base leading-6 text-gray-2">
          Trang bạn tìm không tồn tại hoặc có thể đã được chuyển đi.
        </p>
        <div className="flex flex-wrap gap-2.5">
          <Button href="/">Về trang chủ</Button>
          <Button href="/menu" variant="outline">
            Xem thực đơn
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
