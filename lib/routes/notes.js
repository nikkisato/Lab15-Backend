const { Router } = require('express');
const Note = require('../models/Note');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Note
      .create(req.body)
      .then(note => res.send(note))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Note
      .find()
      .then(notes => res.send(notes))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Note
      .findById(req.params.id)
      .then(note => res.send(note))
      .catch(next);
  })

  .patch('/:id', ensureAuth, (req, res, next) => {
    Note
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(note => res.send(note))
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Note
      .findByIdAndDelete(req.params.id)
      .then(note => res.send(note))
      .catch(next);
  });

