set check_function_bodies = off;
CREATE OR REPLACE FUNCTION public.create_default_team()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
    INSERT INTO public.teams
    (
        owner_id,
        team_id,
        is_default,
        title,
        description,
        logo
    )
    VALUES
    (
        NEW.id,
        gen_random_uuid(),
        TRUE,
        NEW.first_name || ' s Team',
        'Your first team!',
        NEW.avatar
    );

    RETURN NEW;
END;$function$;
