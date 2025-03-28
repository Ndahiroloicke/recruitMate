create policy "Enable read access for all users"
on "public"."teams"
as permissive
for select
to public
using (true);



