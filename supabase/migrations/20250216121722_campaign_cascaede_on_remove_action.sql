alter table "public"."teams_campaign" drop constraint "teams_candidates_campaign_id_fkey";

alter table "public"."campaigns_candidates" drop constraint "campaigns_candidates_campaign_id_fkey";

alter table "public"."campaigns_stats" drop constraint "campaigns_stats_campaign_id_fkey";

alter table "public"."teams_campaign" add constraint "teams_campaign_campaign_id_fkey" FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE not valid;

alter table "public"."teams_campaign" validate constraint "teams_campaign_campaign_id_fkey";

alter table "public"."campaigns_candidates" add constraint "campaigns_candidates_campaign_id_fkey" FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE not valid;

alter table "public"."campaigns_candidates" validate constraint "campaigns_candidates_campaign_id_fkey";

alter table "public"."campaigns_stats" add constraint "campaigns_stats_campaign_id_fkey" FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE not valid;

alter table "public"."campaigns_stats" validate constraint "campaigns_stats_campaign_id_fkey";
