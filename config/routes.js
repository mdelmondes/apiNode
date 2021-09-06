const express = require('express');
const pool = require('./db');
const routes = express.Router();

//criar
routes.post('/todos', async (req, res) => {
    try {
        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);

        return res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message)
    }    
})

//pegar todos
routes.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");

        return res.json(allTodos.rows);
    } catch (error) {
        console.error(error.message)
    }
});

//pegar especifico
routes.get('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const todo = await pool.query(`SELECT * FROM todo WHERE todo_id = ${id}`);
        
        return res.json(todo.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

//update de todo
routes.put('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        //const updateTodo = await pool.query(`UPDATE todo SET description = ${description} WHERE todo_id = ${id}`);
        return res.json(updateTodo);
    } catch(error){
        console.error(error.message);
    }
});

//deletar
routes.delete('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const delTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

        return res.json(delTodo);
    } catch (error) {
        console.error(error.message)
    }
})

module.exports = routes;