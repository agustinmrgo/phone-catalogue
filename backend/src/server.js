import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import phonesRoutes from './routes/phones.routes.js';
import { corsMiddleware } from './middleware/cors.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(morgan('combined'));
app.use(corsMiddleware);
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Phone Catalogue API is running' });
});

// API Routes
app.use('/api', phonesRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Phone Catalogue API ready at http://localhost:${PORT}`);
});

export default server;
