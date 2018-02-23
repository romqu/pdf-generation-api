SELECT
    *
FROM
    street_address
    INNER JOIN floor ON street_address.id = 1
        AND floor.street_address_id = street_address.id
    INNER JOIN living_unit ON living_unit.floor_id = floor.id
    INNER JOIN room ON room.id = living_unit.id
    INNER JOIN defect ON defect.room_id = room.id
    INNER JOIN defect_image ON defect_image.defect_id = defect.id;

SELECT
    *
FROM
    client
    INNER JOIN street_address ON client.id = 1
        AND street_address.client_id = client.id
    INNER JOIN floor ON floor.street_address_id = street_address.id
    INNER JOIN living_unit ON living_unit.floor_id = floor.id
    INNER JOIN room ON room.living_unit_id = living_unit.id
    INNER JOIN defect ON defect.room_id = room.id
    INNER JOIN defect_image ON defect_image.defect_id = defect.id;

