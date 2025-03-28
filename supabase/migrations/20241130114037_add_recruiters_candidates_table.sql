-- Add recruiters_candidates table
CREATE TABLE recruiters_candidates (
  id SERIAL PRIMARY KEY,
  recruiter_id INTEGER NOT NULL REFERENCES recruiters(id),
  candidate_id INTEGER NOT NULL REFERENCES candidates(id)
);
