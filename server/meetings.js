const express = require('express');
const {createMeeting, getAllFromDatabase, getFromDatabaseById, addToDatabase,
    updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase} = require('./db');

let meetings = getAllFromDatabase('meetings');

meetingsRouter = express.Router();

//Get all meetings
meetingsRouter.get('/', (req, res, next) => {
    res.send(meetings);
});


// Create a meeting
meetingsRouter.post('/', (req, res, next) => {
    const createdMeeting = createMeeting();
    if (createdMeeting) {
      res.status(201).send(createdMeeting);
    } else {
      res.status(400).send();
    }
});
  
// Delete a meeting
meetingsRouter.delete('/', (req, res, next) => {
    const isDeleted = deleteAllFromDatabase('meetings');
    if (isDeleted) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
});

module.exports = meetingsRouter;