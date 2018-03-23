SELECT
    id,
    forename,
    surname,
    login_credentials_id
FROM
    client
WHERE
    login_credentials_id = ${loginCredentialsId};