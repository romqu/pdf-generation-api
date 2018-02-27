INSERT INTO login_credentials (e_mail, password_hash)
    VALUES (${email}, ${passwordHash}) RETURNING id;