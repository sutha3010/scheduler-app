// scheduler-backend/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS to allow cross-origin requests
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Temporary in-memory data storage
let events = [];

// GET endpoint to retrieve events
app.get('/api/scheduler/events', (req, res) => {
    const events = []; // Fetch from a database or in-memory array
  res.json(events);
});

// POST endpoint to add a new event
app.post('/api/scheduler/events', (req, res) => {
  const { start_time, end_time } = req.body;
  
  // Check for overlap with existing events
  const hasOverlap = events.some(event => 
    (start_time < event.end_time && end_time > event.start_time)
  );

  if (hasOverlap) {
    return res.status(400).json({ error: 'Event overlaps with an existing event.' });
  }

  // Add the event if there’s no overlap
  const newEvent = { start_time, end_time };
  events.push(newEvent);
  res.status(201).json(newEvent);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
