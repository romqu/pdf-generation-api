-- WITH defect_list_row AS (
-- INSERT INTO defect_list (name, client_id)
--     VALUES (${dLname}, ${clientId})
-- RETURNING
--     id), street_address_row AS (
-- INSERT INTO street_address (postal_code, name, number, additional, defect_list_id)
--     VALUES (${postalCode}, ${sAname}, ${number}, ${additional}, (
--             SELECT
--                 id
--             FROM
--                 defect_list_row))
--     RETURNING
--         id)
-- INSERT INTO floor(name, street_address_id)
--     VALUES ('EG', (
--             SELECT
--                 id
--             FROM
--                 street_address_row))
--     RETURNING
--         id;
WITH defect_list_row AS (
INSERT INTO defect_list (name, client_id)
    VALUES ('qwertzuio', 1)
RETURNING
    id)
INSERT INTO street_address (postal_code, name, number, additional, defect_list_id)
    VALUES (21424, 'name', 12, 'ac', (
            SELECT
                id
            FROM
                defect_list_row))
    RETURNING
        id

-- insert into view_participant values (1), (1), (1)
-- insert floor values (1, 1), (2, 1)
-- insert living_unit (1, 1), (2, 2), (3, 1)
-- insert room (1, 1)(2, 1)
-- insert defect (1, 1)
