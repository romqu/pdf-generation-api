WITH defect_list AS (
INSERT INTO defect_list (name, client_id)
    VALUES (${dLname}, ${clientId})
RETURNING
    id)

INSERT INTO street_address (postal_code, name, number, additional, defect_list_id)
    VALUES (${postalCode}, ${sAname}, ${number}, ${additional}, (
            SELECT
                id
            FROM
                defect_list))
    RETURNING
        id;

