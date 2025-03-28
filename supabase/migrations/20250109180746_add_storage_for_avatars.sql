-- Add a bucket for resumes if not exists
insert into
    storage.buckets (id, name, public)
values
    ('avatars', 'avatars', true)
on conflict do nothing;
