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
	json_content text,

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
	json_result text,

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
	json_alternatives text,
	json_factors text,

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
