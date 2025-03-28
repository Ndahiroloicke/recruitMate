drop policy "Enable full access" on "public"."recruiters";

create policy "Enable delete for users based on user_id"
on "public"."recruiters"
as permissive
for delete
to authenticated
using ((( SELECT auth.uid() AS uid) = auth_id));


create policy "Enable insert for authenticated users only"
on "public"."recruiters"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."recruiters"
as permissive
for select
to authenticated
using (true);


create policy "Policy with table joins"
on "public"."recruiters"
as permissive
for update
to authenticated
using ((( SELECT auth.uid() AS uid) = auth_id));



