-- CREATE ROLE roman WITH PASSWORD 'test' LOGIN CREATEDB;
-- CREATE DATABASE roman OWNER=roman;

CREATE TABLE login(

	id bigserial,
	e_mail varchar(30) NOT NULL,
	password_hash text NOT NULL,

	CONSTRAINT login_pk PRIMARY KEY (id)
);

CREATE TABLE client(

	id bigserial,
	forename varchar(20) NOT NULL,
	surname varchar(20) NOT NULL,

	login_id bigint NOT NULL,

	CONSTRAINT client_pk PRIMARY KEY (id),
    CONSTRAINT login_fk FOREIGN KEY (login_id)
        REFERENCES login (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE street_address(

	id bigserial,
	postal_code integer NOT NULL,
	name varchar(255) NOT NULL,
	number integer NOT NULL,
	additional varchar(5),

	client_id bigint NOT NULL,

	CONSTRAINT address_pk PRIMARY KEY (id),
    CONSTRAINT client_fk FOREIGN KEY (client_id)
        REFERENCES client (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE view_participant(

	id bigserial,
	forename varchar(30) NOT NULL,
	surname varchar(30) NOT NULL,
	phone_number integer NOT NULL,
	e_mail varchar(255) NOT NULL,
	company_name varchar(255) NOT NULL,

	street_address_id bigint NOT NULL,

	CONSTRAINT participant_pk PRIMARY KEY (id),
    CONSTRAINT street_address_fk FOREIGN KEY (street_address_id)
        REFERENCES street_address (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE floor(

	id bigserial,
	name varchar(20) NOT NULL,

	street_address_id bigint,

	CONSTRAINT floor_pk PRIMARY KEY (id),
    CONSTRAINT street_address_fk FOREIGN KEY (street_address_id)
        REFERENCES street_address (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE living_unit(

	id bigserial,
	number integer NOT NULL,

	floor_id bigint,

	CONSTRAINT living_unit_pk PRIMARY KEY (id),
    CONSTRAINT floor_fk FOREIGN KEY (floor_id)
        REFERENCES floor (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE room(

	id bigserial,
	name varchar(30) NOT NULL,
	number integer NOT NULL,
	location_description text NOT NULL,

	living_unit_id bigint NOT NULL,

	CONSTRAINT room_pk PRIMARY KEY (id),
    CONSTRAINT living_unit_fk FOREIGN KEY (living_unit_id )
        REFERENCES client (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE defect(

	id bigserial,
	description text NOT NULL,
	measure text NOT NULL,
	company_in_charge varchar(50) NOT NULL,
	done_till date NOT NULL,

	room_id bigint NOT NULL,

	CONSTRAINT defect_pk PRIMARY KEY (id),
    CONSTRAINT room_fk FOREIGN KEY (room_id)
        REFERENCES room (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE defect_image(

	id bigserial,
	name varchar(50) NOT NULL,

	defect_id bigint NOT NULL,

	CONSTRAINT defect_image_pk PRIMARY KEY (id),
    CONSTRAINT defect_fk FOREIGN KEY (defect_id)
        REFERENCES defect (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);