CREATE TABLE users (
  id SERIAL  PRIMARY KEY,
  user_name VARCHAR(75) NOT NULL,
  user_email VARCHAR(75) NOT NULL,
  user_password VARCHAR(100) NOT NULL
);

CREATE TABLE trips (
  id SERIAL  PRIMARY KEY,
  name VARCHAR(50),
  image_URL TEXT,
  location VARCHAR(75),
  star_rating INT,
  start_date timestamp,
  end_date timestamp,
  created_at timestamp,
  user_id INT NOT NULL
);

CREATE TABLE journals (
  id SERIAL  PRIMARY KEY,
  title VARCHAR(75),
  description TEXT,
  created_at timestamp,
  trip_id INT NOT NULL
);

ALTER TABLE trips ADD FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE journals ADD FOREIGN KEY (trip_id) REFERENCES trips (id);
