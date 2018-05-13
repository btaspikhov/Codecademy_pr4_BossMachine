const express = require('express');
const {getAllFromDatabase, getFromDatabaseById, addToDatabase,
    updateInstanceInDatabase, deleteFromDatabasebyId, 
    deleteAllFromDatabase} = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');

let ideas = getAllFromDatabase('ideas');

ideasRouter = express.Router();

//Get all ideas
ideasRouter.get('/', (req, res, next) => {
    res.send(ideas);
});

//Check validity of ID
ideasRouter.use('/:id', (req, res, next) => {
    const id = req.params.id;
    if (isNaN(id)) {
      return res.status(404).send();
    }
    const foundIdea = getFromDatabaseById('ideas', id);
    if (foundIdea === undefined) {
        res.status(404).send();
    } 

    req.id = id;
    req.foundIdea = foundIdea;
    next();
});

//Get a single idea
ideasRouter.get('/:id', (req, res, next) => {
      res.send(req.foundIdea);
});

// Update an idea
ideasRouter.put('/:id', (req, res, next) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    if (updatedIdea) {
        res.send(updatedIdea);
    } else {
        res.status(404).send();  
    }
});

//Reject insufficiently profitable ideas
ideasRouter.post('/', (req, res, next) => {
    checkMillionDollarIdea(req, res, next);
});
  
// Create an idea
ideasRouter.post('/', (req, res, next) => {
    
    let createdIdea = addToDatabase('ideas', req.body);
  
    if (createdIdea) {
      res.status(201).send(createdIdea);
    } else {
      res.status(400).send();
    }
});
  
// Delete an idea
ideasRouter.delete('/:id', (req, res, next) => {
    const isDeleted = deleteFromDatabasebyId('ideas', req.id);
    if (isDeleted) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
});

module.exports = ideasRouter;