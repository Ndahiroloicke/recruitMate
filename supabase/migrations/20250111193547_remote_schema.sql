create policy "update_avatars_storage 1oj01fe_0"
on "storage"."objects"
as permissive
for select
to anon
using ((bucket_id = 'avatars'::text));
create policy "update_avatars_storage 1oj01fe_1"
on "storage"."objects"
as permissive
for insert
to anon
with check ((bucket_id = 'avatars'::text));
create policy "update_avatars_storage 1oj01fe_2"
on "storage"."objects"
as permissive
for update
to anon
using ((bucket_id = 'avatars'::text));
create policy "update_avatars_storage 1oj01fe_3"
on "storage"."objects"
as permissive
for delete
to anon
using ((bucket_id = 'avatars'::text));
