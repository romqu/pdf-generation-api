SELECT ARRAY(SELECT '{id' || ': ' || defect_image.id :: TEXT || '}'
             FROM defect_image);
