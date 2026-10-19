-- Optional pre-ordered dishes attached to a table reservation.
alter table public.reservations
  add column if not exists pre_order jsonb not null default '[]'::jsonb;

comment on column public.reservations.pre_order is
  'Array of { id, slug, name, price, quantity } selected before dining; pay at restaurant.';
