-- Enable RLS
alter table "public"."invited_members" enable row level security;

-- Create policies for invited_members table
create policy "Enable insert for authenticated users only"
on "public"."invited_members"
as permissive
for insert
to authenticated
with check (true);

create policy "Enable read access for authenticated users"
on "public"."invited_members"
as permissive
for select
to authenticated
using (true);

create policy "Enable update for authenticated users"
on "public"."invited_members"
as permissive
for update
to authenticated
using (true)
with check (true);

create policy "Enable delete for authenticated users"
on "public"."invited_members"
as permissive
for delete
to authenticated
using (true);

-- Create policies for teams_members table if not exists
create policy "Enable insert for authenticated users only"
on "public"."teams_members"
as permissive
for insert
to authenticated
with check (true);

create policy "Enable read access for authenticated users"
on "public"."teams_members"
as permissive
for select
to authenticated
using (true);

create policy "Enable update for authenticated users"
on "public"."teams_members"
as permissive
for update
to authenticated
using (true)
with check (true);

create policy "Enable delete for authenticated users"
on "public"."teams_members"
as permissive
for delete
to authenticated
using (true); 