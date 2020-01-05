const makeDb = require("./connection");

async function getAllEmployees() {
  const db = makeDb();
  try {
    const allEmployees = await db.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
    return allEmployees;
  } catch (err) {
    throw new Error("Unable to display all employees", err);
  } finally {
    await db.close();
  }
}

async function displayAllRoles() {
  const db = makeDb();
  try {
    const allRoles = await db.query(
      "SELECT role.id, department.name AS department, role.title, role.salary FROM role LEFT JOIN department on role.department_id = department.id"
    );
    return allRoles;
  } catch (err) {
    throw new Error("Unable to display all roles", err);
  } finally {
    await db.close();
  }
}

async function getAllDepartments() {
  const db = makeDb();
  try {
    const allDepartments = await db.query("SELECT * FROM department");
    return allDepartments;
  } catch (err) {
    throw new Error("Unable to display all departments", err);
  } finally {
    await db.close();
  }
}

async function addDepartment(departmentName) {
  const db = makeDb();
  try {
    await db.query("INSERT INTO department SET ?", departmentName);
  } catch (err) {
    throw new Error("Unable to add a new department", err);
  } finally {
    await db.close();
  }
}

async function addEmployee(newEmployee) {
  const db = makeDb();
  try {
    await db.query("INSERT INTO employee SET ?", newEmployee);
  } catch (err) {
    throw new Error("Unable to add a new employee", err);
  } finally {
    await db.close();
  }
}

async function addRole(newRole) {
  const db = makeDb();
  try {
    await db.query("INSERT INTO role SET ?", newRole);
  } catch (err) {
    throw new Error("Unable to add a new role", err);
  } finally {
    await db.close();
  }
}

async function updateEmployeeRole(employeeId, roleId) {
  const db = makeDb();
  try {
    await db.query("UPDATE employee SET role_id = ? WHERE id = ?", [
      roleId,
      employeeId
    ]);
  } catch (err) {
    throw new Error("Unable to add a new role", err);
  } finally {
    await db.close();
  }
}

module.exports = {
  getAllEmployees,
  displayAllRoles,
  getAllDepartments,
  addDepartment,
  addEmployee,
  addRole,
  updateEmployeeRole
};
