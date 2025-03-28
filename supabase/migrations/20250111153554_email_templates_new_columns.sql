alter table "public"."template_email" add column "description" text;
alter table "public"."template_email" add column "tags" jsonb;
alter table "public"."template_email" add column "title" text;
