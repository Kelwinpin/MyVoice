CREATE TABLE parents (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  role VARCHAR(255),
  created_at TIMESTAMP
);

CREATE TABLE kid (
  id SERIAL PRIMARY KEY,
  parent_id INTEGER,
  gender VARCHAR(255),
  created_at TIMESTAMP,
  CONSTRAINT fk_parent FOREIGN KEY (parent_id) REFERENCES parents (id)
);

CREATE TABLE activities (
  id SERIAL PRIMARY KEY,
  image VARCHAR(255),
  type INTEGER,
  description VARCHAR(255),
  sound VARCHAR(255)
);

CREATE TABLE kid_activity (
  id SERIAL PRIMARY KEY,
  kid_id INTEGER,
  activity_id INTEGER,
  CONSTRAINT fk_activity FOREIGN KEY (activity_id) REFERENCES activities (id),
  CONSTRAINT fk_kid FOREIGN KEY (kid_id) REFERENCES kid (id)
);

CREATE TABLE activityType (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  CONSTRAINT fk_activity_type FOREIGN KEY (activity_id) REFERENCES activities (id)
);

ALTER TABLE activities
  ADD CONSTRAINT fk_type FOREIGN KEY (type) REFERENCES activityType (id);
