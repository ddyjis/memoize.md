create table if not exists public.review_logs (
    id uuid not null default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    card_id uuid not null references public.cards(id) on delete cascade,
    rating integer not null check (rating >= 1 and rating <= 4),
    state integer not null,
    due_date timestamp with time zone not null,
    stability double precision not null,
    difficulty double precision not null,
    elapsed_days integer not null,
    scheduled_days integer not null,
    review_timeline timestamp with time zone not null default now(),
    created_at timestamp with time zone not null default now(),
    constraint review_logs_pkey primary key (id)
);

alter table public.review_logs enable row level security;

create policy "Users can insert their own review logs"
    on public.review_logs for insert
    with check (auth.uid() = user_id);

create policy "Users can view their own review logs"
    on public.review_logs for select
    using (auth.uid() = user_id);
