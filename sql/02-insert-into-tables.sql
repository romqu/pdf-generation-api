BEGIN
    TRANSACTION;
    INSERT INTO LOGIN (e_mail, password_hash)
    VALUES ('test@test.de', 'test');
    INSERT INTO client (forename, surname, login_id)
    VALUES ('Peter', 'Hemm', 2);
END TRANSACTION;

BEGIN
    TRANSACTION;
    INSERT INTO street_address (postal_code, name, number, additional, client_id)
    VALUES (22345, 'Musterstraße', 2, 'a', 2);
    INSERT INTO view_participant (forename, surname, phone_number, e_mail, company_name, street_address_id)
    VALUES ('Max', 'Mustermann', 2234567, 'max@mustermann.de', 'Mustermann AG', 2);
    INSERT INTO floor(name, street_address_id)
    VALUES ('EG', 2);
    INSERT INTO living_unit (number, floor_id)
    VALUES (2, 2);
    INSERT INTO room (name, number, location_description, living_unit_id)
    VALUES ('Wohnzimmer', 2, 'Links, neben der Küche', 2);
    INSERT INTO defect (description, measure, company_in_charge, done_till, room_id)
    VALUES ('Ist kaputt.', 'Bitte beheben.', 'Meier', '02/02/2222', 2);
    INSERT INTO defect_image (name, defect_id)
    VALUES ('mangel.jpg', 2);
END TRANSACTION;

