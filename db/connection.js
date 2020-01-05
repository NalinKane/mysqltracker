const mysql = require("mysql");
const consoleTable = require("console.table");
const env = require("dotenv").config();
const express = require("express");
const inquirer = require("inquirer");
const figlet = require("figlet");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "company"
};

const questions = [
  {
    type: "list",
    name: "choices",
    message: `What would you like to do?`,
    choices: ["View all employees", "View all departments", "View all roles"]
  },
  {
    type: "list",
    name: "additions",
    message: `What would you like to do?`,
    choices: ["Add an employee", "Add a department", "Add a role"]
  },

  {
    name: "name",
    message: "What would you like to call the new department?"
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
      addDepartment();
      break;

    default:
      return;
  }
}

function displayEmployees() {
  const connection = mysql.createConnection(dbConfig);

  connection.connect();

  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;",
    function(error, results) {
      if (error) throw error;
      console.table(results);
      furtherQuestions();
    }
  );

  connection.end();
}

function displayDepartments() {
  const connection = mysql.createConnection(dbConfig);

  connection.connect();

  connection.query("SELECT * FROM department", function(error, results) {
    if (error) throw error;
    console.table(results);
    furtherQuestions();
  });

  connection.end();
}

function displayRoles() {
  const connection = mysql.createConnection(dbConfig);

  connection.connect();

  connection.query(
    "SELECT department.name AS department, role.title, role.salary FROM role LEFT JOIN department on role.department_id = department.id",
    function(error, results) {
      if (error) throw error;
      console.table(results);
      furtherQuestions();
    }
  );

  connection.end();
}

async function addDepartment() {
  const department = await inquirer.prompt(questions[2]);
  const connection = mysql.createConnection(dbConfig);

  connection.connect();

  connection.query("INSERT INTO department SET ?", department);
  connection.end();
}

async function displayInitialChoices() {
  const { choices } = await inquirer.prompt(questions[0]);
  return choices;
}

async function displayAdditionChoices() {
  const { additions } = await inquirer.prompt(questions[1]);
  return additions;
}

init();
