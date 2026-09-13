-- Documents synced across a signed-in user's devices ("My documents").
-- Deletions are tombstones so other devices learn about them on their next sync.
create table if not exists documents (
  id text primary key,
  user_id text not null,
  name text not null,
  markdown text not null default '',
  updated_at bigint not null,
  deleted boolean not null default false
);
create index if not exists documents_user_id_idx on documents (user_id, updated_at desc);
