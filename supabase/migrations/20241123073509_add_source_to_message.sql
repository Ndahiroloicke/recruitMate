-- add source column to messages table and it can be null
-- system is coming from application and user is coming from user
ALTER TABLE
    messages
ADD
    COLUMN source VARCHAR(255);
