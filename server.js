require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express(); 

app.use(express.json());

//this is a function that connects to the MongoDB database using the Mongoose library. It uses the connection string stored in the environment variable MONGODB_URI to establish a connection. If the connection is successful, it logs a message indicating that MongoDB is connected along with the host name. If there is an error during the connection process, it logs the error and exits the process with a non-zero status code.
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, { 
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

const PORT = process.env.PORT 


//the 2 parameters are the request and response objects. The app.get() method is used to define a route for the root URL ('/'). When a GET request is made to this URL, the callback function is executed, which sends a JSON response with a welcome message.
app.get('/', (req, res) => {
   res.json({ message: 'Welcome to the GMC2 API' });
})


//the app.listen() method is used to start the server and listen for incoming requests on the specified port. The callback function is executed once the server is successfully started, and it logs a message indicating that the server is listening at the specified URL.
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
 