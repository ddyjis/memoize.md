-- Function to sync cards atomically
create or replace function sync_cards(cards_data jsonb)
returns void
language sql
security definer
as $$
  insert into cards (
    user_id, source_filepath, card_anchor, card_type, 
    front, back, is_suspended
  )
  select
    (x.user_id)::uuid,
    x.source_filepath,
    x.card_anchor,
    (x.card_type)::card_type_enum,
    x.front,
    x.back,
    (x.is_suspended)::boolean
  from jsonb_to_recordset(cards_data) as x(
    user_id text,
    source_filepath text,
    card_anchor text,
    card_type text,
    front text,
    back text,
    is_suspended boolean
  )
  on conflict (user_id, source_filepath, card_anchor, card_type)
  do update set
    front = excluded.front,
    back = excluded.back,
    is_suspended = excluded.is_suspended;
$$;
