//
require('dotenv').config();

// imported to enable the application to create an Express server and handle HTTP requests and responses.
const express = require('express');

// imported to enable the application to connect to a MongoDB database and perform database operations.
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// imported to enable the application to handle cross-origin requests, allowing it to accept requests from different domains or origins. Only authorized domains can access the server's resources, which helps prevent security issues related to cross-origin requests.
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./models/user');

const PORT = process.env.PORT 

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
}

connectDB();

//app.post() method is used to define a route for creating a new user. When a POST request is made to the '/api/users' URL, the callback function is executed. It extracts the name and email from the request body, creates a new user using the User model, and sends a JSON response with the newly created user. If there is an error, it handles duplicate user errors and other server errors appropriately.
app.post('/api/users', async (req, res) => {
  try {
    const { name, email} = req.body;
    const newUser = new User.create({ name, email});
    res.status(201).json(newUser);
  }
  catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'User already exists' });
    } 
    res.status(500).json({ message: 'Failed to create user', error: error.message });
  }
});

//app.get() method is used to define a route for fetching all users. When a GET request is made to the '/api/users' URL, the callback function is executed. It retrieves all users from the database using the User model and sends a JSON response with the list of users. If there is an error, it sends a 500 status code with an error message.
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  }
  catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
});

//update
 
//delete

//the 2 parameters are the request and response objects. The app.get() method is used to define a route for the root URL ('/'). When a GET request is made to this URL, the callback function is executed, which sends a JSON response with a welcome message.
app.get('/', (req, res) => {
   res.json({ message: 'Welcome to the GMC2 API' });
})
 


//the app.listen() method is used to start the server and listen for incoming requests on the specified port. The callback function is executed once the server is successfully started, and it logs a message indicating that the server is listening at the specified URL.
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
 