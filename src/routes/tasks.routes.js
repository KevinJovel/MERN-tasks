const express = require('express');
const Task = require('../models/task');
const router = express.Router();

//Recupera la lista de datos de la coleccion tasks
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});
router.get('/:id', async (req, res) => {
    const tasks = await Task.findById(req.params.id);
    res.json(tasks);
});
//Ingresa un registro a la db dependiendo el model
router.post('/', async (req, res) => {
    const { tittle, description }= req.body;
    const task = new Task({ tittle, description });
    await task.save((error) => {
        if (error) {
            console.log('data didnt save');
        } else {
            console.log("data saved");
        }
    });
    res.json({ status: "saved" })
});
//Modificaicon de los datos
router.put('/:id', async (req, res) => {
    await Task.findByIdAndUpdate(req.params.id, req.body,(err)=>{
        if (err) {
            console.log('data didnt update');
        } else {
            console.log("data updated");
        }
    });
    res.json({ status: "task updated" });
});
router.delete('/:id', async (req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({ status: "task deleted" });
});

module.exports = router;