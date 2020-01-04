USE company;

INSERT INTO department
    (id, name)
VALUES
    (NULL, "IT"),
    (NULL, "HR"),
    (NULL, "Administration"),
    (NULL, "Legal"),
    (NULL, "Sales");

INSERT INTO role
    (id, department_id, title, salary)
VALUES
    (NULL, 1, "Junior Web Developer", 2000.0),
    (NULL, 1, "Senior Web Developer", 3000.0),
    (NULL, 1, "Lead Software Engineer", 4500.0),
    (NULL, 2, "HR Assistant", 1200.0),
    (NULL, 2, "HR Manager", 3400.0),
    (NULL, 2, "Payroll Clerk", 1200.0),
    (NULL, 3, "Administrative Assistant", 1000.0),
    (NULL, 3, "Administrative Office Manager", 2500.0),
    (NULL, 3, "Receptionist", 750.0),
    (NULL, 4, "Legal Assistant", 4000.0),
    (NULL, 4, "Legal Manager", 5000.0),
    (NUll, 5, "Sales Manager", 4000.0),
    (NULL, 5, "Sales Representative", 2500.0),
    (NULL, 5, "Digital Sales Representative", 3000.0);

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (NULL, "Lilly", "Rose", 1, 3),
    (NULL, "Heather", "Oak", 2, 3),
    (NULL, "Willow", "Moss", 3, NULL),
    (NULL, "Violet", "Meadow", 5, 6),
    (NULL, "Bee", "Hornet", 6, NULL),
    (NULL, "Chris", "Pine", 7, 6),
    (NULL, "Daisy", "Birch", 8, 9),
    (NULL, "Marigold", "Dill", 9, NULL),
    (NULL, "Anne", "Mone", 10, 9),
    (NULL, "Summer", "Gone", 11, 12),
    (NULL, "Newt", "Crow", 12, NULL),
    (NULL, "Sky", "Fall", 13, NULL),
    (NULL, "Cyd", "Harris", 14, 13),
    (NULL, "Dolores", "Haze", 15, 13);