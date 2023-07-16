-- questionnaire_dashboard definition

CREATE VIEW questionnaire_dashboard AS 
SELECT
	qa.id AS id,
	v.id AS village_id,
	v.name AS village_name,
	
	CAST(JSON_VALUE(qa.json_content, '$.x1_4') AS int) AS pekerjaan,

	CAST(JSON_VALUE(qa.json_content, '$.x1_19') AS int) AS kepemilikan_lahan,
	
	(
		CAST(JSON_VALUE(qa.json_content, '$.x1_30_1') AS decimal) +
		CAST(JSON_VALUE(qa.json_content, '$.x1_30_2') AS decimal) +
		CAST(JSON_VALUE(qa.json_content, '$.x1_30_3') AS decimal) + 
		CAST(JSON_VALUE(qa.json_content, '$.x1_30_4') AS decimal)
	) AS pengeluaran_bulanan,
	
	CASE WHEN JSON_VALUE(qa.json_content, '$.x1_36a') = '1' THEN 1 ELSE 0 END AS motivasi_1,
	CASE WHEN JSON_VALUE(qa.json_content, '$.x1_36b') = '1' THEN 1 ELSE 0 END AS motivasi_2,
	CASE WHEN JSON_VALUE(qa.json_content, '$.x1_36c') = '1' THEN 1 ELSE 0 END AS motivasi_3,
	
	CASE WHEN JSON_VALUE(qa.json_content, '$.x1_39b') = '1' THEN 1 ELSE 0 END AS tik_1,
	CASE WHEN JSON_VALUE(qa.json_content, '$.x1_39c') = '1' THEN 1 ELSE 0 END AS tik_2,
	CASE WHEN JSON_VALUE(qa.json_content, '$.x1_39d') = '1' THEN 1 ELSE 0 END AS tik_3,
	CASE WHEN JSON_VALUE(qa.json_content, '$.x1_39e') = '1' THEN 1 ELSE 0 END AS tik_4,
	CASE WHEN JSON_VALUE(qa.json_content, '$.x1_39f') = '1' THEN 1 ELSE 0 END AS tik_5,
	CASE WHEN JSON_VALUE(qa.json_content, '$.x1_39g') = '1' THEN 1 ELSE 0 END AS tik_6,
	
	CASE WHEN JSON_VALUE(qa.json_content, '$.x1_41a') = '1' THEN 1 ELSE 0 END AS informasi_1,
	CASE WHEN JSON_VALUE(qa.json_content, '$.x1_41b') = '1' THEN 1 ELSE 0 END AS informasi_2,
	CASE WHEN JSON_VALUE(qa.json_content, '$.x1_41c') = '1' THEN 1 ELSE 0 END AS informasi_3,
	CASE WHEN JSON_VALUE(qa.json_content, '$.x1_41d') = '1' THEN 1 ELSE 0 END AS informasi_4,
	CASE WHEN JSON_VALUE(qa.json_content, '$.x1_41e') = '1' THEN 1 ELSE 0 END AS informasi_5
FROM
	questionnaire_answer qa 
INNER JOIN
	villages v ON qa.village_id = v.id;

-- recommendation_factors definition

CREATE VIEW recommendation_factors AS
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
