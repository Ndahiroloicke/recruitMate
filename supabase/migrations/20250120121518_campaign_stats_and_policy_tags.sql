alter table "public"."campaigns" add column "tags" jsonb;

alter table "public"."candidates" drop column "recruiter_id";

alter table "public"."invited_members" drop column "team_id";

alter table "public"."teams" drop column "team_id" cascade;

alter table "public"."teams_candidates" drop column "teams_id";

alter table "public"."teams_candidates" add column "team_id" integer;

alter table "public"."teams_members" drop column "team_id";

alter table "public"."teams_members" add column "team_id" int8;

alter table "public"."teams_permissions" add column "team_id" int8;

CREATE UNIQUE INDEX teams_pkey ON public.teams USING btree (id);

alter table "public"."teams" add constraint "teams_pkey" PRIMARY KEY using index "teams_pkey";

alter table "public"."teams_candidates" add constraint "teams_candidates_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(id) not valid;

alter table "public"."teams_candidates" validate constraint "teams_candidates_team_id_fkey";

alter table "public"."teams_members" add constraint "teams_members_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(id) not valid;

alter table "public"."teams_members" validate constraint "teams_members_team_id_fkey";

alter table "public"."teams_permissions" add constraint "teams_permissions_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(id) not valid;

alter table "public"."teams_permissions" validate constraint "teams_permissions_team_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_default_team()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    created_team_id INT;
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO public.teams (
            owner_id,
            is_default,
            name,
            description,
            logo
        )
        VALUES (
            NEW.id,
            TRUE,
            NEW.first_name || '''s Team',
            'Your first team!',
            NEW.avatar
        )
        RETURNING id INTO created_team_id;

        INSERT INTO public.teams_members (
            team_id,
            role,
            permissions
        )
        VALUES (
            created_team_id,
            'owner',
            '{"key": "owner", "name": "Owner", "access": {"read": true, "view": true, "write": true, "delete": true}}'::jsonb
        );

    ELSIF TG_OP = 'UPDATE' THEN
        UPDATE public.teams
        SET
            name = NEW.first_name || '''s Team',
            logo = NEW.avatar
        WHERE owner_id = NEW.id;
    END IF;

    RETURN NEW;
END;
$function$;

create policy "Enable insert for authenticated users only"
on "public"."campaigns_stats"
as permissive
for insert
to authenticated
with check (true);
