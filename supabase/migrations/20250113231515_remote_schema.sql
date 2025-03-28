drop trigger if exists "default_team" on "public"."recruiters";

drop policy "Enable read access for all users" on "public"."teams";

alter table "public"."teams" drop constraint "teams_name_check";

alter table "public"."teams" drop column "name";

alter table "public"."teams" add column "title" text;

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
END;$function$
;

CREATE TRIGGER create_default_team AFTER INSERT ON public.recruiters FOR EACH ROW EXECUTE FUNCTION create_default_team();


