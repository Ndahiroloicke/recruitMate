-- add recruiter_id to candidates table to link candidates to recruiters
-- also add a foreign key constraint to ensure that the recruiter_id is valid
-- Up
ALTER TABLE
    campaigns
ADD
    COLUMN hiring_company TEXT;
