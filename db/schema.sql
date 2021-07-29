DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30)

);
CREATE TABLE employee_role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL

);
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    coach_id INT REFERENCES employee(id),
    FOREIGN KEY (role_id)
    REFERENCES employee_role(id)
	ON DELETE SET NULL

);

INSERT INTO department (id, department_name)
VALUES (01, "Offensive"),
       (02, "Defensive"),
       (03, "Coach");
        


INSERT INTO employee_role (id, title, salary, department_id)
VALUES (11, "Quaterback", 10000000, 01),
       (12, "Running Back", 4000000, 01),
       (13, "Wide Reciever", 6000000, 01),
       (14, "Defensive End", 8000000, 02),
       (15, "Linebacker", 3000000, 02),
       (16, "Offensive Coordinator", 3000000, 03),
       (17, "Defensive Coordinator", 1000000, 03);
       

INSERT INTO employee (id, first_name, last_name, role_id, coach_id)
VALUES (21, "Dak", "Prescott", 11, 40),
       (22, "Ezekiel", "Elliot", 12, 40),
       (23, "Amari", "Cooper", 13, 40),
       (24, "DeMarcus", "Lawrence", 14, 30),
       (25, "Micah", "Parsons", 15, 30),
       (40, "Kellen", "Moore", 16, NULL),
       (30, "Dan", "Quinn", 17, NULL);
       




