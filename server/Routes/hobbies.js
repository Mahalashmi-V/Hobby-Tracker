const express = require('express');
const router = express.Router();
const Hobby = require('../models/Hobby');

// GET all hobbies
router.get('/', async (req, res) => {
  try {
    const hobbies = await Hobby.find();
    res.json(hobbies);
  } catch (err) {
    res.status(500).send('Error fetching hobbies');
  }
});

// POST new hobby
router.post('/', async (req, res) => {
  try {
    const hobby = new Hobby(req.body);
    await hobby.save();
    res.json(hobby);
  } catch (err) {
    res.status(500).send('Error saving hobby');
  }
});

// POST a note to a hobby
router.post('/:id/notes', async (req, res) => {
  try {
    const hobby = await Hobby.findById(req.params.id);
    if (!hobby) return res.status(404).send('Hobby not found');

    hobby.notes.push(req.body.note);
    await hobby.save();
    res.json(hobby);
  } catch (err) {
    res.status(500).send('Error adding note');
  }
});

// DELETE a note from hobby
router.delete('/:id/notes/:noteIndex', async (req, res) => {
  try {
    const hobby = await Hobby.findById(req.params.id);
    if (!hobby) return res.status(404).send('Hobby not found');

    hobby.notes.splice(req.params.noteIndex, 1);
    await hobby.save();
    res.json(hobby);
  } catch (err) {
    res.status(500).send('Error deleting note');
  }
});

module.exports = router;
