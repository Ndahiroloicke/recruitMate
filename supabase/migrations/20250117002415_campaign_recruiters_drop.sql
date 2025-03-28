revoke delete on table "public"."campaigns_recruiters" from "anon";

revoke insert on table "public"."campaigns_recruiters" from "anon";

revoke references on table "public"."campaigns_recruiters" from "anon";

revoke select on table "public"."campaigns_recruiters" from "anon";

revoke trigger on table "public"."campaigns_recruiters" from "anon";

revoke truncate on table "public"."campaigns_recruiters" from "anon";

revoke update on table "public"."campaigns_recruiters" from "anon";

revoke delete on table "public"."campaigns_recruiters" from "authenticated";

revoke insert on table "public"."campaigns_recruiters" from "authenticated";

revoke references on table "public"."campaigns_recruiters" from "authenticated";

revoke select on table "public"."campaigns_recruiters" from "authenticated";

revoke trigger on table "public"."campaigns_recruiters" from "authenticated";

revoke truncate on table "public"."campaigns_recruiters" from "authenticated";

revoke update on table "public"."campaigns_recruiters" from "authenticated";

revoke delete on table "public"."campaigns_recruiters" from "service_role";

revoke insert on table "public"."campaigns_recruiters" from "service_role";

revoke references on table "public"."campaigns_recruiters" from "service_role";

revoke select on table "public"."campaigns_recruiters" from "service_role";

revoke trigger on table "public"."campaigns_recruiters" from "service_role";

revoke truncate on table "public"."campaigns_recruiters" from "service_role";

revoke update on table "public"."campaigns_recruiters" from "service_role";

revoke delete on table "public"."recruiters_candidates" from "anon";

revoke insert on table "public"."recruiters_candidates" from "anon";

revoke references on table "public"."recruiters_candidates" from "anon";

revoke select on table "public"."recruiters_candidates" from "anon";

revoke trigger on table "public"."recruiters_candidates" from "anon";

revoke truncate on table "public"."recruiters_candidates" from "anon";

revoke update on table "public"."recruiters_candidates" from "anon";

revoke delete on table "public"."recruiters_candidates" from "authenticated";

revoke insert on table "public"."recruiters_candidates" from "authenticated";

revoke references on table "public"."recruiters_candidates" from "authenticated";

revoke select on table "public"."recruiters_candidates" from "authenticated";

revoke trigger on table "public"."recruiters_candidates" from "authenticated";

revoke truncate on table "public"."recruiters_candidates" from "authenticated";

revoke update on table "public"."recruiters_candidates" from "authenticated";

revoke delete on table "public"."recruiters_candidates" from "service_role";

revoke insert on table "public"."recruiters_candidates" from "service_role";

revoke references on table "public"."recruiters_candidates" from "service_role";

revoke select on table "public"."recruiters_candidates" from "service_role";

revoke trigger on table "public"."recruiters_candidates" from "service_role";

revoke truncate on table "public"."recruiters_candidates" from "service_role";

revoke update on table "public"."recruiters_candidates" from "service_role";

revoke delete on table "public"."team_members" from "anon";

revoke insert on table "public"."team_members" from "anon";

revoke references on table "public"."team_members" from "anon";

revoke select on table "public"."team_members" from "anon";

revoke trigger on table "public"."team_members" from "anon";

revoke truncate on table "public"."team_members" from "anon";

revoke update on table "public"."team_members" from "anon";

revoke delete on table "public"."team_members" from "authenticated";

revoke insert on table "public"."team_members" from "authenticated";

revoke references on table "public"."team_members" from "authenticated";

revoke select on table "public"."team_members" from "authenticated";

revoke trigger on table "public"."team_members" from "authenticated";

revoke truncate on table "public"."team_members" from "authenticated";

revoke update on table "public"."team_members" from "authenticated";

revoke delete on table "public"."team_members" from "service_role";

revoke insert on table "public"."team_members" from "service_role";

revoke references on table "public"."team_members" from "service_role";

revoke select on table "public"."team_members" from "service_role";

revoke trigger on table "public"."team_members" from "service_role";

revoke truncate on table "public"."team_members" from "service_role";

revoke update on table "public"."team_members" from "service_role";

alter table "public"."campaigns_recruiters" drop constraint "campaigns_recruiters_campaign_id_fkey";

alter table "public"."campaigns_recruiters" drop constraint "campaigns_recruiters_recruiter_id_fkey";

alter table "public"."recruiters_candidates" drop constraint "recruiters_candidates_candidate_id_fkey";

alter table "public"."recruiters_candidates" drop constraint "recruiters_candidates_recruiter_id_fkey";

alter table "public"."team_members" drop constraint "team_members_test_team_id_fkey";

alter table "public"."campaigns_recruiters" drop constraint "campaigns_recruiters_pkey";

alter table "public"."recruiters_candidates" drop constraint "recruiters_candidates_pkey";

alter table "public"."team_members" drop constraint "team_members_test_pkey";

drop index if exists "public"."campaigns_recruiters_pkey";

drop index if exists "public"."recruiters_candidates_pkey";

drop index if exists "public"."team_members_test_pkey";

drop table "public"."campaigns_recruiters";

drop table "public"."recruiters_candidates";

drop table "public"."team_members";

CREATE SEQUENCE "public"."recruiters_candidates_id_seq" START WITH 1 INCREMENT BY 1;

create table "public"."teams_candidates" (
    "id" integer not null default nextval('recruiters_candidates_id_seq'::regclass),
    "teams_id" integer not null,
    "candidate_id" integer not null
);


alter table "public"."teams_candidates" enable row level security;

create table "public"."teams_members" (
    "id" bigint generated by default as identity not null,
    "invite_date" timestamp with time zone not null default now(),
    "team_id" uuid not null,
    "role" text not null default 'viewver'::text,
    "permissions" jsonb not null default '{"key": "viewver", "name": "Viewver", "access": {"read": false, "view": false, "write": false, "delete": false}}'::jsonb
);


alter table "public"."campaigns" alter column "id" add generated by default as identity;

alter table "public"."campaigns_stats" add column "cron_interval" bigint not null default '720'::bigint;

alter sequence "public"."recruiters_candidates_id_seq" owned by "public"."teams_candidates"."id";

drop sequence if exists "public"."campaigns_recruiters_id_seq";

CREATE UNIQUE INDEX recruiters_candidates_pkey ON public.teams_candidates USING btree (id);

CREATE UNIQUE INDEX team_members_test_pkey ON public.teams_members USING btree (id);

alter table "public"."teams_candidates" add constraint "recruiters_candidates_pkey" PRIMARY KEY using index "recruiters_candidates_pkey";

alter table "public"."teams_members" add constraint "team_members_test_pkey" PRIMARY KEY using index "team_members_test_pkey";

alter table "public"."teams_candidates" add constraint "recruiters_candidates_candidate_id_fkey" FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."teams_candidates" validate constraint "recruiters_candidates_candidate_id_fkey";

alter table "public"."teams_candidates" add constraint "recruiters_candidates_recruiter_id_fkey" FOREIGN KEY (teams_id) REFERENCES recruiters(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."teams_candidates" validate constraint "recruiters_candidates_recruiter_id_fkey";

alter table "public"."teams_members" add constraint "team_members_test_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(team_id) not valid;

alter table "public"."teams_members" validate constraint "team_members_test_team_id_fkey";

grant delete on table "public"."teams_candidates" to "anon";

grant insert on table "public"."teams_candidates" to "anon";

grant references on table "public"."teams_candidates" to "anon";

grant select on table "public"."teams_candidates" to "anon";

grant trigger on table "public"."teams_candidates" to "anon";

grant truncate on table "public"."teams_candidates" to "anon";

grant update on table "public"."teams_candidates" to "anon";

grant delete on table "public"."teams_candidates" to "authenticated";

grant insert on table "public"."teams_candidates" to "authenticated";

grant references on table "public"."teams_candidates" to "authenticated";

grant select on table "public"."teams_candidates" to "authenticated";

grant trigger on table "public"."teams_candidates" to "authenticated";

grant truncate on table "public"."teams_candidates" to "authenticated";

grant update on table "public"."teams_candidates" to "authenticated";

grant delete on table "public"."teams_candidates" to "service_role";

grant insert on table "public"."teams_candidates" to "service_role";

grant references on table "public"."teams_candidates" to "service_role";

grant select on table "public"."teams_candidates" to "service_role";

grant trigger on table "public"."teams_candidates" to "service_role";

grant truncate on table "public"."teams_candidates" to "service_role";

grant update on table "public"."teams_candidates" to "service_role";

grant delete on table "public"."teams_members" to "anon";

grant insert on table "public"."teams_members" to "anon";

grant references on table "public"."teams_members" to "anon";

grant select on table "public"."teams_members" to "anon";

grant trigger on table "public"."teams_members" to "anon";

grant truncate on table "public"."teams_members" to "anon";

grant update on table "public"."teams_members" to "anon";

grant delete on table "public"."teams_members" to "authenticated";

grant insert on table "public"."teams_members" to "authenticated";

grant references on table "public"."teams_members" to "authenticated";

grant select on table "public"."teams_members" to "authenticated";

grant trigger on table "public"."teams_members" to "authenticated";

grant truncate on table "public"."teams_members" to "authenticated";

grant update on table "public"."teams_members" to "authenticated";

grant delete on table "public"."teams_members" to "service_role";

grant insert on table "public"."teams_members" to "service_role";

grant references on table "public"."teams_members" to "service_role";

grant select on table "public"."teams_members" to "service_role";

grant trigger on table "public"."teams_members" to "service_role";

grant truncate on table "public"."teams_members" to "service_role";

grant update on table "public"."teams_members" to "service_role";
