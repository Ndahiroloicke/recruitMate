drop policy "Enable full access" on "public"."recruiters";
alter table "public"."campaigns" drop constraint "campaigns_recruiter_id_fkey";
alter table "public"."candidates" drop constraint "candidates_recruiter_id_fkey";
alter table "public"."campaigns" drop column "email_body";
alter table "public"."campaigns" drop column "email_subject";
alter table "public"."campaigns" drop column "end_date";
alter table "public"."campaigns" drop column "recruiter_id";
alter table "public"."campaigns" drop column "start_date";
alter table "public"."candidates" drop column "recruiter_id";
alter table "public"."candidates" add column "teams_id" bigint;
set check_function_bodies = off;
CREATE OR REPLACE FUNCTION public.create_default_team()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
    INSERT INTO public.teams (owner_id, team_id, is_default, title, description, logo)
    VALUES (
        NEW.id,
        gen_random_uuid(),
        TRUE,
        NEW.first_name || '''s Team',
        'Your first team!',
        NEW.avatar
    );

    RETURN NEW;
END;$function$;
create policy "Enable full access"
on "public"."recruiters"
as permissive
for all
to authenticated
using (true);
