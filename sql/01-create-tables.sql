-- CREATE ROLE roman WITH PASSWORD 'roman' LOGIN CREATEDB;
-- CREATE DATABASE roman OWNER=roman;

CREATE TABLE login_credentials(

	id BIGSERIAL,
	e_mail VARCHAR(100) UNIQUE NOT NULL,
	password_hash TEXT NOT NULL,

	CONSTRAINT login_pk PRIMARY KEY (id)
);

CREATE TABLE login_status(

	id BIGSERIAL,
	is_logged_in BOOLEAN NOT NULL,
	session_uuid VARCHAR(36) UNIQUE,

	login_credentials_id BIGINT NOT NULL,

	CONSTRAINT login_status_pk PRIMARY KEY (id),
	CONSTRAINT login_credentials_fk FOREIGN KEY (login_credentials_id)
        REFERENCES login_credentials (id)
        ON DELETE CASCADE ON UPDATE CASCADE

);

CREATE TABLE client(

	id BIGSERIAL,
	forename VARCHAR(20) NOT NULL,
	surname VARCHAR(20) NOT NULL,

	login_credentials_id BIGINT NOT NULL,

	CONSTRAINT client_pk PRIMARY KEY (id),
    CONSTRAINT login_credentials_fk FOREIGN KEY (login_credentials_id)
        REFERENCES login_credentials (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE defect_list(

	id BIGSERIAL,
	name VARCHAR(255) NOT NULL,
	creation_date DATE NOT NULL,

	client_id BIGINT NOT NULL,

	CONSTRAINT defect_list_pk PRIMARY KEY (id),
    CONSTRAINT client_fk FOREIGN KEY (client_id)
        REFERENCES client (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE street_address(

	id BIGSERIAL,
	postal_code INTEGER NOT NULL,
	name VARCHAR(255) NOT NULL,
	number INTEGER NOT NULL,
	additional VARCHAR(5),

	defect_list_id BIGINT NOT NULL,

	CONSTRAINT street_address_pk PRIMARY KEY (id),
    CONSTRAINT defect_list_fk FOREIGN KEY (defect_list_id)
        REFERENCES defect_list (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE view_participant(

	id BIGSERIAL,
	forename VARCHAR(30) NOT NULL,
	surname VARCHAR(30) NOT NULL,
	phone_number INTEGER NOT NULL,
	e_mail VARCHAR(255) NOT NULL,
	company_name VARCHAR(255) NOT NULL,

	street_address_id BIGINT NOT NULL,

	CONSTRAINT participant_pk PRIMARY KEY (id),
    CONSTRAINT street_address_fk FOREIGN KEY (street_address_id)
        REFERENCES street_address (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE floor(

	id BIGSERIAL,
	name VARCHAR(20) NOT NULL,

	street_address_id BIGINT,

	CONSTRAINT floor_pk PRIMARY KEY (id),
    CONSTRAINT street_address_fk FOREIGN KEY (street_address_id)
        REFERENCES street_address (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE living_unit(

	id BIGSERIAL,
	number INTEGER NOT NULL,

	floor_id BIGINT,

	CONSTRAINT living_unit_pk PRIMARY KEY (id),
    CONSTRAINT floor_fk FOREIGN KEY (floor_id)
        REFERENCES floor (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE room(

	id BIGSERIAL,
	name VARCHAR(30) NOT NULL,
	number INTEGER NOT NULL,
	location_description TEXT NOT NULL,

	living_unit_id BIGINT NOT NULL,

	CONSTRAINT room_pk PRIMARY KEY (id),
    CONSTRAINT living_unit_fk FOREIGN KEY (living_unit_id )
        REFERENCES living_unit (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE defect(

	id BIGSERIAL,
	description TEXT NOT NULL,
	measure TEXT NOT NULL,
	company_in_charge VARCHAR(50) NOT NULL,
	done_till DATE NOT NULL,

	room_id BIGINT NOT NULL,

	CONSTRAINT defect_pk PRIMARY KEY (id),
    CONSTRAINT room_fk FOREIGN KEY (room_id)
        REFERENCES room (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE defect_image(

	id BIGSERIAL,
	name VARCHAR(255) NOT NULL,
	original_name VARCHAR(255) NOT NULL,
	position SMALLINT NOT NULL,

	defect_id BIGINT NOT NULL,

	CONSTRAINT defect_image_pk PRIMARY KEY (id),
    CONSTRAINT defect_fk FOREIGN KEY (defect_id)
        REFERENCES defect (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


-- street address, view participants

-- new floor, new living unit, new room, new defect, new defect images -> 1
-- floor, living unit, room, new defect, new defect
-- floor, living unit, room, (new defect, new defect) - nt 


-- 1. defect_list
-- 1.1 view_participant
-- 1.2 street_address

-- 1.2. defect 
-- 1.2.2 floor
-- 1.2.3 living_unit
-- 1.2.4 room
-- 1.2.5 defect_information
-- 1.2.6 defect_image

-- SELECT
--     *
-- FROM
--     defect_list
-- 	INNER JOIN street_address ON street_address.defect_list_id = defect_list.id
-- 	INNER JOIN defect ON defect.defect_list_id = defect_list.id
--     INNER JOIN floor ON floor.defect_id = defect.id
--     INNER JOIN living_unit ON living_unit.defect_id = defect.id
--     INNER JOIN room ON room.defect_id = defect.id
--     INNER JOIN defect_information ON defect_information.defect_id = defect.id
-- 	INNER JOIN defect_image ON defect_image.defect_id = defect.id
--     WHERE
--         defect_list.client_id = ?;


-- SELECT
--     *
-- FROM
--     street_address
--     INNER JOIN floor ON floor.street_address_id = street_address.id
--     INNER JOIN living_unit ON living_unit.floor_id = floor.id
--     INNER JOIN room ON room.id = living_unit.id
--     INNER JOIN defect ON defect.room_id = room.id
--     INNER JOIN defect_image ON defect_image.defect_id = defect.id
--     WHERE
--         street_address.client_id = ?;




