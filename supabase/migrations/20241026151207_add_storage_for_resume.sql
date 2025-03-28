-- Add a bucket for resumes if not exists
insert into
    storage.buckets (id, name, public)
values
    ('resumes', 'resumes', true)
on conflict do nothing;
