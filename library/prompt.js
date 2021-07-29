const mysql = require('mysql2');
const inquirer = require('inquirer')
// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: '',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );

function questionPrompt() {
    inquirer
        .prompt([{
            type: "list",
            message: "Welcome to the Dallas Cowboys employee database, please choose from the options below:",
            choices: [
                "View All Team Members",
                "View Team Roles",
                "View All Departments",
                "Add A Team Department",
                "Add A Team Role",
                "Add A Team Member",
                "Quit",
            ],
            name: "answer",
        }, ])
        .then((answer) => {
            let question = answer.answer;
            switch (question) {
                case "View All Team Members":
                    viewAllTeamMembers();
                    break;
                case "View Team Roles":
                    viewTeamRoles();
                    break;
                case "View All Departments":
                    viewAllDepartments();
                    break;
                case "Add A Team Department":
                    addTeamDepartment();
                    break;
                case "Add A Team Role":
                    addTeamRole();
                    break;
                case "Add A Team Member":
                    addTeamMember();
                    break;
                case "Quit":
                    return;
            }
        });
    }

function viewAllTeamMembers() {
    db.query(
        "SELECT employee.id employee_id, CONCAT(employee.first_name, ' ', employee.last_name) AS employee_name, employee_role.title, department.department_name AS department, employee_role.salary, CONCAT(coach.first_name, ' ', coach.last_name) AS coach_name FROM employee employee LEFT JOIN employee coach ON employee.coach_id = coach.id INNER JOIN employee_role ON (employee_role.id = employee.role_id) INNER JOIN department ON (department.id = employee_role.department_id) ORDER BY employee.id;",
        (err, answer) => {
            if (err) {
                console.log(err);
            }
            console.table(answer);
            questionPrompt();
        }
    );

}

function viewTeamRoles() {
    db.query(
        "SELECT department.id, title, department.department_name AS department, salary FROM employee_role employee_role INNER JOIN department department ON employee_role.department_id = department.id;",
        (err, answer) => {
            if (err) {
                console.log(err);
            }
            console.table(answer);
            questionPrompt();
        }
    );
}

function viewAllDepartments() {
    db.query(
        "SELECT id, department_name AS department FROM department;",
        (err, answer) => {
            if (err) {
                console.log(err);
            }
            console.table(answer);
            questionPrompt();
        }
    );
}

let departmentName = ["Offensive", "Defensive", "Coach", "KickOff", "Punt Return"];


function addTeamMember() {
    inquirer
        .prompt([{
                type: "input",
                message: "What is Team Member's id?",
                name: "employee_id",
            },
            {
                type: "input",
                message: "What is Team Member's first name?",
                name: "employee_first_name",
            },
            {
                type: "input",
                message: "What is Team Member's last name?",
                name: "employee_last_name",
            },
            {
                type: "list",
                message: "What is Team Member's role?",
                name: "employee_role",
                choices: [
                    "Quaterback",
                    "Running Back",
                    "Wide Reciever",
                    "Defensive End",
                    "Linebacker",
                    "Offensive Coordinator", 
                    "Defensive Coordinator",
                ],
            },
            {
                type: "list",
                message: "Who is the Team Member's Coach?",
                name: "teamMemberCoach",
                choices: [
                    "Kellen Moore",
                    "Dan Quinn", 
                    "None",
                ],
            },
        ])
        .then((answer) => {
            console.table
            (answer);
            let employee_id = answer.employee_id;
            let employee_first_name = answer.employee_firstName;
            let employee_last_name = answer.employee_lastName;
            let employee_role = answer.employee_Role;
            let teamMemberCoach = answer.employee_manager;
            db.query(
                `INSERT INTO employee (id, first_name, last_name, role_id, coach_id) VALUES (${employee_id},${employee_first_name},${employee_last_name},${employee_role}','${teamMemberCoach}')`,
                (err, results) => {
                    if (err) throw err;
                    console.table(`\n Added ${employee_last_name} to the Team!\n `);
                }
            );

            questionPrompt();
        });

}

teamRoleArray = []

function addTeamRole() {
    inquirer
        .prompt([{
                type: "input",
                message: "What is the name of the Team Role?",
                name: "teamRole",
            },
            {
                type: "input",
                message: "What is the salary  of the Team Role?",
                name: "salary",
            },

            // {
            //     type: "list",
            //     message: "What is name of the department?",
            //     name: "departmentName",
            //     choices: departmentName,
            // },
        ])
        .then((answer) => {
            console.table(answer);
            let teamRole = answer.teamRole;
            let salary = answer.salary;
            // let departmentName = answer.departmentName;
            // // teamRoleArray.push(teamRole);
            // teamRoleArray.push(salary);
            // teamRoleArray.push(departmentName);
            db.query(
                `INSERT INTO employee_role(title, salary) VALUES("${teamRole}", ${salary});`,
                function(err, results) {
                    if (err) throw err;

                    console.log("added successfully");
                }
            );
            questionPrompt();
        });

}




function addTeamDepartment() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What is name of the department?",
                name: "name",
                choices: ["Offensive", "Defensive", "Coach", "KickOff", "Punt Return"],
            },
            {
                type: "list",
                message: "Which department does the role belong to?",
                name: "belong",
                choices: departmentName,
            },
        ])
        .then((answer) => {
            console.table(answer)
            let Name = answer.name;
            departmentName.push(Name);
            db.query(
                `INSERT INTO department(id, department_name) VALUES(005, "${Name}");`,
                function(err, answer) {
                    if (err) return err;

                    console.table(answer);
                }
            );
            questionPrompt();
        });

}
questionPrompt();
