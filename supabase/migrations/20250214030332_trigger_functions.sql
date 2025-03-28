alter table
  "public"."campaigns"
add column if not exists "team_id" bigint;

alter table
  "public"."campaigns"
drop constraint if exists "campaigns_team_id_fkey";

alter table
  "public"."campaigns"
add
  constraint "campaigns_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(id) not valid;

alter table
  "public"."campaigns" validate constraint "campaigns_team_id_fkey";

set
  check_function_bodies = off;

CREATE
OR REPLACE FUNCTION public.insert_into_teams_campaign() RETURNS trigger LANGUAGE plpgsql AS $function$ BEGIN
INSERT INTO
  public.teams_campaign (campaign_id, team_id)
VALUES
  (NEW.id, NEW.team_id);

RETURN NEW;

END;

$function$;

CREATE
OR REPLACE FUNCTION public.insert_into_teams_permissions() RETURNS trigger LANGUAGE plpgsql AS $function$ BEGIN
INSERT INTO
  public.teams_permissions (team_id)
VALUES
  (NEW.id);

RETURN NEW;

END;

$function$;

drop policy if exists "Enable delete for users based on user_id" on "public"."teams_campaign";

create policy "Enable delete for users based on user_id" on "public"."teams_campaign" as permissive for delete to authenticated using (true);

drop policy if exists "Enable insert for authenticated users only" on "public"."teams_campaign";

create policy "Enable insert for authenticated users only" on "public"."teams_campaign" as permissive for
insert
  to authenticated with check (true);

DROP TRIGGER IF EXISTS after_campaign_insert ON public.campaigns;

CREATE TRIGGER after_campaign_insert
AFTER
INSERT
  ON public.campaigns FOR EACH ROW EXECUTE FUNCTION insert_into_teams_campaign();