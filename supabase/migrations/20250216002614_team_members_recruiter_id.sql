alter table "public"."teams_members" add column "recruiters_id" integer;

alter table "public"."teams_members" add constraint "teams_members_recruiters_id_fkey" FOREIGN KEY (recruiters_id) REFERENCES recruiters(id) ON UPDATE CASCADE not valid;

alter table "public"."teams_members" validate constraint "teams_members_recruiters_id_fkey";


