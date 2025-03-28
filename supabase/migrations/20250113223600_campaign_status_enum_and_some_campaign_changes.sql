create type "public"."campaign_status" as enum ('running', 'draft');

alter table "public"."campaigns" drop constraint "campaigns_recruiter_id_fkey";

alter table "public"."campaigns" drop column "email_body";

alter table "public"."campaigns" drop column "email_subject";

alter table "public"."campaigns" drop column "end_date";

alter table "public"."campaigns" drop column "recruiter_id";

alter table "public"."campaigns" drop column "start_date";

alter table "public"."campaigns" add column "template_id" bigint;

alter table "public"."campaigns" alter column "status" set default 'draft'::campaign_status;

alter table "public"."campaigns" alter column "status" set data type campaign_status using "status"::campaign_status;

alter table "public"."campaigns" add constraint "campaigns_template_id_fkey" FOREIGN KEY (template_id) REFERENCES template_email(id) not valid;

alter table "public"."campaigns" validate constraint "campaigns_template_id_fkey";


