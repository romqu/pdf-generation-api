WITH defect_list AS (
INSERT INTO defect_list (name, client_id)
    VALUES ($ name, $ clientId)
RETURNING
    id;

)
