-- Opcional: crear base de datos
-- CREATE DATABASE IF NOT EXISTS my_database;
-- USE my_database;

-- Tabla User
CREATE TABLE User (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE (email)
);

-- Tabla Habit
CREATE TABLE Habit (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (id)
);

-- Tabla HabitDetail
CREATE TABLE HabitDetail (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    habitDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NULL DEFAULT NULL,
    idHabit INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (idHabit) REFERENCES Habit(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Tabla HabitsOnUsers (tabla intermedia muchos-a-muchos)
CREATE TABLE HabitsOnUsers (
    idHabit INT NOT NULL,
    idUser INT NOT NULL,
    assignedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    assignedBy VARCHAR(255),
    PRIMARY KEY (idHabit, idUser),
    FOREIGN KEY (idHabit) REFERENCES Habit(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (idUser) REFERENCES User(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Tabla Role
CREATE TABLE Role (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (id)
);

-- Tabla UserRole (tabla intermedia muchos-a-muchos)
CREATE TABLE UserRole (
    idUser INT NOT NULL,
    idRole INT NOT NULL,
    assignedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    assignedBy VARCHAR(255) NOT NULL,
    PRIMARY KEY (idUser, idRole),
    FOREIGN KEY (idUser) REFERENCES User(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (idRole) REFERENCES Role(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);
