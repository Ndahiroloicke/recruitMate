drop trigger if exists "create_default_team" on "public"."recruiters";

alter table "public"."teams" drop constraint "teams_name_check";

alter table "public"."teams" drop column "title";

alter table "public"."teams" add column "name" text;

alter table "public"."teams" add constraint "teams_name_check" CHECK ((length(name) <= 50)) not valid;

alter table "public"."teams" validate constraint "teams_name_check";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_default_team()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO public.teams (
            owner_id,
            team_id,
            is_default,
            name,
            description,
            logo
        ) VALUES (
            NEW.id,
            gen_random_uuid(),
            TRUE,
            NEW.first_name || ' s Team',
            'Your first team!',
            NEW.avatar
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

CREATE TRIGGER default_team AFTER INSERT OR UPDATE ON public.recruiters FOR EACH ROW EXECUTE FUNCTION create_default_team();


