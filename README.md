# Employee Tracker

A command line CMS to view and modify employee data of a small to medium company.

## Installation

<ul><li>Install MySQL Workbench and use the schema.sql file to create the database. You can insert your own data or use the seed.sql file provided</li>
<li>In your node command line, type npm install</li>
<li>Create an .env file where you will save your database password. (For example `DB_PASSWORD = yourpassword`). This is the same password you provided during the MySQL Workbench setup. </li>
<li>Type `npm run start` in the node command line to start the application.</li>

</ul>

## Instructions

The program uses inquirer prompts to ask questions and present the user with options:

![Employee tracker](/assets/EmployeeTracker.png)
