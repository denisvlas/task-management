const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const PORT = 3001;

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "todo-tasks",
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.delete('/api/delete-all', (req, res, next) => {
    const sqlDeleteALL = "DELETE FROM tasks";
    const sqlResetIndex = "ALTER TABLE tasks AUTO_INCREMENT = 1";

    db.query(sqlDeleteALL, (err, result) => {
        if (err) {
            return next(err);
        }
        db.query(sqlResetIndex, (err) => {
            if (err) {
                return next(err);
            }
            res.json({ message: "All records have been deleted" });
        });
    });
});


app.delete('/api/delete/:id',(req,res)=>{
    const id=req.params.id
    const sqlDelete='DELETE FROM tasks WHERE id = ?'

    db.query(sqlDelete,id,(err,result)=>{
        if(err)
        console.log(err)
    })
})


app.put('/api/update-task/:id',(req,res)=>{
    const id=req.params.id
    const newTask=req.body.task

    const sqlUpdateTask='UPDATE tasks SET task = ? WHERE id = ?'

    db.query(sqlUpdateTask,[newTask,id],(err,result)=>{
        if(err){
            console.log(err)
            res.status(500).json({error:"eroare aparuta update task"})
        }else{
            res.json({message:'record task updated successfully'})
        }
    })
})


app.put('/api/update-status/:id',(req,res)=>{

    const id=req.params.id
    const newStatus=req.body.status

    const sqlUpdateStatus='UPDATE tasks SET status = ? WHERE id = ?'

    db.query(sqlUpdateStatus,[newStatus,id],(err,result)=>{
        if(err){
            console.log(err)
            res.status(500).json({error:"eroare aparuta update status"})
        }else{
            res.json({message:'record status updated successfully'})
        }
    })

})



app.get('/api/get', (req, res, next) => {
    const sqlSelect = "SELECT * FROM tasks";
    db.query(sqlSelect, (err, result) => {
        if (err) {
            return next(err);
        }
        res.json(result);
        console.log(result)

    });
});


app.get('/api/get-completed', (req, res, next) => {
    const sqlSelectCompleted = "SELECT * FROM tasks WHERE status = 1";
    db.query(sqlSelectCompleted, (err, result) => {
        if (err) {
            return next(err);
        }
        res.json(result);
        console.log(result)

    });
});

app.get('/api/get-incompleted', (req, res, next) => {
    const sqlSelectInompleted = "SELECT * FROM tasks WHERE status = 0";
    db.query(sqlSelectInompleted, (err, result) => {
        if (err) {
            return next(err);
        }
        res.json(result);
        console.log(result)

    });
});


app.post('/api/insert', (req, res, next) => {
    const id=req.body.id
    const task = req.body.task;
    const status = req.body.status;

    const sqlInsert = "INSERT INTO tasks (id,task, status) VALUES (?, ?, ?)";
    db.query(sqlInsert, [id,task, status], (err, result) => {
        if (err) {
            return next(err);
        }
        res.json({ message: 'Record inserted successfully' }); 

    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
