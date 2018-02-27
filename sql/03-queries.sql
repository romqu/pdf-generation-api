-- insert into login
BEGIN
    TRANSACTION;
    INSERT INTO LOGIN (e_mail, password_hash)
    VALUES (?, ?);
END TRANSACTION;

-- insert into client
BEGIN
    TRANSACTION;
    INSERT INTO client (forename, surname, login_id)
    VALUES ('?', '?', ?);
END TRANSACTION;

-- get login id and e-mail
SELECT
    login_credentials.id,
    login_credentials.e_mail
FROM
    login_credentials
WHERE
    id = ?;

-- get client 
SELECT
    client.forename,
    client.surname
FROM
    client
WHERE
    id = ?;

-- get all projects from a client
SELECT
    *
FROM
    street_address
    INNER JOIN floor ON floor.street_address_id = street_address.id
    INNER JOIN living_unit ON living_unit.floor_id = floor.id
    INNER JOIN room ON room.id = living_unit.id
    INNER JOIN defect ON defect.room_id = room.id
    INNER JOIN defect_image ON defect_image.defect_id = defect.id
    WHERE
        street_address.client_id = ?;

-- upsert project
