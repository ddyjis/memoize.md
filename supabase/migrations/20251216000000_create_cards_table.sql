-- Enable necessary extensions
create extension if not exists "pgcrypto";

-- Create custom types
create type card_type_enum as enum ('basic', 'reverse', 'cloze');


-- Create the cards table
create table cards (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  source_filepath text not null,
  card_anchor text not null,
  card_type card_type_enum not null,
  front text not null,
  back text not null,
  state smallint default 0 not null check (state between 0 and 3), -- 0=New, 1=Learning, 2=Review, 3=Relearning
  stability float,
  difficulty float,
  due_date timestamptz,
  last_review timestamptz,
  is_suspended boolean default false not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,

  -- Unique constraint for card identity
  constraint cards_identity_unique unique (user_id, source_filepath, card_anchor, card_type)
);

-- Enable RLS
alter table cards enable row level security;

-- Create RLS policies
-- Policy to allow users to select their own cards
create policy "Users can view their own cards" 
on cards for select 
using (auth.uid() = user_id);

-- Policy to allow users to insert their own cards
create policy "Users can insert their own cards" 
on cards for insert 
with check (auth.uid() = user_id);

-- Policy to allow users to update their own cards
create policy "Users can update their own cards" 
on cards for update 
using (auth.uid() = user_id);

-- Policy to allow users to delete their own cards
create policy "Users can delete their own cards" 
on cards for delete 
using (auth.uid() = user_id);

-- Function to automatically update updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language 'plpgsql';

create trigger update_cards_updated_at
before update on cards
for each row
execute procedure update_updated_at_column();
