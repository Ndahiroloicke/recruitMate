alter table "public"."teams" drop constraint "teams_name_check";
alter table "public"."teams" drop column "name";
alter table "public"."teams" add column "is_default" boolean;
alter table "public"."teams" add column "owner_id" integer;
alter table "public"."teams" add column "title" text;
alter table "public"."teams" alter column "team_id" set default gen_random_uuid();
alter table "public"."teams" add constraint "teams_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES recruiters(id) not valid;
alter table "public"."teams" validate constraint "teams_owner_id_fkey";
alter table "public"."teams" add constraint "teams_name_check" CHECK ((length(title) <= 50)) not valid;
alter table "public"."teams" validate constraint "teams_name_check";
set check_function_bodies = off;
CREATE OR REPLACE FUNCTION public.create_default_team()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
    INSERT INTO public.teams (owner_id, team_id, is_default, title, description)
    VALUES (
        NEW.id,
        gen_random_uuid(),
        TRUE,
        NEW.email,
        'Your first team!'
    );

    RETURN NEW;
end;$function$;
CREATE TRIGGER create_default_team AFTER INSERT ON public.recruiters FOR EACH ROW EXECUTE FUNCTION create_default_team();
