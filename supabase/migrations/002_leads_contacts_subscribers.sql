-- Spring Village — lead capture, contact form, newsletter

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  message text,
  source text default 'website',
  created_at timestamptz default now()
);

create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz default now()
);

create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz default now()
);

-- Row-level security (anon can insert, only service role can read)
alter table leads enable row level security;
alter table contacts enable row level security;
alter table subscribers enable row level security;

create policy "anon insert leads" on leads for insert to anon with check (true);
create policy "anon insert contacts" on contacts for insert to anon with check (true);
create policy "anon insert subscribers" on subscribers for insert to anon with check (true);
