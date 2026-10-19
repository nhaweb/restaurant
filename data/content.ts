import { assets } from "@/lib/assets";

export const teamMembers = [
  { name: "Nguyễn Văn Minh", role: "Chủ sở hữu", image: assets.teamMember },
  { name: "Trần Thị Lan", role: "Đầu bếp", image: assets.teamMember },
  { name: "Lê Hoàng Nam", role: "Người sáng lập", image: assets.teamMember },
  { name: "Phạm Thu Hà", role: "Chuyên gia ẩm thực", image: assets.teamMember },
] as const;

export const features = [
  {
    title: "Giao hàng nhanh",
    description: "Món ăn được chuẩn bị kỹ lưỡng và phục vụ kịp thời.",
    icon: assets.truck,
  },
  {
    title: "Phục vụ 24/7",
    description: "Hỗ trợ và đặt món bất cứ khi nào bạn cần.",
    icon: assets.timer,
  },
  {
    title: "Thực phẩm tươi",
    description: "Nguyên liệu theo mùa, chế biến mỗi ngày trong bếp.",
    icon: assets.hamburger,
  },
  {
    title: "Chất lượng ổn định",
    description: "Tiêu chuẩn nhất quán trên từng món chúng tôi phục vụ.",
    icon: assets.factory,
  },
] as const;

export const testimonials = [
  {
    id: "nguyen-thanh-tung",
    name: "Nguyễn Thanh Tùng",
    role: "Khách hàng",
    quote:
      "PML Food cân bằng độ tươi ngon và hương vị rất tốt. Cá hồi chín vừa phải, không gian yên tĩnh và thân thiện.",
    avatar: assets.reviewAvatar,
    highlight: {
      title: "Đặt ngay",
      price: 10,
      description:
        "Món yêu thích từ bếp chúng tôi — hương vị rõ ràng, khẩu phần vừa đủ, nguyên liệu cảm nhận được ngay.",
      image: assets.reviewFood,
      rating: 5,
    },
  },
  {
    id: "tran-mai-anh",
    name: "Trần Mai Anh",
    role: "Khách hàng",
    quote:
      "Chúng tôi đến vì salad và ở lại vì món tráng miệng. Phục vụ thân thiện, món ăn luôn ổn định mỗi lần ghé.",
    avatar: assets.reviewAvatar,
    highlight: {
      title: "Món đặc biệt",
      price: 18,
      description:
        "Rau theo mùa và sốt nhà làm giúp ăn lành mạnh trở nên dễ dàng hơn.",
      image: assets.aboutBottom,
      rating: 5,
    },
  },
  {
    id: "le-quoc-bao",
    name: "Lê Quốc Bảo",
    role: "Khách hàng",
    quote:
      "Lý tưởng cho bữa trưa thư giãn. Món pasta ấm áp dễ ăn, đặt bàn cũng rất thuận tiện.",
    avatar: assets.reviewAvatar,
    highlight: {
      title: "Đĩa pasta",
      price: 26,
      description:
        "Pasta nhà làm với sốt chất lượng — lựa chọn tin cậy cho trưa hoặc tối.",
      image: assets.category,
      rating: 5,
    },
  },
] as const;

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateLabel: string;
  comments: number;
  image: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "chocolate-truffle-cake-with-honey",
    title: "Bánh truffle socola vị mật ong",
    excerpt:
      "Đội ngũ bánh ngọt cân bằng vị socola đậm với lớp mật ong nhẹ, tạo món tráng miệng ngon mà không nặng bụng.",
    date: "2022-01-02",
    dateLabel: "02 Th1 2022",
    comments: 3,
    image: assets.blog,
    content: [
      "Tại PML Food, món tráng miệng được chăm chút như các món mặn. Bánh truffle socola xếp lớp mỏng để mỗi miếng vẫn mềm và cân bằng.",
      "Vị mật ong nhẹ nâng hương cacao thay vì át đi. Chúng tôi phủ lớp bóng mỏng và dùng hơi mát để giữ kết cấu sạch sẽ.",
      "Thưởng thức cùng espresso hoặc trà thảo mộc sau bữa trưa, hoặc chia sẻ như món kỷ niệm đơn giản khi dùng bữa cùng bạn bè.",
    ],
  },
  {
    slug: "building-a-balanced-lunch-plate",
    title: "Xây dựng đĩa ăn trưa cân bằng",
    excerpt:
      "Cách chúng tôi sắp xếp bát và đĩa ăn trưa — đạm, rau xanh và sốt tươi giúp năng lượng ổn định cả buổi chiều.",
    date: "2022-02-14",
    dateLabel: "14 Th2 2022",
    comments: 5,
    image: assets.aboutBottom,
    content: [
      "Bữa trưa cân bằng không cần phức tạp. Chúng tôi bắt đầu với nguồn đạm rõ ràng, thêm rau theo mùa và kết thúc bằng sốt chua nhẹ.",
      "Ngũ cốc nguyên hạt hoặc củ nướng giữ no lâu, trong khi thảo mộc giữ hương vị sống động. Khách có thể yêu cầu điều chỉnh nhẹ hoặc đậm hơn.",
      "Nếu bạn đang vội, salad trưa và món nướng của chúng tôi được thiết kế để no bụng mà không làm chậm nhịp ngày.",
    ],
  },
  {
    slug: "why-fresh-ingredients-matter",
    title: "Vì sao nguyên liệu tươi quan trọng",
    excerpt:
      "Từ chuẩn bị buổi sáng đến phục vụ tối, độ tươi là nền tảng nhịp bếp và hương vị của PML Food.",
    date: "2022-03-08",
    dateLabel: "08 Th3 2022",
    comments: 2,
    image: assets.whyMain,
    content: [
      "Rau củ tươi thay đổi cách món ăn có vị và cảm giác sau khi dùng. Đội ngũ kiểm tra hàng mỗi ngày và lên thực đơn theo những gì đẹp nhất.",
      "Thảo mộc cắt gần giờ phục vụ, rau xanh rửa theo mẻ nhỏ, và đạm được chuẩn bị theo yêu cầu khi có thể.",
      "Nhờ kỷ luật đó, những món quen thuộc vẫn luôn tươi mới — nguyên liệu tốt cần ít che đậy hơn và nhiều sự chăm chút hơn.",
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export const galleryImages = [
  ...assets.ig.map((src, index) => ({
    id: `gallery-${index + 1}`,
    src,
    alt: `Ảnh thư viện PML Food ${index + 1}`,
  })),
  {
    id: "gallery-7",
    src: assets.footerFood,
    alt: "Món ăn trình bày của PML Food",
  },
  {
    id: "gallery-8",
    src: assets.reviewFood,
    alt: "Món pasta từ PML Food",
  },
  {
    id: "gallery-9",
    src: assets.heroBowl,
    alt: "Tô salad tươi",
  },
];

export const aboutCopy = {
  eyebrow: "Về chúng tôi",
  title: "Ẩm thực là phần quan trọng của chế độ ăn cân bằng",
  body: "PML Food tập trung vào chế biến tươi, đĩa ăn cân bằng và không gian yên ấm. Từ sáng đến tối, bếp chúng tôi hướng tới hương vị đáng tin — gia vị vừa phải, rau theo mùa và món ăn vừa no vừa nhẹ.",
};

export const whyChooseCopy = {
  eyebrow: "Vì sao chọn chúng tôi",
  title: "Điều gì khiến chúng tôi khác biệt?",
  body: "Khách chọn PML Food vì chất lượng ổn định, phục vụ tận tâm và thực đơn dựa trên độ tươi. Dù ghé ăn trưa, thưởng thức món ngọt hay đặt bàn buổi tối, trải nghiệm luôn rõ ràng, thân thiện và đáng tin cậy.",
};
