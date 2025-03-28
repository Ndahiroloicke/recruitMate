-- add thread id column to campaign candidate table and it can be null
ALTER TABLE
    campaigns_candidates
ADD
    COLUMN thread_id VARCHAR(255);
