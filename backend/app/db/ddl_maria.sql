-- users definition

CREATE TABLE users (
	id varchar(30) NOT NULL,
	full_name varchar(255) NOT NULL,
	username varchar(255) NOT NULL,
	hashed_password varchar(60) NOT NULL,
	role_code tinyint NOT NULL,
	is_protected bit NOT NULL,

	CONSTRAINT pk_users PRIMARY KEY (id)
);

CREATE UNIQUE INDEX ix_users_username ON users(username ASC);


-- villages definition

CREATE TABLE villages (
	id varchar(30) NOT NULL,
	name varchar(255) NOT NULL,

	CONSTRAINT pk_villages PRIMARY KEY (id)
);

CREATE UNIQUE INDEX ix_villages_name ON villages ( name ASC );


-- village_investment definition

CREATE TABLE village_investment (
	id varchar(30) NOT NULL,
	village_id varchar(30) NOT NULL,
	kesiapan_warga DECIMAL(12,2) NOT NULL,
  kerja_sama DECIMAL(12,2) NOT NULL,
  infrastruktur DECIMAL(12,2) NOT NULL,

	CONSTRAINT pk_village_investment PRIMARY KEY (id),
	CONSTRAINT fk_village_investment_villages_village_id FOREIGN KEY (village_id) REFERENCES villages(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX ix_village_investment_village_id ON village_investment ( village_id ASC );


-- questionnaire_answer definition

CREATE TABLE questionnaire_answer (
	id varchar(30) NOT NULL,
	village_id varchar(30) NOT NULL,
	name varchar(255) NOT NULL,
	sex tinyint NOT NULL,
	phone varchar(18) NOT NULL,
	status tinyint NOT NULL,
	work_class varchar(50) NOT NULL,
	json_content text NOT NULL,

	CONSTRAINT pk_questionnaire_answer PRIMARY KEY (id),
	CONSTRAINT fk_questionnaire_answer_village_village_id FOREIGN KEY (village_id) REFERENCES villages(id) ON DELETE CASCADE
);

CREATE INDEX ix_questionnaire_answer_village_id ON questionnaire_answer ( village_id ASC );


-- synthesis_citizen_science definition

CREATE TABLE synthesis_citizen_science (
	id varchar(30) NOT NULL,
	village_id varchar(30) NULL,
	sempls_order tinyint NOT NULL,
	status tinyint NOT NULL,
	json_result text DEFAULT '' NOT NULL,

	CONSTRAINT pk_synthesis_citizen_science PRIMARY KEY (id),
	CONSTRAINT fk_synthesis_citizen_science_village_village_id FOREIGN KEY (village_id) REFERENCES villages(id) ON DELETE CASCADE
);

CREATE INDEX ix_synthesis_citizen_science_village_id ON synthesis_citizen_science ( village_id ASC );


-- synthesis_cooperation definition

CREATE TABLE synthesis_cooperation (
	id varchar(30) NOT NULL,
	village_id varchar(30) NULL,
	expert_name varchar(255) NOT NULL,
	status int NOT NULL,
	cr float DEFAULT 0 NOT NULL,
	json_alternatives text DEFAULT '' NOT NULL,
	json_factors text DEFAULT '' NOT NULL,

	CONSTRAINT pk_synthesis_cooperation PRIMARY KEY (id),
	CONSTRAINT fk_synthesis_cooperation_village_village_id FOREIGN KEY (village_id) REFERENCES villages(id) ON DELETE CASCADE
);

CREATE INDEX ix_synthesis_cooperation_village_id ON synthesis_cooperation ( village_id ASC );

-- synthesis_infrastructure definition

CREATE TABLE synthesis_infrastructure (
	id varchar(30) NOT NULL,
	village_id varchar(30) NULL,
	object_id int NOT NULL,
	village_index float NOT NULL,
	potential varchar(255) NOT NULL,
	market float NOT NULL,
	roads float NOT NULL,
	schools float NOT NULL,
	internet float NOT NULL,
	social_media float NOT NULL,
	irrigation float NOT NULL,
	banks float NOT NULL,
	cooperation float NOT NULL,
	umkm float NOT NULL,
	community float NOT NULL,
	tradition float NOT NULL,
	university float NOT NULL,
	regulation float NOT NULL,

	CONSTRAINT pk_synthesis_infrastructure PRIMARY KEY (id),
	CONSTRAINT fk_synthesis_infrastructure_villages_village_id FOREIGN KEY (village_id) REFERENCES villages(id)
);

CREATE INDEX ix_synthesis_infrastructure_village_id ON synthesis_infrastructure ( village_id ASC );

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
