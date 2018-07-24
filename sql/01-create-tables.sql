-- CREATE ROLE roman WITH PASSWORD 'roman' LOGIN CREATEDB;
-- CREATE DATABASE roman OWNER=roman;

CREATE TABLE IF NOT EXISTS client_credentials(

	id BIGSERIAL,
	e_mail VARCHAR(255) UNIQUE NOT NULL,
	password TEXT NOT NULL,

	CONSTRAINT client_credentials_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS session(

	id BIGSERIAL,
	uuid VARCHAR(36) UNIQUE NOT NULL,
	type VARCHAR(20) NOT NULL, -- Either GUEST or CLIENT

	CONSTRAINT session_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS client(

	id BIGSERIAL,
	forename VARCHAR(20) NOT NULL,
	surname VARCHAR(20) NOT NULL,
	client_credentials_id BIGINT NOT NULL,

	session_id BIGINT NOT NULL,

	CONSTRAINT client_pk PRIMARY KEY (id),
    CONSTRAINT client_credentials_fk FOREIGN KEY (client_credentials_id)
        REFERENCES client_credentials (id)
        ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT session_fk FOREIGN KEY (session_id)
        REFERENCES session (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS defect_list(

	id BIGSERIAL,
	name VARCHAR(255) NOT NULL,
	creation_date DATE NOT NULL,

	client_id BIGINT NOT NULL,

	CONSTRAINT defect_list_pk PRIMARY KEY (id),
    CONSTRAINT client_fk FOREIGN KEY (client_id)
        REFERENCES client (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS street_address(

	id BIGSERIAL,
	city VARCHAR(255) NOT NULL,
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

CREATE TABLE IF NOT EXISTS view_participant(

	id BIGSERIAL,
	forename VARCHAR(30) NOT NULL,
	surname VARCHAR(30) NOT NULL,
	phone_number INTEGER NOT NULL,
	e_mail VARCHAR(255) NOT NULL,
	company_name VARCHAR(255) NOT NULL,

	defect_list_id BIGINT NOT NULL,

	CONSTRAINT participant_pk PRIMARY KEY (id),
    CONSTRAINT defect_list_fk FOREIGN KEY (defect_list_id)
        REFERENCES defect_list (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS floor(

	id BIGSERIAL,
	name VARCHAR(20) NOT NULL,

	street_address_id BIGINT,

	CONSTRAINT floor_pk PRIMARY KEY (id),
    CONSTRAINT street_address_fk FOREIGN KEY (street_address_id)
        REFERENCES street_address (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS living_unit(

	id BIGSERIAL,
	number INTEGER NOT NULL,

	floor_id BIGINT,

	CONSTRAINT living_unit_pk PRIMARY KEY (id),
    CONSTRAINT floor_fk FOREIGN KEY (floor_id)
        REFERENCES floor (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS room(

	id BIGSERIAL,
	name VARCHAR(30) NOT NULL,
	number INTEGER NOT NULL,
	location_description TEXT NOT NULL,

	living_unit_id BIGINT NOT NULL,

	CONSTRAINT room_pk PRIMARY KEY (id),
    CONSTRAINT living_unit_fk FOREIGN KEY (living_unit_id)
        REFERENCES living_unit (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS defect_info(

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

CREATE TABLE IF NOT EXISTS file (

	id BIGSERIAL,
	name VARCHAR(255) NOT NULL,
	original_name VARCHAR(255) NOT NULL,
	extension VARCHAR(255) NOT NULL,
	created_at TIMESTAMPTZ NOT NULL,

	CONSTRAINT file_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS defect_image(

	id BIGSERIAL,
	position SMALLINT NOT NULL,

	defect_info_id BIGINT NOT NULL,
	file_id BIGINT NOT NULL,

	CONSTRAINT defect_image_pk PRIMARY KEY (id),
    CONSTRAINT defect_info_fk FOREIGN KEY (defect_info_id)
        REFERENCES defect_info (id)
        ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT file_fk FOREIGN KEY (file_id)
        REFERENCES file (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS floor_plan_image(

	id BIGSERIAL,

	defect_list_id BIGINT NOT NULL,
	file_id BIGINT NOT NULL,

	CONSTRAINT floor_plan_pk PRIMARY KEY (id),
    CONSTRAINT defect_list_fk FOREIGN KEY (defect_list_id)
        REFERENCES defect_list (id)
        ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT file_fk FOREIGN KEY (file_id)
        REFERENCES file (id)
        ON DELETE CASCADE ON UPDATE CASCADE
)