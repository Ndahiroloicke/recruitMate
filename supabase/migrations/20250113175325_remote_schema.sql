drop trigger if exists "default_team" on "public"."recruiters";
drop policy "Enable full access" on "public"."recruiters";
alter table "public"."team_members" drop constraint "team_members_team_id_fkey";
alter table "public"."teams" drop constraint "teams_name_check";
alter table "public"."team_members" drop constraint "team_members_pkey";
drop index if exists "public"."team_members_pkey";
create table "public"."teams_permissions" (
    "id" uuid not null,
    "team_id" uuid,
    "permissions" jsonb[] default ARRAY['{"key": "admin", "name": "Admin", "access": {"read": true, "view": true, "write": true, "delete": true}}'::jsonb]
);
alter table "public"."campaigns" add column "email_body" text;
alter table "public"."campaigns" add column "email_subject" character varying(255);
alter table "public"."campaigns" add column "end_date" date;
alter table "public"."campaigns" add column "recruiter_id" integer;
alter table "public"."campaigns" add column "start_date" date;
alter table "public"."candidates" drop column "teams_id";
alter table "public"."candidates" add column "recruiter_id" integer;
alter table "public"."team_members" add column "permissions" jsonb not null default '{"key": "viewver", "name": "Viewver", "access": {"read": false, "view": false, "write": false, "delete": false}}'::jsonb;
alter table "public"."team_members" disable row level security;
alter table "public"."teams" drop column "name";
alter table "public"."teams" add column "permissions_id" uuid;
alter table "public"."teams" add column "title" text;
alter table "public"."template_email" drop column "description";
alter table "public"."template_email" drop column "tags";
alter table "public"."template_email" drop column "title";
CREATE UNIQUE INDEX team_members_test_pkey ON public.team_members USING btree (id);
CREATE UNIQUE INDEX team_permissions_pkey ON public.teams_permissions USING btree (id);
alter table "public"."team_members" add constraint "team_members_test_pkey" PRIMARY KEY using index "team_members_test_pkey";
alter table "public"."teams_permissions" add constraint "team_permissions_pkey" PRIMARY KEY using index "team_permissions_pkey";
alter table "public"."campaigns" add constraint "campaigns_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiters(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;
alter table "public"."campaigns" validate constraint "campaigns_recruiter_id_fkey";
alter table "public"."candidates" add constraint "candidates_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiters(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;
alter table "public"."candidates" validate constraint "candidates_recruiter_id_fkey";
alter table "public"."team_members" add constraint "team_members_test_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(team_id) not valid;
alter table "public"."team_members" validate constraint "team_members_test_team_id_fkey";
alter table "public"."teams" add constraint "teams_permissions_id_fkey" FOREIGN KEY (permissions_id) REFERENCES teams_permissions(id) not valid;
alter table "public"."teams" validate constraint "teams_permissions_id_fkey";
alter table "public"."teams_permissions" add constraint "teams_permissions_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(team_id) not valid;
alter table "public"."teams_permissions" validate constraint "teams_permissions_team_id_fkey";
alter table "public"."teams" add constraint "teams_name_check" CHECK ((length(title) <= 50)) not valid;
alter table "public"."teams" validate constraint "teams_name_check";
set check_function_bodies = off;
CREATE OR REPLACE FUNCTION public.create_default_team()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$DECLARE
    generated_team_id uuid;
BEGIN
    INSERT INTO public.teams (owner_id, team_id, is_default, title, description)
    VALUES (
        NEW.id,
        gen_random_uuid(),
        TRUE,
        NEW.email,
        'Your first team!'
    )
    RETURNING team_id INTO generated_team_id;

    INSERT INTO public.team_members (team_id, role, permissions)
    VALUES (
        generated_team_id,
        'owner',
        '{"key": "owner", "name": "Owner", "access": {"read": true, "view": true, "write": true, "delete": true}}'::jsonb
    );

    INSERT INTO public.teams_permissions (team_id)
    VALUES (
        generated_team_id
    );

    RETURN NEW;
END;$function$;
grant delete on table "public"."teams_permissions" to "anon";
grant insert on table "public"."teams_permissions" to "anon";
grant references on table "public"."teams_permissions" to "anon";
grant select on table "public"."teams_permissions" to "anon";
grant trigger on table "public"."teams_permissions" to "anon";
grant truncate on table "public"."teams_permissions" to "anon";
grant update on table "public"."teams_permissions" to "anon";
grant delete on table "public"."teams_permissions" to "authenticated";
grant insert on table "public"."teams_permissions" to "authenticated";
grant references on table "public"."teams_permissions" to "authenticated";
grant select on table "public"."teams_permissions" to "authenticated";
grant trigger on table "public"."teams_permissions" to "authenticated";
grant truncate on table "public"."teams_permissions" to "authenticated";
grant update on table "public"."teams_permissions" to "authenticated";
grant delete on table "public"."teams_permissions" to "service_role";
grant insert on table "public"."teams_permissions" to "service_role";
grant references on table "public"."teams_permissions" to "service_role";
grant select on table "public"."teams_permissions" to "service_role";
grant trigger on table "public"."teams_permissions" to "service_role";
grant truncate on table "public"."teams_permissions" to "service_role";
grant update on table "public"."teams_permissions" to "service_role";
create policy "Enable full access"
on "public"."recruiters"
as permissive
for all
to public
using (true);
CREATE TRIGGER create_default_team AFTER INSERT ON public.recruiters FOR EACH ROW EXECUTE FUNCTION create_default_team();
