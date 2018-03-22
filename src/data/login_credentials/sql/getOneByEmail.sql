SELECT
    id,
    e_mail,
    password_hash
FROM
    login_credentials
WHERE
    e_mail = ${email};