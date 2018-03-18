INSERT INTO client (forename, surname, login_credentials_id)
    VALUES (${forename}, ${surname}, ${loginCredentialsId}) RETURNING id;