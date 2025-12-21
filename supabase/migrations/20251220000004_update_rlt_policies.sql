-- Policy to allow users to select their own cards
drop policy if exists "Users can view their own cards" on public.cards;
create policy "Users can view their own cards" 
on public.cards for select 
using ((select auth.uid()) = user_id);

-- Policy to allow users to insert their own cards
drop policy if exists "Users can insert their own cards" on public.cards;
create policy "Users can insert their own cards" 
on public.cards for insert 
with check ((select auth.uid()) = user_id);

-- Policy to allow users to update their own cards
drop policy if exists "Users can update their own cards" on public.cards;
create policy "Users can update their own cards" 
on public.cards for update 
using ((select auth.uid()) = user_id);

-- Policy to allow users to delete their own cards
drop policy if exists "Users can delete their own cards" on public.cards;
create policy "Users can delete their own cards" 
on public.cards for delete 
using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert their own review logs" on public.review_logs;
create policy "Users can insert their own review logs"
on public.review_logs for insert
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can view their own review logs" on public.review_logs;
create policy "Users can view their own review logs"
on public.review_logs for select
using ((select auth.uid()) = user_id);
