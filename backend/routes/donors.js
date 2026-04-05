const express = require('express');
const router = express.Router();
const Donor = require('../models/Donor');
const authMiddleware = require('../middleware/auth');

// GET /api/donors - get all approved donors with filters
router.get('/', async (req, res) => {
  try {
    const { bloodGroup, organ, city } = req.query;
    const filter = { status: 'approved' };

    if (bloodGroup) filter.bloodGroup = bloodGroup;
    if (organ) filter.organs = organ;
    if (city) filter.city = city.toLowerCase();

    const donors = await Donor.find(filter).sort({ createdAt: -1 });
    res.json(donors);
  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// GET /api/donors/pending - get all pending donors (admin only)
router.get('/pending', authMiddleware, async (req, res) => {
  try {
    const donors = await Donor.find({ status: 'pending' }).sort({ createdAt: -1 });
    res.json(donors);
  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// GET /api/donors/stats - donor stats (admin only)
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const pending = await Donor.countDocuments({ status: 'pending' });
    const approved = await Donor.countDocuments({ status: 'approved' });
    const rejected = await Donor.countDocuments({ status: 'rejected' });
    res.json({ pending, approved, rejected });
  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// GET /api/donors/count - get total approved donors count (public)
router.get('/count', async (req, res) => {
  try {
    const count = await Donor.countDocuments({ status: 'approved' });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// GET /api/donors/export - export approved donors as CSV (admin only)
router.get('/export', async (req, res) => {
  try {
    const jwt = require('jsonwebtoken');
    const token = req.query.token || req.headers['authorization']?.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'No token provided.' });

    jwt.verify(token, process.env.JWT_SECRET);

    const donors = await Donor.find({ status: 'approved' });

    const headers = ['Name', 'Email', 'Phone', 'Blood Group', 'Organs', 'Age', 'City', 'State'];

    const rows = donors.map(d => [
      d.name,
      d.email,
      d.phone,
      d.bloodGroup,
      d.organs?.join(' | ') || 'Blood only',
      d.age,
      d.city,
      d.state
    ]);

    const csv = [headers, ...rows]
      .map(row => row.map(val => `"${val}"`).join(','))
      .join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=donors.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// POST /api/donors - register a new donor
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, bloodGroup, organs, age, city, state, latitude, longitude, medicalCertificateUrl, consent } = req.body;

    const existing = await Donor.findOne({ email: email?.toLowerCase().trim() });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered.' });
    }

    // Auto-geocode if lat/lng not provided
    let lat = latitude || null;
    let lng = longitude || null;

    if (!lat || !lng) {
      try {
        const geoRes = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city + ', ' + state + ', India')}&format=json&limit=1`,
          { headers: { 'User-Agent': 'LifeLine-App' } }
        );
        const geoData = await geoRes.json();
        if (geoData.length > 0) {
          lat = parseFloat(geoData[0].lat);
          lng = parseFloat(geoData[0].lon);
        }
      } catch (err) {
        console.log('Geocoding failed:', err.message);
      }
    }

    const donor = new Donor({
      name, email, phone, bloodGroup,
      organs: organs || [],
      age, city, state,
      latitude: lat,
      longitude: lng,
      medicalCertificateUrl: medicalCertificateUrl || null,
      consent: consent || false
    });

    await donor.save();
    res.status(201).json(donor);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ error: messages.join(', ') });
    }
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// PATCH /api/donors/:id - approve or reject (admin only)
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Status must be approved or rejected.' });
    }

    const donor = await Donor.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!donor) return res.status(404).json({ error: 'Donor not found.' });
    res.json(donor);
  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// DELETE /api/donors/:id - delete a donor (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const donor = await Donor.findByIdAndDelete(req.params.id);
    if (!donor) return res.status(404).json({ error: 'Donor not found.' });
    res.json({ message: 'Donor deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

module.exports = router;