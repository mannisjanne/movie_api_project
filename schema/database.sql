CREATE TABLE users(
    id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    PRIMARY KEY (user_id)
);
CREATE TABLE movie(
    id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255),
    release_year INT,
    genre_id INT,
    PRIMARY KEY (movie_id),
    FOREIGN KEY (genre_id)
);
CREATE TABLE genre(
    id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255),
    PRIMARY KEY (genre_id)
);
CREATE TABLE favorite(
    id INT GENERATED ALWAYS AS IDENTITY,
    movie_id INT,
    user_id INT,
    PRIMARY KEY (favorite_id),
    FOREIGN KEY (movie_id),
    FOREIGN KEY (user_id)
);
CREATE TABLE review(
    id INT GENERATED ALWAYS AS IDENTITY,
    rating INT,
    comment VARCHAR(255),
    movie VARCHAR(255),
    review_text TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (movie_id),
    FOREIGN KEY (user_id)
)