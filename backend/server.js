const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/donors', require('./routes/donors'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/emergency', require('./routes/emergency'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'LifeLine API is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});