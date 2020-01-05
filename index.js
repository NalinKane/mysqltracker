require("dotenv").config();

const consoleTable = require("console.table");
const { prompt } = require("inquirer");
const figlet = require("figlet");
const {
  getAllEmployees,
  displayAllRoles,
  getAllDepartments,
  addDepartment,
  addEmployee,
  addRole,
  updateEmployeeRole
} = require("./db");

const questions = [
  {
    type: "list",
    name: "choices",
    message: `What would you like to do?`,
    choices: [
      "View all employees",
      "View all departments",
      "View all roles",
      "Quit"
    ]
  },
  {
    type: "list",
    name: "additions",
    message: `What would you like to do?`,
    choices: [
      "Add an employee",
      "Add a department",
      "Add a role",
      "Update employee role"
    ]
  },

  {
    name: "name",
    message: "What would you like to call the new department?"
  },

  {
    name: "first_name",
    message: "What is the new employee's first name?"
  },
  {
    name: "last_name",
    message: "What is the new employee's last name?"
  },
  {
    name: "title",
    message: "What is the name of this new role?"
  },
  {
    name: "salary",
    message: "How much does it pay?"
  }
];

async function init() {
  renderAppTitle();

  const initialQs = await displayInitialChoices();
  handleChoice(initialQs);
}

async function furtherQuestions() {
  const additions = await displayAdditionChoices();
  handleChoice(additions);
}

function renderAppTitle() {
  console.log(figlet.textSync("Employee Tracker"));
}

function handleChoice(choice) {
  switch (choice) {
    case "View all employees":
      displayEmployees();
      break;

    case "View all departments":
      displayDepartments();
      break;

    case "View all roles":
      displayRoles();
      break;
    case "Add a department":
      addNewDepartment();
      break;
    case "Add an employee":
      addNewEmployee();
      break;

    case "Add a role":
      addNewRole();
      break;

    case "Update employee role":
      updateRole();
      break;
    default:
      return quit();
  }
}

async function displayEmployees() {
  const allEmployees = await getAllEmployees();
  console.table(allEmployees);

  furtherQuestions();
}

async function displayDepartments() {
  const allDepartments = await getAllDepartments();
  console.table(allDepartments);
  furtherQuestions();
}

async function displayRoles() {
  const roles = await displayAllRoles();
  console.table(roles);
  furtherQuestions();
}

async function addNewDepartment() {
  const departmentName = await prompt(questions[2]);
  await addDepartment(departmentName);
  const initialQs = await displayInitialChoices();
  handleChoice(initialQs);
}

async function addNewEmployee() {
  const roles = await displayAllRoles();

  const employee = await prompt([questions[3], questions[4]]);

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { roleId } = await prompt({
    type: "list",
    name: "roleId",
    message: "What is the employee's role?",
    choices: roleChoices
  });

  employee.role_id = roleId;

  await addEmployee(employee);

  const initialQs = await displayInitialChoices();
  handleChoice(initialQs);
}

async function addNewRole() {
  const allDepartments = await getAllDepartments();

  const departmentChoices = allDepartments.map(({ id, name }) => ({
    name,
    value: id
  }));

  const newRole = await prompt([
    {
      type: "list",
      name: "department_id",
      message: "Which department is the new role in?",
      choices: departmentChoices
    },
    questions[5],
    questions[6]
  ]);

  await addRole(newRole);

  const initialQs = await displayInitialChoices();
  handleChoice(initialQs);
}

async function updateRole() {
  const allEmployees = await getAllEmployees();

  const employeeList = allEmployees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee's role do you want to update?",
      choices: employeeList
    }
  ]);

  const roles = await displayAllRoles();

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { roleId } = await prompt({
    type: "list",
    name: "roleId",
    message: "What is the employee's new role?",
    choices: roleChoices
  });

  await updateEmployeeRole(employeeId, roleId);

  const initialQs = await displayInitialChoices();
  handleChoice(initialQs);
}

async function displayInitialChoices() {
  const { choices } = await prompt(questions[0]);
  return choices;
}

async function displayAdditionChoices() {
  const { additions } = await prompt(questions[1]);
  return additions;
}

function quit() {
  console.log("Mainframe terminated!");
  process.exit();
}

init();
