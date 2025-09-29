const express = require('express');
const http = require('http');

const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const multer = require('multer');

const { initializeSocket } = require('./config/socket');

dotenv.config();
connectDB();


const app = express();
const server = http.createServer(app);


app.use(cors());
app.use(express.json());

// File upload configuration (using Multer)
const storage = multer.memoryStorage();

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
});

// Routes // test
app.use('/auth', require('./routes/auth'));
app.use('/chat', require('./routes/chat'));


// Initialize Socket.IO with the HTTP server
initializeSocket(server);

// Start server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
