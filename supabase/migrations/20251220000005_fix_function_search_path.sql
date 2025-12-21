-- Fix security issue: set explicit search_path for security definer functions
-- This prevents search path manipulation attacks

-- Fix update_updated_at_column function
create or replace function update_updated_at_column()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

-- Fix sync_cards function
create or replace function sync_cards(cards_data jsonb)
returns void
language sql
security definer
set search_path = ''
as $$
  insert into public.cards (
    user_id, source_filepath, card_anchor, card_type, 
    front, back, tags, is_suspended
  )
  select
    (x.user_id)::uuid,
    x.source_filepath,
    x.card_anchor,
    (x.card_type)::public.card_type_enum,
    x.front,
    x.back,
    x.tags,
    (x.is_suspended)::boolean
  from jsonb_to_recordset(cards_data) as x(
    user_id text,
    source_filepath text,
    card_anchor text,
    card_type text,
    front text,
    back text,
    tags text[],
    is_suspended boolean
  )
  on conflict (user_id, source_filepath, card_anchor, card_type)
  do update set
    front = excluded.front,
    back = excluded.back,
    tags = excluded.tags,
    is_suspended = excluded.is_suspended;
$$;

