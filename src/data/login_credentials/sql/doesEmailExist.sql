SELECT
    EXISTS (
        SELECT
            e_mail
        FROM
            login_credentials
        WHERE
            e_mail = ${email})
