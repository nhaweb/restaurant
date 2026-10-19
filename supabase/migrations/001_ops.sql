-- Restaurant ops tables: reservations, contact, newsletter
-- RLS enabled with no public policies — access via service role only.

create extension if not exists "pgcrypto";

create type public.reservation_status as enum ('confirmed', 'cancelled');

create table public.reservations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  date date not null,
  time text not null,
  guests integer not null check (guests >= 1 and guests <= 20),
  notes text,
  status public.reservation_status not null default 'confirmed',
  created_at timestamptz not null default now()
);

create index reservations_date_idx on public.reservations (date);
create index reservations_email_idx on public.reservations (email);

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.reservations enable row level security;
alter table public.contact_messages enable row level security;
alter table public.newsletter_subscribers enable row level security;

-- No policies for anon/authenticated: only service role bypasses RLS.
