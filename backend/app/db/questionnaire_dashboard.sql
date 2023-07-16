CREATE OR ALTER VIEW questionnaire_dashboard AS 
SELECT
  --- questionnaire and village identity
	qa.id AS id,
	v.id AS village_id,
	v.name AS village_name,
	
  --- jobs
	CAST(JSON_VALUE(qa.json_content, '$.x1_4') AS int) AS pekerjaan,

  --- land ownership
	CAST(JSON_VALUE(qa.json_content, '$.x1_19') AS int) AS kepemilikan_lahan,
	
  --- monthly expenses
	(
		CAST(JSON_VALUE(qa.json_content, '$.x1_30_1') AS decimal) +
		CAST(JSON_VALUE(qa.json_content, '$.x1_30_2') AS decimal) +
		CAST(JSON_VALUE(qa.json_content, '$.x1_30_3') AS decimal) + 
		CAST(JSON_VALUE(qa.json_content, '$.x1_30_4') AS decimal)
	) AS pengeluaran_bulanan,
	
  --- motivation
	CASE WHEN JSON_VALUE(qa.json_content, '$.x1_36a') = '1' THEN 1 ELSE 0 END AS motivasi_1,
	CASE WHEN JSON_VALUE(qa.json_content, '$.x1_36b') = '1' THEN 1 ELSE 0 END AS motivasi_2,
	CASE WHEN JSON_VALUE(qa.json_content, '$.x1_36c') = '1' THEN 1 ELSE 0 END AS motivasi_3,
	
  --- TIK effects
	CASE WHEN JSON_VALUE(qa.json_content, '$.x1_39b') = '1' THEN 1 ELSE 0 END AS tik_1,
	CASE WHEN JSON_VALUE(qa.json_content, '$.x1_39c') = '1' THEN 1 ELSE 0 END AS tik_2,
	CASE WHEN JSON_VALUE(qa.json_content, '$.x1_39d') = '1' THEN 1 ELSE 0 END AS tik_3,
	CASE WHEN JSON_VALUE(qa.json_content, '$.x1_39e') = '1' THEN 1 ELSE 0 END AS tik_4,
	CASE WHEN JSON_VALUE(qa.json_content, '$.x1_39f') = '1' THEN 1 ELSE 0 END AS tik_5,
	CASE WHEN JSON_VALUE(qa.json_content, '$.x1_39g') = '1' THEN 1 ELSE 0 END AS tik_6,
	
  --- inofrmation sources
	CASE WHEN JSON_VALUE(qa.json_content, '$.x1_41a') = '1' THEN 1 ELSE 0 END AS informasi_1,
	CASE WHEN JSON_VALUE(qa.json_content, '$.x1_41b') = '1' THEN 1 ELSE 0 END AS informasi_2,
	CASE WHEN JSON_VALUE(qa.json_content, '$.x1_41c') = '1' THEN 1 ELSE 0 END AS informasi_3,
	CASE WHEN JSON_VALUE(qa.json_content, '$.x1_41d') = '1' THEN 1 ELSE 0 END AS informasi_4,
	CASE WHEN JSON_VALUE(qa.json_content, '$.x1_41e') = '1' THEN 1 ELSE 0 END AS informasi_5
FROM
	questionnaire_answer qa 
INNER JOIN
	villages v ON qa.village_id = v.id;
