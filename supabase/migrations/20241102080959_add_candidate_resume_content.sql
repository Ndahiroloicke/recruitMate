-- add thread id column to campaign candidate table and it can be null
ALTER TABLE
    candidates
ADD
    COLUMN resume_content JSONB;
