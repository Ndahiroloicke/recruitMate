alter table "public"."campaigns_candidates" drop constraint "campaigns_candidates_pkey";

drop index if exists "public"."campaigns_candidates_pkey";

alter table "public"."campaigns_candidates" alter column "campaign_id" set not null;

alter table "public"."campaigns_candidates" alter column "candidate_id" set not null;

CREATE UNIQUE INDEX campaigns_candidates_pkey ON public.campaigns_candidates USING btree (campaign_id, candidate_id);

alter table "public"."campaigns_candidates" add constraint "campaigns_candidates_pkey" PRIMARY KEY using index "campaigns_candidates_pkey";


