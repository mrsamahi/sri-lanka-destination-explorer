require('dotenv').config();
const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema(
  {
    name: String,
    district: String,
    description: String,
    category: String,
    imageUrl: String,
    latitude: Number,
    longitude: Number,
  },
  { timestamps: true },
);

const Destination = mongoose.model('Destination', destinationSchema);

const destinations = [
  {
    name: 'Colombo',
    district: 'Colombo',
    description:
      'The commercial capital of Sri Lanka, known for its coastal attractions, historic landmarks, and vibrant city life.',
    category: 'City',
    latitude: 6.93548,
    longitude: 79.84868,
  },
  {
    name: 'Kandy',
    district: 'Kandy',
    description:
      'A historic hill-country city famous for the Temple of the Tooth and scenic surroundings.',
    category: 'Cultural',
    latitude: 7.2906,
    longitude: 80.6337,
  },
  {
    name: 'Galle',
    district: 'Galle',
    description:
      'A coastal city known for its historic Dutch Fort and beautiful ocean views.',
    category: 'Coastal',
    latitude: 6.0535,
    longitude: 80.221,
  },
];

async function seed() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is missing');
    }

    await mongoose.connect(process.env.MONGODB_URI);

    for (const destination of destinations) {
      const existing = await Destination.findOne({
        name: destination.name,
      });

      if (!existing) {
        await Destination.create(destination);
        console.log(`Added ${destination.name}`);
      } else {
        console.log(`${destination.name} already exists — skipped`);
      }
    }

    console.log('Sample destination setup complete.');
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();