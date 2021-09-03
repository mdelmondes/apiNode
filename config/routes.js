const express = require('express');
const routes = express.Router();

let db = [
    {'1' : { Nome: 'Matheus Delmondes', Idade: '25'}},
    {'2' : { Nome: 'Jeniffer Xavier', Idade: '25'}},
    {'3' : { Nome: 'Lucas Delmondes', Idade: '25'}}
];

routes.get('/getUsers', (req, res) => {
    return res.json(db);
})

routes.post('/insertUsers', (req, res) => {
    const body = req.body;

    if(!body){
        return res.status(400).end();
    }

    db.push(body);
    return res.json(body);
})

routes.delete('/:id', (req, res) => {
    const id  = req.params.id;
    let newDB = db.filter(item => {
        if(!item[id]){
            return item;
        }
    })
    db = newDB;
    return res.send(newDB);
})


module.exports = routes;