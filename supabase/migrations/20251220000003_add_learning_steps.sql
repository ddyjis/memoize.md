alter table public.cards
add column if not exists learning_steps integer not null default 0;

alter table public.review_logs
add column if not exists learning_steps integer not null default 0;
