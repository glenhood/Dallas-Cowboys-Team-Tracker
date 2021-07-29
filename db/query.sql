SELECT first_name, last_name, title, department_name, salary, coach_id, role_id
FROM department 
INNER JOIN  employee_role 
ON employee_role.department_id = department.id
INNER JOIN employee 
ON employee.role_id = employee.role_id;

SELECT employee.id, first_name, last_name, title, department_name AS department, salary, coach_id, role_id
FROM department, employee_role, employee 
WHERE department_id = department_id AND role_id = role_id;

SELECT  employee.id, first_name, last_name, title, salary, department_name AS department, coach_id, role_id
FROM employee 
INNER JOIN  employee_role
ON role_id = role_id
INNER JOIN department
ON department_id = department_id;

SELECT employee.id employee_id, CONCAT(employee.first_name, ' ', employee.last_name) AS employee_name, employee_role.title, department.department_name AS department, employee_role.salary, CONCAT(coach.first_name, ' ', coach.last_name) AS coach_name FROM employee employee LEFT JOIN employee coach ON employee.coach_id = coach.id INNER JOIN employee_role ON (employee_role.id = employee.role_id) 
INNER JOIN department ON (department.id = employee_role.department_id) ORDER BY employee.id;
