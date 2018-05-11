const express = require('express');
const {getAllFromDatabase, getFromDatabaseById, addToDatabase,
    updateInstanceInDatabase, deleteFromDatabasebyId, 
    deleteAllFromDatabase} = require('./db');

let minions = getAllFromDatabase('minions');

minionsRouter = express.Router();

//Get all minions
minionsRouter.get('/', (req, res, next) => {
    res.send(minions);
});

//Check validity of ID
minionsRouter.use('/:id', (req, res, next) => {
    const id = req.params.id;
    if (isNaN(id)) {
      return res.status(404).send();
    }
    const foundMinion = getFromDatabaseById('minions', id);
    if (foundMinion === undefined) {
        res.status(404).send();
    } 

    req.id = id;
    req.foundMinion = foundMinion;
    next();
});

//Get a single minion
minionsRouter.get('/:id', (req, res, next) => {
      res.send(req.foundMinion);
});

// Update a minion
minionsRouter.put('/:id', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    if (updatedMinion) {
        res.send(updatedMinion);
    } else {
        res.status(404).send();  
    }
});

// Create a minion
minionsRouter.post('/', (req, res, next) => {
    const createdMinion = addToDatabase('minions', req.body);
    if (createdMinion) {
      res.status(201).send(createdMinion);
    } else {
      res.status(400).send();
    }
});
  
// Delete a minion
minionsRouter.delete('/:id', (req, res, next) => {
    const isDeleted = deleteFromDatabasebyId('minions', req.id);
    if (isDeleted) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
});

module.exports = minionsRouter;