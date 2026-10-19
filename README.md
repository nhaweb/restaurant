# PML Food

Website nhà hàng **PML Food** (TP. Hồ Chí Minh) — Next.js App Router, Sanity CMS, Supabase (ops), PayOS thanh toán.

## Stack

| Layer | Tech |
| --- | --- |
| Framework | Next.js 16, React 19, TypeScript, Tailwind CSS 4 |
| CMS | Sanity (`/studio`) |
| Ops DB | Supabase (đặt bàn, liên hệ, newsletter, đơn hàng) |
| Email | Resend (hoặc Formspree) |
| Payments | PayOS |
| Deploy | **Vercel** = test/staging · **Fly.io** = production |

## Trang chính

- `/` — Trang chủ
- `/menu` — Thực đơn
- `/reservation` — Đặt bàn
- `/about`, `/gallery`, `/blog`, `/contact`
- `/checkout` — Thanh toán PayOS
- `/studio` — Sanity Studio
- `/privacy`, `/terms`

## Yêu cầu

- Node.js 20+ (khuyến nghị 22 LTS)
- npm

## Chạy local

```bash
npm install
Copy-Item .env.example .env.local
# Điền biến môi trường trong .env.local
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Mô tả |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Build production |
| `npm start` | Chạy build local |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run studio` | Sanity Studio standalone |
| `npm run deploy:vercel` | Deploy test lên Vercel |
| `npm run deploy:fly` | Deploy production lên Fly.io |

## Biến môi trường

| File | Mục đích |
| --- | --- |
| `.env.example` | Template local |
| `.env.local` | Secrets local (gitignore) |
| `.env.vercel.example` | Import vào Vercel (test) |
| `.env.fly.example` | Secrets Fly (production) |

Biến quan trọng:

| Key | Ghi chú |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical / OG / sitemap |
| `NEXT_PUBLIC_SANITY_*` | CMS public config |
| `SANITY_API_READ_TOKEN` | Token đọc (draft/private) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server only** — bypass RLS |
| `RESEND_API_KEY` / `CONTACT_*` | Email |
| `PAYOS_*` | Thanh toán |

> Không bao giờ expose `SUPABASE_SERVICE_ROLE_KEY` hay PayOS secret ra client (`NEXT_PUBLIC_`).

### Supabase migrations

SQL nằm trong `supabase/migrations/`. Chạy trên Supabase SQL Editor (hoặc CLI) trước khi bật form/order trên môi trường tương ứng.

## Deploy

### Test — Vercel

1. `npm i -g vercel` → `vercel login` → `vercel link`
2. Import env từ `.env.vercel.example` (Dashboard → Environment Variables)
3. Cập nhật `NEXT_PUBLIC_SITE_URL` = URL Vercel thật
4. `npm run deploy:vercel`

Config: `vercel.json` (region `sin1`).

### Production — Fly.io

1. `fly auth login`
2. `fly apps create pml-food` (nếu chưa có)
3. Sửa `NEXT_PUBLIC_*` trong `fly.toml` → `[build.args]` (bắt buộc lúc Docker build)
4. Set secrets server-only từ `.env.fly.example`:

```bash
fly secrets set SANITY_API_READ_TOKEN=... SUPABASE_SERVICE_ROLE_KEY=... RESEND_API_KEY=... CONTACT_TO_EMAIL=... PAYOS_CLIENT_ID=... PAYOS_API_KEY=... PAYOS_CHECKSUM_KEY=...
```

5. `npm run deploy:fly`

Config: `fly.toml` + `Dockerfile` (`output: "standalone"` trong `next.config.ts`). Region mặc định: `sin` (Singapore).

| | Vercel (test) | Fly.io (production) |
| --- | --- | --- |
| URL | `*.vercel.app` | `pml-food.fly.dev` / custom domain |
| PayOS | Sandbox / test keys | Live keys |
| Env | Dashboard import | `fly.toml` build args + `fly secrets` |

## Cấu trúc thư mục (rút gọn)

```
app/                 # Routes (App Router)
components/          # UI sections & layout
data/                # Fallback content & restaurant info
lib/                 # Sanity, Supabase, SEO, helpers
sanity/              # Studio schema & config
supabase/migrations/ # SQL schema
public/              # Static assets
```

## Ghi chú

- Không cấu hình Sanity/Supabase → site vẫn chạy với content fallback trong `data/`.
- PayOS webhook: `POST /api/payos/webhook` — trỏ URL production (Fly) trong PayOS dashboard.
- Cache Components (Next.js 16) đang bật; Sanity fetch dùng `"use cache"`.

## License

Private — PML Food.
