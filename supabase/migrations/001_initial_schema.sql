-- Spring Village — initial schema

create table if not exists cottages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  short_description text,
  capacity int not null default 2,
  bedrooms int not null default 1,
  bathrooms int not null default 1,
  price_per_night int not null,
  weekend_price int,
  amenities text[] default '{}',
  cover_image text,
  featured boolean default false,
  created_at timestamptz default now()
);

create table if not exists cottage_images (
  id uuid primary key default gen_random_uuid(),
  cottage_id uuid references cottages(id) on delete cascade,
  url text not null,
  alt text,
  sort_order int default 0
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  cottage_id uuid references cottages(id),
  guest_name text not null,
  email text not null,
  phone text not null,
  check_in date not null,
  check_out date not null,
  guests int not null default 2,
  status text not null default 'pending' check (status in ('pending','confirmed','cancelled')),
  total_price int,
  message text,
  created_at timestamptz default now()
);

create table if not exists blocked_dates (
  id uuid primary key default gen_random_uuid(),
  cottage_id uuid references cottages(id) on delete cascade,
  date date not null,
  reason text,
  unique(cottage_id, date)
);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  cottage_id uuid references cottages(id),
  booking_id uuid references bookings(id),
  author text not null,
  rating int not null check (rating between 1 and 5),
  body text not null,
  stay_type text,
  approved boolean default false,
  created_at timestamptz default now()
);

-- Seed cottages
insert into cottages (name, slug, short_description, capacity, bedrooms, bathrooms, price_per_night, weekend_price, amenities, featured)
values
  ('Сосновая', 'sosnovaya', 'Просторный коттедж в сосновом бору с баней', 8, 3, 2, 12000, 15000, array['Баня','Барбекю','Wi-Fi','Парковка'], true),
  ('Липовая', 'lipovaya', 'Уютный коттедж для пар с камином и джакузи', 4, 2, 1, 7500, 9500, array['Камин','Джакузи','Барбекю','Wi-Fi'], true),
  ('Дубовая', 'dubovaya', 'Большой семейный коттедж с бассейном', 12, 4, 3, 18000, 22000, array['Бассейн','Баня','Wi-Fi','Детская площадка'], true),
  ('Берёзовая', 'berezovaya', 'Светлый коттедж в берёзовой роще', 6, 3, 2, 10000, 12500, array['Баня','Барбекю','Wi-Fi'], false),
  ('Кедровая', 'kedrovaya', 'Премиум-коттедж с бассейном и кинотеатром', 10, 4, 3, 22000, 27000, array['Бассейн','Сауна','Кинотеатр','Wi-Fi'], false),
  ('Яблоневая', 'yablonevaya', 'Уютный коттедж с яблоневым садом', 4, 2, 1, 6500, 8000, array['Сад','Барбекю','Wi-Fi'], false);

-- Seed reviews
insert into reviews (author, rating, body, stay_type, approved)
values
  ('Анна Смирнова', 5, 'Провели здесь 5 дней с семьёй — дети в восторге! Баня просто шикарная.', 'Семейный отдых', true),
  ('Дмитрий Козлов', 5, 'Организовывали корпоратив на 15 человек. Всё прошло идеально.', 'Корпоратив', true),
  ('Мария и Алексей', 5, 'Брали на годовщину свадьбы. Атмосфера волшебная — камин, тихий лес.', 'Романтические выходные', true),
  ('Игорь Петров', 4, 'Зимой здесь особенно красиво — снег, тишина, протопленная баня.', 'Зимний отдых', true);
