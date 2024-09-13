CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  google_id VARCHAR(255) UNIQUE,
  name VARCHAR(100),
  username VARCHAR(100) UNIQUE,
  email VARCHAR(100),
  password VARCHAR(200),
  created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE code (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(100),
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

