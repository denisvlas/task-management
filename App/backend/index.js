const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "admin",
  database: "task-management",
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const projectId = req.body.projectId;

  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ? AND project_id = ?",
    [username, password, projectId],
    (err, result) => {
      if (err) {
        res.send({ message: "Error" });
        return;
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Invalid username or password for this project." });
      }
    }
  );
});

app.get("/tasks/:projectId", (req, res) => {
  const sqlSelectTasks = "SELECT * FROM tasks WHERE project_id = ?";
  const projectId = req.params.projectId;

  db.query(sqlSelectTasks, [projectId], (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.json(result);
    }
  });
});

app.get("/users/:projectId", (req, res) => {
  const projectId = req.params.projectId;
  const sqlSelectUsers = "SELECT * FROM users WHERE project_id = ?";
  db.query(sqlSelectUsers, [projectId], (err, result) => {
    if (err) {
      return err;
    }
    res.json(result);
    console.log(result);
  });
});
app.get("/projects", (req, res) => {
  const sqlSelectProjects = "SELECT * FROM projects";
  db.query(sqlSelectProjects, (err, result) => {
    if (err) {
      return err;
    }
    res.json(result);
  });
});
app.delete("/delete-all/:projectId", (req, response) => {
  const projectId = req.params.projectId;
  db.query(
    "DELETE FROM tasks WHERE project_id = ?",
    [projectId],
    (err, res) => {
      if (err) {
        console.log(err);
        response.status(500).send("Internal Server Error");
      } else {
        db.query("ALTER TABLE tasks AUTO_INCREMENT=1");
        console.log(res);
        response.status(200).send("Deleted all tasks successfully");
      }
    }
  );
});

app.get("/get-last-id", (req, response) => {
  db.query("SELECT MAX(id) FROM tasks", (err, res) => {
    if (err) {
      console.log(err);
    } else {
      response.send(res);
    }
  });
});

app.delete("/delete-task/:taskId", (req, response) => {
  const taskId = req.params.taskId;
  db.query("DELETE FROM tasks WHERE id = ?", [taskId], (err, res) => {
    if (err) {
      console.log(err);
      response.status(500).send("Internal server Error");
    } else {
      console.log(res);
      response.status(200).send(`Deleted task with id ${taskId}`);
    }
  });
});

app.post("/add-task", (req, res) => {
  const { title, status, description, comment, userId, projectId } = req.body;

  const sqlAddTask =
    "INSERT INTO tasks (title, status, description, comment, user_id, project_id) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sqlAddTask,
    [title, status, description, comment, userId, projectId],
    (err, result) => {
      if (err) {
        res.send({ message: "Error adding task." });
      } else {
        res.send({ message: "Task added successfully." });
      }
    }
  );
});

app.put("/update-task/:taskId", (req, res) => {
  const title = req.body.title;
  const status = req.body.status;
  const description = req.body.description;
  const comment = req.body.comment;
  const userId = req.body.userId;

  const taskId = req.params.taskId;
  const sqlUpdateTask =
    "UPDATE tasks SET title = ?, status = ?, description = ?, comment = ?, user_id = ? WHERE id = ?";

  db.query(
    sqlUpdateTask,
    [title, status, description, comment, userId, taskId],
    (err, result) => {
      if (err) {
        res.send({ message: "Error updating task." });
      } else {
        res.send({ message: "Task updated successfully." });
      }
    }
  );
});

app.get("/get-user-id/:username/:projectId", (req, res) => {
  const username = req.params.username;
  const projectId = req.params.projectId;

  db.query(
    "SELECT id FROM users WHERE username = ? AND project_id = ?",
    [username, projectId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (result.length === 0) {
        return res
          .status(404)
          .json({ error: "User not found for this project" });
      }

      const userId = result[0].id;
      return res.json({ userId });
    }
  );
});

app.post("/add-project", (req, res) => {
  const name = req.body.name;
  const url = req.body.url;
  const sqlAddProject = "INSERT INTO projects (name,img) VALUES (?,?)";
  db.query(sqlAddProject, [name, url], (err, result) => {
    if (err) {
      return console.log(err);
    }
    return result;
  });
});

app.post("/reg", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const projectId = req.body.projectId;

  db.query(
    "SELECT * FROM users WHERE username = ? AND project_id = ?",
    [username, projectId],
    (err, result) => {
      if (err) {
        return console.log(err);
      }

      if (result.length > 0) {
        return res.send({
          warning: "A user with this username already exists in this project.",
        });
      }

      const sqlRegUser =
        "INSERT INTO users (username, password, project_id) VALUES (?, ?, ?)";

      db.query(sqlRegUser, [username, password, projectId], (err, result) => {
        if (err) {
          return console.log(err);
        }

        return res.send({
          message: "User registered successfully in this project.",
        });
      });
    }
  );
});

app.get("/current-user/:username", (req, res) => {
  const username = req.params.username;
  res.json({ username });
});

app.listen(3001, () => {
  console.log("running server");
});
