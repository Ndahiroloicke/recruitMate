CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    from_name VARCHAR(255) NOT NULL,
    from_email VARCHAR(255) NOT NULL,
    to_email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    date TIMESTAMP NOT NULL,
    text_body TEXT,
    html_body TEXT,
    stripped_text_reply TEXT,
    thread_id VARCHAR(255) NOT NULL,
    message_id VARCHAR(255) NOT NULL,
    header_references TEXT
);
CREATE INDEX messages_thread_id_idx ON messages(thread_id);
