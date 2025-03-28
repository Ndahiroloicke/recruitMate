-- Create recruiters table
-- a recruiter is a user who has a profile
CREATE TABLE recruiters (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    auth_id VARCHAR(255),
    role VARCHAR(255) DEFAULT 'recruiter',
    status VARCHAR(255) DEFAULT 'inactive',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE OR REPLACE FUNCTION create_recruiter_on_user_insert()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert a new recruiter record with role and email
    INSERT INTO public.recruiters (auth_id, email, role)
    VALUES (
        NEW.id,
        NEW.email,
        CASE
            WHEN NEW.email ILIKE '%@recruitmateai.com' THEN 'admin'
            ELSE 'recruiter'
        END
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
DROP TRIGGER IF EXISTS create_recruiter_after_user_insert ON auth.users;
CREATE TRIGGER create_recruiter_after_user_insert
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION create_recruiter_on_user_insert();
-- Create campaigns table
CREATE TABLE campaigns (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    email_subject VARCHAR(255),
    email_body TEXT,
    start_date DATE,
    end_date DATE,
    status VARCHAR(255) DEFAULT 'inactive',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    recruiter_id INT REFERENCES recruiters(id)
);
-- Create candidates table
CREATE TABLE candidates (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone VARCHAR(20),
    resume TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Create campaign_recruiters table
CREATE TABLE campaigns_recruiters (
    id SERIAL PRIMARY KEY,
    campaign_id INT,
    recruiter_id INT,
    FOREIGN KEY (campaign_id) REFERENCES campaigns(id),
    FOREIGN KEY (recruiter_id) REFERENCES recruiters(id)
);
-- Create campaign_candidates table
CREATE TABLE campaigns_candidates (
    id SERIAL PRIMARY KEY,
    campaign_id INT,
    candidate_id INT,
    previewed BOOLEAN DEFAULT false,
    email_sent BOOLEAN DEFAULT false,
    email_opened BOOLEAN DEFAULT false,
    email_clicked BOOLEAN DEFAULT false,
    email_subject VARCHAR(255),
    email_body TEXT,
    FOREIGN KEY (campaign_id) REFERENCES campaigns(id),
    FOREIGN KEY (candidate_id) REFERENCES candidates(id)
);
