require('dotenv').config();
const express = require('express');

const connectDB = require('./config/db');

const app = express();

//routes
const todo = require('./routes/todo');

// connect db
connectDB();

// initialize middleware
app.use(express.json({extended:false}));
app.get("/", (req, res) => res.send('Server up and running'));

// use routes
app.use("/api/todo", todo);

// setting up port
const PORT = process.env.port || 8000;

app.listen(PORT, () => {
    console.log(`Server is listening at https://localhost:${PORT}`);
});