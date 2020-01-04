const mysql = require("mysql");
const consoleTable = require("console.table");
const env = require("dotenv").config();
const express = require("express");
const inquirer = require("inquirer");
const figlet = require("figlet");

// init();
figlet("Employee Tracker", function(err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "company"
});

connection.connect();

connection.query("SELECT * FROM employee", function(error, results, fields) {
  if (error) throw error;
  console.log(results);
});

connection.end();
