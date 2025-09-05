import cors from 'cors';

// Simplified CORS configuration - much more reliable
const isDevelopment = process.env.NODE_ENV !== 'production';

const corsOptions = {
  // In development, allow all origins. In production, be more restrictive.
  origin: isDevelopment ? true : [
    'http://localhost:3000',
    'http://localhost:4000',
    'http://localhost:5173', 
    'http://localhost:4173',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Origin', 'Accept']
};

console.log('CORS Configuration:', {
  environment: process.env.NODE_ENV || 'development', 
  isDevelopment,
  origin: corsOptions.origin
});

export const corsMiddleware = cors(corsOptions);