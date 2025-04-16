import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite's default port
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected ✅');
}).catch(err => {
  console.error('MongoDB connection error ❌:', err);
});

// Car Schema
const carSchema = new mongoose.Schema({
  type: { type: String, default: 'car' },
  brand: String,
  model: String,
  year: Number,
  rentPerDay: Number,
  registrationNumber: String,
  availability: Boolean,
  image: String
});

// Bike Schema
const bikeSchema = new mongoose.Schema({
  type: { type: String, default: 'bike' },
  brand: String,
  model: String,
  year: Number,
  rentPerDay: Number,
  registrationNumber: String,
  availability: Boolean,
  image: String
});

// Bicycle Schema
const bicycleSchema = new mongoose.Schema({
  type: { type: String, default: 'bicycle' },
  brand: String,
  model: String,
  year: Number,
  rentPerDay: Number,
  registrationNumber: String,
  availability: Boolean,
  image: String
});

// Create models
const Car = mongoose.model('car', carSchema);
const Bike = mongoose.model('bike', bikeSchema);
const Bicycle = mongoose.model('bicycle', bicycleSchema);

// Routes
app.get('/cars', async (req, res) => {
  try {
    console.log('Fetching cars...');
    const cars = await Car.find();
    console.log('Found cars:', cars);
    res.json(cars);
  } catch (err) {
    console.error('Error fetching cars:', err);
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
});

app.get('/bikes', async (req, res) => {
  try {
    console.log('Fetching bikes...');
    const bikes = await Bike.find();
    console.log('Found bikes:', bikes);
    res.json(bikes);
  } catch (err) {
    console.error('Error fetching bikes:', err);
    res.status(500).json({ error: 'Failed to fetch bikes' });
  }
});

app.get('/bicycles', async (req, res) => {
  try {
    console.log('Fetching bicycles...');
    const bicycles = await Bicycle.find();
    console.log('Found bicycles:', bicycles);
    res.json(bicycles);
  } catch (err) {
    console.error('Error fetching bicycles:', err);
    res.status(500).json({ error: 'Failed to fetch bicycles' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
