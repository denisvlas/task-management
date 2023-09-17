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

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const projectId = req.body.projectId;
  
    db.query('SELECT * FROM users WHERE username = ? AND password = ? AND project_id = ?', [username, password, projectId], (err, result) => {
      if (err) {
        res.send({ message: 'Error' });
        return;
      }
  
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: 'Invalid username or password for this project.' });
      }
    });
  });
  

app.get("/users", (req, res) => {
  const sqlSelectUsers = "SELECT id,username FROM users";
  db.query(sqlSelectUsers, (err, result) => {
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

app.post('/reg', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const projectId = req.body.projectId; // ID-ul proiectului specific

    // Verifică dacă există deja un utilizator cu același nume de utilizator în același proiect
    db.query('SELECT * FROM users WHERE username = ? AND project_id = ?', [username, projectId], (err, result) => {
        if (err) {
            return console.log(err);
        }

        if (result.length > 0) {
            return res.send({ warning: 'A user with this username already exists in this project.' });
        }

        // Dacă nu există, continuă cu înregistrarea în proiectul specific
        const sqlRegUser = 'INSERT INTO users (username, password, project_id) VALUES (?, ?, ?)';

        db.query(sqlRegUser, [username, password, projectId], (err, result) => {
            if (err) {
                return console.log(err);
            }

            return res.send({ message: 'User registered successfully in this project.' });
        });
    });
});


app.get("/current-user/:username", (req, res) => {
  const username = req.params.username;
  res.json({ username });
});

app.listen(3001, () => {
  console.log("running server");
});
