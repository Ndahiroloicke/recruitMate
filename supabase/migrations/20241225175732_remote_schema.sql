grant delete on table "storage"."s3_multipart_uploads" to "postgres";
grant insert on table "storage"."s3_multipart_uploads" to "postgres";
grant references on table "storage"."s3_multipart_uploads" to "postgres";
grant select on table "storage"."s3_multipart_uploads" to "postgres";
grant trigger on table "storage"."s3_multipart_uploads" to "postgres";
grant truncate on table "storage"."s3_multipart_uploads" to "postgres";
grant update on table "storage"."s3_multipart_uploads" to "postgres";
grant delete on table "storage"."s3_multipart_uploads_parts" to "postgres";
grant insert on table "storage"."s3_multipart_uploads_parts" to "postgres";
grant references on table "storage"."s3_multipart_uploads_parts" to "postgres";
grant select on table "storage"."s3_multipart_uploads_parts" to "postgres";
grant trigger on table "storage"."s3_multipart_uploads_parts" to "postgres";
grant truncate on table "storage"."s3_multipart_uploads_parts" to "postgres";
grant update on table "storage"."s3_multipart_uploads_parts" to "postgres";
create policy "public_upload i5g8va_0"
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'resumes'::text));
create policy "public_upload i5g8va_1"
on "storage"."objects"
as permissive
for insert
to public
with check ((bucket_id = 'resumes'::text));
create policy "public_upload i5g8va_2"
on "storage"."objects"
as permissive
for update
to public
using ((bucket_id = 'resumes'::text));
create policy "public_upload i5g8va_3"
on "storage"."objects"
as permissive
for delete
to public
using ((bucket_id = 'resumes'::text));
