const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const imageEncryptMiddleware = require('./middleware/imageEncrypt');
const { pathContextMiddleware } = require('./middleware/pathContext');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json()); // Body parser
app.use(pathContextMiddleware); // Capture request path for image hierarchy
app.use(imageEncryptMiddleware); // Auto-encrypt imageUrl fields in all responses

// Route files
const logoRoutes = require('./routes/logoRoutes');
const homeRoutes = require('./routes/homeRoutes');
const bookRoutes = require('./routes/bookRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const contactRoutes = require('./routes/contactRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const footerRoutes = require('./routes/footerRoutes');
const navbarRoutes = require('./routes/navbarRoutes');
const barRoutes = require('./routes/barRoutes');
const resortRoutes = require('./routes/resortRoutes');
const welcomePopupRoutes = require('./routes/welcomePopupRoutes');
const authRoutes = require('./routes/authRoutes');
const imageRoutes = require('./routes/imageRoutes');

// Mount routers
app.use('/img', imageRoutes);  // Image proxy — must be before auth middleware
app.use('/auth', authRoutes);
app.use('/logo', logoRoutes);
app.use('/home', homeRoutes);
app.use('/book', bookRoutes);
app.use('/about', aboutRoutes);
app.use('/contact', contactRoutes);
app.use('/gallery', galleryRoutes);
app.use('/footer', footerRoutes);
app.use('/navbar', navbarRoutes);
app.use('/bar', barRoutes);
app.use('/resort', resortRoutes);
app.use('/welcome-popup', welcomePopupRoutes);

// Base route for testing
app.get('/', (req, res) => {
    res.send('7-Oceans API is running...');
});

// Global error handler – must be last
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
