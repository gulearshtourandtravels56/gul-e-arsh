-- COMPANY & SITE CONFIG
create table company (
  id int generated always as identity primary key,
  name text not null,
  tagline text,
  description text,
  mission text,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create table company_stats (
  id int generated always as identity primary key,
  company_id int references company(id) on delete cascade,
  value text,
  label text
);

create table site_images (
  id int generated always as identity primary key,
  key text unique,
  url text
);

-- CONTACT
create table contact (
  id int generated always as identity primary key,
  phone text,
  email text,
  address text,
  address_link text
);

create table social_links (
  id int generated always as identity primary key,
  contact_id int references contact(id) on delete cascade,
  platform text,
  url text
);


-- SERVICES
create table services (
  id int generated always as identity primary key,
  title text,
  description text,
  icon text
);

create table why_choose_us (
  id int generated always as identity primary key,
  title text,
  description text,
  icon text
);

-- TESTIMONIALS
create table testimonials (
  id int generated always as identity primary key,
  name text,
  review text,
  location text,
  rating int check (rating between 1 and 5)
);

-- PACKAGES
create table packages (
  id int generated always as identity primary key,
  title text not null,
  location text,
  duration text,
  price text,
  price_value int,
  description text,
  short_description text,
  image text,
  category text,
  created_at timestamp default now()
);

create table package_highlights (
  id int generated always as identity primary key,
  package_id int references packages(id) on delete cascade,
  highlight text
);

create table package_inclusions (
  id int generated always as identity primary key,
  package_id int references packages(id) on delete cascade,
  inclusion text
);

create table package_itinerary (
  id int generated always as identity primary key,
  package_id int references packages(id) on delete cascade,
  day int,
  title text,
  details text
);

-- LOCATIONS
create table locations (
  id int generated always as identity primary key,
  name text not null,
  subtitle text,
  altitude text,
  distance_from_srinagar text,
  description text,
  long_description text,
  best_time text,
  image text
);

create table location_highlights (
  id int generated always as identity primary key,
  location_id int references locations(id) on delete cascade,
  highlight text
);

create table location_best_for (
  id int generated always as identity primary key,
  location_id int references locations(id) on delete cascade,
  tag text
);

create table location_what_to_see (
  id int generated always as identity primary key,
  location_id int references locations(id) on delete cascade,
  title text,
  image text,
  description text
);

-- LOCATION ↔ PACKAGES (MANY-TO-MANY)
create table location_packages (
  id int generated always as identity primary key,
  location_id int references locations(id) on delete cascade,
  package_id int references packages(id) on delete cascade
);

-- GALLERY
create table gallery (
  id int generated always as identity primary key,
  title text,
  location text
);

-- FAQS
create table faqs (
  id int generated always as identity primary key,
  question text,
  answer text
);

-- TEAM
create table team (
  id int generated always as identity primary key,
  name text,
  role text,
  bio text,
  photo text
);

create table team_socials (
  id int generated always as identity primary key,
  team_id int references team(id) on delete cascade,
  platform text,
  url text
);

-- INDEXES (PERFORMANCE)
create index idx_package_id on package_highlights(package_id);
create index idx_location_id on location_highlights(location_id);
create index idx_location_package on location_packages(location_id, package_id);