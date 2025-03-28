create table "public"."campaigns_stats" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "campaign_id" bigint,
    "unread" bigint default '0'::bigint,
    "replied" bigint default '0'::bigint,
    "awaiting_feedback" bigint default '0'::bigint
);


alter table "public"."campaigns_stats" enable row level security;

alter table "public"."campaigns" alter column "id" drop default;

alter table "public"."campaigns" alter column "id" set data type bigint using "id"::bigint;

CREATE UNIQUE INDEX campaigns_stats_pkey ON public.campaigns_stats USING btree (id);

alter table "public"."campaigns_stats" add constraint "campaigns_stats_pkey" PRIMARY KEY using index "campaigns_stats_pkey";

alter table "public"."campaigns_stats" add constraint "campaigns_stats_campaign_id_fkey" FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."campaigns_stats" validate constraint "campaigns_stats_campaign_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_default_campaign_stats()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
  INSERT INTO public.campaigns_stats (
    campaign_id,
    created_at,
    unread,
    replied,
    awaiting_feedback
  )
  VALUES (
    NEW.id,
    NOW(),
    0,
    0,
    0
  );

  RETURN NEW;
END;$function$
;

grant delete on table "public"."campaigns_stats" to "anon";

grant insert on table "public"."campaigns_stats" to "anon";

grant references on table "public"."campaigns_stats" to "anon";

grant select on table "public"."campaigns_stats" to "anon";

grant trigger on table "public"."campaigns_stats" to "anon";

grant truncate on table "public"."campaigns_stats" to "anon";

grant update on table "public"."campaigns_stats" to "anon";

grant delete on table "public"."campaigns_stats" to "authenticated";

grant insert on table "public"."campaigns_stats" to "authenticated";

grant references on table "public"."campaigns_stats" to "authenticated";

grant select on table "public"."campaigns_stats" to "authenticated";

grant trigger on table "public"."campaigns_stats" to "authenticated";

grant truncate on table "public"."campaigns_stats" to "authenticated";

grant update on table "public"."campaigns_stats" to "authenticated";

grant delete on table "public"."campaigns_stats" to "service_role";

grant insert on table "public"."campaigns_stats" to "service_role";

grant references on table "public"."campaigns_stats" to "service_role";

grant select on table "public"."campaigns_stats" to "service_role";

grant trigger on table "public"."campaigns_stats" to "service_role";

grant truncate on table "public"."campaigns_stats" to "service_role";

grant update on table "public"."campaigns_stats" to "service_role";

create policy "Enable read access for all users"
on "public"."campaigns_stats"
as permissive
for select
to public
using (true);


CREATE TRIGGER create_default_campaign_stats AFTER INSERT ON public.campaigns FOR EACH ROW EXECUTE FUNCTION create_default_campaign_stats();


