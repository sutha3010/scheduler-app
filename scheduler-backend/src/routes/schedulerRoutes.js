// scheduler-backend/src/routes/schedulerRoutes.js
const express = require('express');
const router = express.Router();

let events = [];

router.get('/events', (req, res) => {
  res.json(events);
});

router.post('/events', (req, res) => {
  const newEvent = req.body;
  const overlaps = events.some(event =>
    (newEvent.start_time < event.end_time && newEvent.end_time > event.start_time)
  );
  
  if (overlaps) {
    return res.status(400).json({ message: 'Event overlaps with an existing event.' });
  }
  
  events.push(newEvent);
  res.status(201).json({ message: 'Event added successfully!' });
});

module.exports = router;
