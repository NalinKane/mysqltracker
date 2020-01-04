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

async function init() {
  renderAppTitle();

  const choice = await displayQuestions();
  handleChoice(choice);
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
    default:
      return;
  }
}

function displayEmployees() {
  const connection = mysql.createConnection(dbConfig);

  connection.connect();

  connection.query("SELECT * FROM employee", async function(error, results) {
    if (error) throw error;
    console.table(results);
  });

  connection.end();
}

function displayDepartments() {
  const connection = mysql.createConnection(dbConfig);

  connection.connect();

  connection.query("SELECT * FROM department", async function(error, results) {
    if (error) throw error;
    console.table(results);
  });

  connection.end();
}

function displayRoles() {
  const connection = mysql.createConnection(dbConfig);

  connection.connect();

  connection.query("SELECT * FROM role", async function(error, results) {
    if (error) throw error;
    console.table(results);
  });

  connection.end();
}

async function displayQuestions() {
  const { choices } = await inquirer.prompt([
    {
      type: "list",
      name: "choices",
      message: `What would you like to do?`,
      choices: ["View all employees", "View all departments", "View all roles"]
    }
  ]);
  return choices;
}

init();
