steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(100) NOT NULL,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            hashed_password VARCHAR(100) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE pet (
            id SERIAL PRIMARY KEY NOT NULL,
            pet_name VARCHAR(100) NOT NULL,
            breed VARCHAR(100) NOT NULL,
            gender VARCHAR(100) NOT NULL,
            age INTEGER NOT NULL,
            weight INTEGER NOT NULL,
            pet_pic VARCHAR(500),
            user_id INTEGER NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users (id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE pet;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE poop (
            id SERIAL PRIMARY KEY NOT NULL,
            date DATE NOT NULL,
            time TIME NOT NULL,
            consistency VARCHAR(100) NOT NULL,
            pet_id INTEGER NOT NULL,
            FOREIGN KEY (pet_id) REFERENCES pet (id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE poop;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE sleep (
            id SERIAL PRIMARY KEY NOT NULL,
            date DATE NOT NULL,
            time TIME NOT NULL,
            duration VARCHAR(100) NOT NULL,
            pet_id INTEGER NOT NULL,
            FOREIGN KEY (pet_id) REFERENCES pet (id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE sleep;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE walk (
            id SERIAL PRIMARY KEY NOT NULL,
            date DATE NOT NULL,
            time TIME NOT NULL,
            duration VARCHAR(100) NOT NULL,
            pet_id INTEGER NOT NULL,
            FOREIGN KEY (pet_id) REFERENCES pet (id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE walk;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE feeding (
            id SERIAL PRIMARY KEY NOT NULL,
            date DATE NOT NULL,
            time TIME NOT NULL,
            food_type VARCHAR(100) NOT NULL,
            amount VARCHAR(100) NOT NULL,
            pet_id INTEGER NOT NULL,
            FOREIGN KEY (pet_id) REFERENCES pet (id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE feeding;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE immunization (
            id SERIAL PRIMARY KEY NOT NULL,
            vaccination VARCHAR(1000) NOT NULL,
            date DATE NOT NULL,
            date_valid_until DATE NOT NULL,
            pet_id INTEGER NOT NULL,
            FOREIGN KEY (pet_id) REFERENCES pet (id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE immunization;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE medical (
            id SERIAL PRIMARY KEY NOT NULL,
            description VARCHAR(1000) NOT NULL,
            veterinarian VARCHAR(1000) NOT NULL,
            prescriptions VARCHAR(1000) NOT NULL,
            date DATE NOT NULL,
            pet_id INTEGER NOT NULL,
            FOREIGN KEY (pet_id) REFERENCES pet (id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE medical;
        """,
    ],
]
