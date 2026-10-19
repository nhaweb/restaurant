-- Shop orders + PayOS payment tracking
-- RLS enabled with no public policies — access via service role only.

create type public.order_status as enum (
  'pending',
  'awaiting_payment',
  'paid',
  'cancelled',
  'failed'
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_code bigint not null unique,
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  amount integer not null check (amount > 0),
  currency text not null default 'VND',
  status public.order_status not null default 'pending',
  payos_payment_link_id text,
  payos_checkout_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index orders_status_idx on public.orders (status);
create index orders_email_idx on public.orders (customer_email);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id text not null,
  product_name text not null,
  unit_price integer not null check (unit_price >= 0),
  quantity integer not null check (quantity >= 1)
);

create index order_items_order_id_idx on public.order_items (order_id);

create or replace function public.set_orders_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger orders_set_updated_at
before update on public.orders
for each row
execute function public.set_orders_updated_at();

alter table public.orders enable row level security;
alter table public.order_items enable row level security;
