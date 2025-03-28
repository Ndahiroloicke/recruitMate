-- add recruiter_id to candidates table to link candidates to recruiters
-- also add a foreign key constraint to ensure that the recruiter_id is valid
-- Up
ALTER TABLE
    candidates
ADD
    COLUMN recruiter_id INTEGER;
ALTER TABLE
    candidates
ADD
    CONSTRAINT fk_recruiter_id FOREIGN KEY (recruiter_id) REFERENCES recruiters(id);
