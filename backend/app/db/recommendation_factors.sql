CREATE OR ALTER VIEW recommendation_factors AS
SELECT 
    cs.village_id AS village_id,
    CAST(JSON_VALUE(cs.json_result, '$.sensitivity[0].sensitivity') AS float) AS c1,
    CAST(JSON_VALUE(cs.json_result, '$.sensitivity[1].sensitivity') AS float) AS c2,
    CAST(JSON_VALUE(cs.json_result, '$.sensitivity[2].sensitivity') AS float) AS c3,
    CAST(JSON_VALUE(cs.json_result, '$.sensitivity[3].sensitivity') AS float) AS c4,
    CAST(JSON_VALUE(cs.json_result, '$.sensitivity[4].sensitivity') AS float) AS c5,
    CAST(JSON_VALUE(cs.json_result, '$.sensitivity[5].sensitivity') AS float) AS c6,
    CAST(JSON_VALUE(co.json_factors , '$.f1') AS float) AS f1,
    CAST(JSON_VALUE(co.json_factors , '$.f2') AS float) AS f2,
    CAST(JSON_VALUE(co.json_factors , '$.f3') AS float) AS f3,
    CAST(JSON_VALUE(co.json_factors , '$.f4') AS float) AS f4,
    CAST(JSON_VALUE(co.json_factors , '$.f5') AS float) AS f5,
    CAST(vi.village_index AS float) AS g1,
    vn.kesiapan_warga AS inv1,
    vn.kerja_sama AS inv2,
    vn.infrastruktur AS inv3
FROM
    synthesis_citizen_science cs
INNER JOIN
    synthesis_cooperation co ON cs.village_id = co.village_id 
INNER JOIN 
    synthesis_infrastructure vi ON cs.village_id = vi.village_id 
INNER JOIN
    village_investment vn ON cs.village_id = vn.village_id
