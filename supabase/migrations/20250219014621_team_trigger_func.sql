set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_default_team()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$DECLARE
    created_team_id INT;
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO public.teams (
            owner_id,
            is_default,
            name,
            description,
            logo
        )
        VALUES (
            NEW.id,
            TRUE,
            NEW.first_name || '''s Team',
            'Your first team!',
            NEW.avatar
        )
        RETURNING id INTO created_team_id;

        INSERT INTO public.teams_members (
            team_id,
            role,
            recruiters_id,
            permissions
        )
        VALUES (
            created_team_id,
            'owner',
            NEW.id,
            '{"key": "owner", "name": "Owner", "access": {"read": true, "view": true, "write": true, "delete": true}}'::jsonb
        );

    ELSIF TG_OP = 'UPDATE' THEN
        UPDATE public.teams
        SET
            name = NEW.first_name || '''s Team',
            logo = NEW.avatar
        WHERE owner_id = NEW.id;
    END IF;

    RETURN NEW;
END;$function$
;


