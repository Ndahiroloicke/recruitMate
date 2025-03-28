CREATE UNIQUE INDEX unique_campaign_candidate ON public.campaigns_candidates USING btree (campaign_id, candidate_id);

alter table "public"."campaigns_candidates" add constraint "unique_campaign_candidate" UNIQUE using index "unique_campaign_candidate";


