const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const connectAndTest = async () => {
  try {
    // Display which MongoDB URI we're connecting to (with password hidden if present)
    const displayUri = process.env.MONGO_URI 
      ? process.env.MONGO_URI.replace(/:([^:@]+)@/, ':***@') 
      : 'No MONGO_URI found in .env file';
    
    console.log(`Attempting to connect to MongoDB: ${displayUri}`);
    
    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected Successfully!`);
    console.log(`Host: ${conn.connection.host}`);
    console.log(`Database Name: ${conn.connection.name}`);
    
    // Test creating a temporary collection
    const tempSchema = new mongoose.Schema({ test: String, created: Date });
    const TempModel = mongoose.model('ConnectionTest', tempSchema);
    
    // Create a test document
    const testDoc = await TempModel.create({ 
      test: 'Connection successful', 
      created: new Date() 
    });
    
    console.log('Test document created:', testDoc);
    
    // Clean up - delete the test document
    await TempModel.deleteMany({});
    console.log('Test document removed');
    
    console.log('Database test completed successfully! Your connection is working properly.');
    
    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    
    return true;
  } catch (error) {
    console.error('Error connecting to MongoDB:');
    console.error(error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.error('\nTroubleshooting tips:');
      console.error('1. Is MongoDB running on your machine?');
      console.error('2. Check if the MongoDB URI in your .env file is correct');
      console.error('3. If using MongoDB Atlas, verify your IP is whitelisted in network access settings');
    }
    
    return false;
  }
};

// Run the test
connectAndTest()
  .then(success => {
    process.exit(success ? 0 : 1);
  });