alter table "public"."teams_permissions" drop constraint "teams_permissions_team_id_fkey";

alter table "public"."team_members" alter column "role" set default 'viewver'::text;

alter table "public"."teams_permissions" drop column "team_id";

alter table "public"."teams_permissions" alter column "id" set default gen_random_uuid();

CREATE UNIQUE INDEX teams_permissions_id_key ON public.teams_permissions USING btree (id);

alter table "public"."teams_permissions" add constraint "teams_permissions_id_key" UNIQUE using index "teams_permissions_id_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_default_team()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$DECLARE
    created_team_id UUID;
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO public.teams (
            owner_id,
            team_id,
            is_default,
            name,
            description,
            logo
        )
        VALUES (
            NEW.id,
            gen_random_uuid(),
            TRUE,
            NEW.first_name || ' s Team',
            'Your first team!',
            NEW.avatar
        )
        RETURNING team_id INTO created_team_id;

        INSERT INTO public.team_members (
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
            name = NEW.first_name || ' s Team',
            logo = NEW.avatar
        WHERE owner_id = NEW.id;
    END IF;

    RETURN NEW;
END;$function$
;


