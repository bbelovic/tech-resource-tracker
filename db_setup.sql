CREATE DATABASE integration_testing;
\connect integration_testing postgres
CREATE TABLE technology_resources (
    id BIGSERIAL NOT NULL,
    title VARCHAR(256) NOT NULL,
    PRIMARY KEY(id));
INSERT INTO technology_resources (title) VALUES ('Some title');