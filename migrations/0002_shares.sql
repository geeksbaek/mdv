create table if not exists shares (
  code text primary key,
  payload text not null,
  created_at timestamptz not null default now()
);
