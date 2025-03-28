revoke delete on table "public"."teams_candidates" from "anon";

revoke insert on table "public"."teams_candidates" from "anon";

revoke references on table "public"."teams_candidates" from "anon";

revoke select on table "public"."teams_candidates" from "anon";

revoke trigger on table "public"."teams_candidates" from "anon";

revoke truncate on table "public"."teams_candidates" from "anon";

revoke update on table "public"."teams_candidates" from "anon";

revoke delete on table "public"."teams_candidates" from "authenticated";

revoke insert on table "public"."teams_candidates" from "authenticated";

revoke references on table "public"."teams_candidates" from "authenticated";

revoke select on table "public"."teams_candidates" from "authenticated";

revoke trigger on table "public"."teams_candidates" from "authenticated";

revoke truncate on table "public"."teams_candidates" from "authenticated";

revoke update on table "public"."teams_candidates" from "authenticated";

revoke delete on table "public"."teams_candidates" from "service_role";

revoke insert on table "public"."teams_candidates" from "service_role";

revoke references on table "public"."teams_candidates" from "service_role";

revoke select on table "public"."teams_candidates" from "service_role";

revoke trigger on table "public"."teams_candidates" from "service_role";

revoke truncate on table "public"."teams_candidates" from "service_role";

revoke update on table "public"."teams_candidates" from "service_role";

alter table "public"."teams_candidates" drop constraint "recruiters_candidates_candidate_id_fkey";

alter table "public"."teams_candidates" drop constraint "teams_candidates_team_id_fkey";

alter table "public"."teams_candidates" drop constraint "recruiters_candidates_pkey";

drop index if exists "public"."recruiters_candidates_pkey";

drop table "public"."teams_candidates";

CREATE SEQUENCE IF NOT EXISTS "public"."recruiters_candidates_id_seq";

create table "public"."teams_campaign" (
    "id" integer not null default nextval('recruiters_candidates_id_seq'::regclass),
    "campaign_id" bigint not null,
    "team_id" integer
);


alter table "public"."teams_campaign" enable row level security;

alter table "public"."candidates" alter column "email" set data type text using "email"::text;

alter table "public"."candidates" alter column "first_name" set data type text using "first_name"::text;

alter table "public"."candidates" alter column "last_name" set data type text using "last_name"::text;

alter table "public"."candidates" alter column "phone" set data type text using "phone"::text;

alter sequence "public"."recruiters_candidates_id_seq" owned by "public"."teams_campaign"."id";

CREATE UNIQUE INDEX candidates_id_key ON public.candidates USING btree (id);

CREATE UNIQUE INDEX recruiters_candidates_pkey ON public.teams_campaign USING btree (id);

alter table "public"."teams_campaign" add constraint "recruiters_candidates_pkey" PRIMARY KEY using index "recruiters_candidates_pkey";

alter table "public"."candidates" add constraint "candidates_id_key" UNIQUE using index "candidates_id_key";

alter table "public"."teams_campaign" add constraint "teams_candidates_campaign_id_fkey" FOREIGN KEY (campaign_id) REFERENCES campaigns(id) not valid;

alter table "public"."teams_campaign" validate constraint "teams_candidates_campaign_id_fkey";

alter table "public"."teams_campaign" add constraint "teams_candidates_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(id) not valid;

alter table "public"."teams_campaign" validate constraint "teams_candidates_team_id_fkey";

grant delete on table "public"."teams_campaign" to "anon";

grant insert on table "public"."teams_campaign" to "anon";

grant references on table "public"."teams_campaign" to "anon";

grant select on table "public"."teams_campaign" to "anon";

grant trigger on table "public"."teams_campaign" to "anon";

grant truncate on table "public"."teams_campaign" to "anon";

grant update on table "public"."teams_campaign" to "anon";

grant delete on table "public"."teams_campaign" to "authenticated";

grant insert on table "public"."teams_campaign" to "authenticated";

grant references on table "public"."teams_campaign" to "authenticated";

grant select on table "public"."teams_campaign" to "authenticated";

grant trigger on table "public"."teams_campaign" to "authenticated";

grant truncate on table "public"."teams_campaign" to "authenticated";

grant update on table "public"."teams_campaign" to "authenticated";

grant delete on table "public"."teams_campaign" to "service_role";

grant insert on table "public"."teams_campaign" to "service_role";

grant references on table "public"."teams_campaign" to "service_role";

grant select on table "public"."teams_campaign" to "service_role";

grant trigger on table "public"."teams_campaign" to "service_role";

grant truncate on table "public"."teams_campaign" to "service_role";

grant update on table "public"."teams_campaign" to "service_role";


