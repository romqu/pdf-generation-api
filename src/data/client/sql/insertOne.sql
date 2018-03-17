INSERT INTO client (forename, surname)
    VALUES (${forename}, ${surname}) RETURNING id;