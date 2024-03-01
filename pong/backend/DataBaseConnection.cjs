// trying to communicate with my databse using express and mongoose
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// setup the database properties
const port = 27017;
const dbName = 'PongScoreTable';
const uri = `mongodb://localhost:${port}/${dbName}`;
const collectionName = 'playerScores';

// Function to establish a connection to MongoDB
async function connectToMongo() {

  try {

    // connect to db 
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    // when sucessfuly Connected
    console.log('Connected to the database successfully');
  }

  catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}


// setup routes for handling a request
app.get(`/connect-to-mongo`, async (req, res) => {
  try {
    await connectToMongo();
    res.json({ message: 'Connected to MongoDB successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to connect to MongoDB' });
  }    
});

  // Route to handle other requests (e.g., fetching data)
  app.get(`/${collectionName}`, (req, res) => {
    res.json({ message: `Get all ${collectionName}` });
  });

  // start express server
  const server = app.listen(3000, () => {
    console.log('Express server listening on port 3000');
  });

  // Handle server errors
  server.on('error', (error) => {
    console.error('Express server error:', error);
  });


module.exports = {
app
};
