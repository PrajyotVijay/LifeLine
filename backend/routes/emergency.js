const express = require('express');
const router = express.Router();
const EmergencyRequest = require('../models/EmergencyRequest');
const authMiddleware = require('../middleware/auth');

// GET /api/emergency - get all active emergency requests
router.get('/', async (req, res) => {
  try {
    const requests = await EmergencyRequest.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(10);
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// POST /api/emergency - create new emergency request
router.post('/', async (req, res) => {
  try {
    const { patientName, bloodGroup, organ, hospital, city, state, contactName, contactPhone, message } = req.body;

    if (!patientName || !bloodGroup || !hospital || !city || !state || !contactName || !contactPhone) {
      return res.status(400).json({ error: 'All required fields must be filled.' });
    }

    const request = new EmergencyRequest({
      patientName, bloodGroup, organ, hospital,
      city, state, contactName, contactPhone, message
    });

    await request.save();
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// PATCH /api/emergency/:id - mark as resolved (admin only)
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const request = await EmergencyRequest.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!request) return res.status(404).json({ error: 'Request not found.' });
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// DELETE /api/emergency/:id - delete request (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const request = await EmergencyRequest.findByIdAndDelete(req.params.id);
    if (!request) return res.status(404).json({ error: 'Request not found.' });
    res.json({ message: 'Request deleted.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

module.exports = router;