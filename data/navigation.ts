export type NavItem = {
  label: string;
  href: string;
};

export const primaryNav: NavItem[] = [
  { label: "Trang chủ", href: "/" },
  { label: "Thực đơn", href: "/menu" },
  { label: "Giới thiệu", href: "/about" },
  { label: "Thư viện ảnh", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Liên hệ", href: "/contact" },
];

export const footerLinks: NavItem[] = [
  { label: "Về chúng tôi", href: "/about" },
  { label: "Liên hệ", href: "/contact" },
  { label: "Thực đơn", href: "/menu" },
  { label: "Đặt món online", href: "/menu#full-menu" },
  { label: "Đội ngũ", href: "/about#team" },
  { label: "Đặt bàn", href: "/reservation" },
];

export const legalLinks: NavItem[] = [
  { label: "Chính sách bảo mật", href: "/privacy" },
  { label: "Điều khoản sử dụng", href: "/terms" },
  { label: "Đối tác", href: "/contact" },
];
