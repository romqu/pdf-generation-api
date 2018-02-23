BEGIN
    TRANSACTION;
    INSERT INTO LOGIN (e_mail, password_hash)
    VALUES ('test@test.de', 'test');
    INSERT INTO client (forename, surname, login_id)
    VALUES ('Peter', 'Hemm', 1);
END TRANSACTION;

BEGIN
    TRANSACTION;
    INSERT INTO street_address (postal_code, name, number, additional, client_id)
    VALUES (12345, 'Musterstraße', 1, 'a', 1);
    INSERT INTO view_participant (forename, surname, phone_number, e_mail, company_name, street_address_id)
    VALUES ('Max', 'Mustermann', 1234567, 'max@mustermann.de', 'Mustermann AG', 1);
    INSERT INTO floor(name, street_address_id)
    VALUES ('EG', 1);
    INSERT INTO living_unit (number, floor_id)
    VALUES (1, 1);
    INSERT INTO room (name, number, location_description, living_unit_id)
    VALUES ('Wohnzimmer', 1, 'Links, neben der Küche', 1);
    INSERT INTO defect (description, measure, company_in_charge, done_till, room_id)
    VALUES ('Ist kaputt.', 'Bitte beheben.', 'Meier', '01/01/1111', 1);
    INSERT INTO defect_image (name, defect_id)
    VALUES ('mangel.jpg', 1);
END TRANSACTION;

