set check_function_bodies = off;
CREATE OR REPLACE FUNCTION public.create_recruiter_on_user_insert()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
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
END;$function$;
