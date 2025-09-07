# Phone Catalogue 📱

A modern, responsive web application for browsing and exploring phone specifications. Built with React, Node.js, and Docker for a complete full-stack experience.

## Features ✨

- **📱 Phone Browsing**: Browse a curated collection of smartphones from top brands
- **🔍 Advanced Filtering**: Filter by manufacturer, color, and price range
- **📊 Smart Sorting**: Sort phones by name, price, or other specifications
- **📑 Pagination**: Efficient pagination for large phone collections
- **📱 Responsive Design**: Mobile-first design that looks great on all devices
- **⚡ Fast Loading**: Optimized performance with loading states and error handling
- **🐳 Docker Ready**: Fully containerized for easy deployment
- **🧪 Well Tested**: Comprehensive test coverage for both frontend and backend
- **🔷 TypeScript**: Type-safe development with OpenAPI-first API design

## Tech Stack 🛠️

### Backend

- **Node.js 22.x** - JavaScript runtime
- **Express 5.1.0** - Web application framework
- **TypeScript 5.x** - Type-safe JavaScript
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger
- **Jest & Supertest** - Testing framework

### Frontend

- **React 19** - User interface library
- **Vite 7.x** - Fast build tool and dev server
- **TypeScript 5.x** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Vitest** - Fast unit testing framework

### API & Type Generation

- **OpenAPI 3.0** - API specification and documentation
- **@hey-api/openapi-ts** - TypeScript code generation from OpenAPI specs
- **Type-safe API client** - Auto-generated from OpenAPI specification

### DevOps

- **Docker & Docker Compose** - Containerization
- **ESLint & Prettier** - Code linting and formatting
- **Nginx** - Production web server

## Quick Start 🚀

### Option 1: Docker (Recommended)

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd phone-catalogue
   ```

2. **Run with Docker Compose**

   ```bash

   # Development with hot reload (recommended for development)
   docker-compose -f docker-compose.dev.yml up -d

   # Production build
   docker-compose up -d
   ```

3. **Access the application**
   - **Development**: Frontend http://localhost:5173, Backend http://localhost:4000
   - **Production**: Frontend http://localhost:3000, Backend http://localhost:5000
   - Health Check: http://localhost:4000/health (dev) or http://localhost:5000/health (prod)

### Option 2: Local Development

#### Prerequisites

- Node.js 22.x or higher
- npm 11.x or higher

#### Backend Setup

```bash
npm --prefix backend install
cp .env.example .env
npm --prefix backend run dev
```

The API server will be running on http://localhost:4000

#### Frontend Setup

```bash
npm --prefix frontend install
npm --prefix frontend run dev
```

The frontend will be running on http://localhost:5173

## API Documentation 📖

### Base URL

- Local: `http://localhost:4000/api`
- Docker: `http://localhost:4000/api`

### Endpoints

#### GET `/phones`

Get all phones with filtering, sorting, and pagination.

**Query Parameters:**

- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `sortBy` (string): Sort field (`name`, `manufacturer`, `price`, `ram`)
- `sortOrder` (string): Sort order (`asc`, `desc`)
- `manufacturer` (string): Filter by manufacturer
- `color` (string): Filter by color
- `minPrice` (number): Minimum price filter
- `maxPrice` (number): Maximum price filter

**Example:**

```bash
curl "http://localhost:4000/api/phones?manufacturer=Apple&sortBy=price&sortOrder=asc&page=1&limit=5"
```

#### GET `/phones/:id`

Get a specific phone by ID.

**Example:**

```bash
curl "http://localhost:4000/api/phones/0"
```

#### GET `/phones/stats`

Get statistics about the phone collection.

**Response includes:**

- Total number of phones
- Available manufacturers
- Available colors
- Price range (min/max)

## Project Structure 📁

```
phone-catalogue/
├── api/                     # OpenAPI specification & TypeScript generation
│   ├── spec.yaml           # OpenAPI 3.0 API specification
│   ├── openapi-ts.config.ts # Code generation configuration
│   ├── generated/          # Auto-generated TypeScript types & services
│   └── tsconfig.json       # TypeScript configuration
│
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   ├── data/           # JSON data files
│   │   └── server.ts       # Main server file
│   ├── tests/              # Backend tests
│   ├── Dockerfile          # Backend container config
│   └── package.json        # Backend dependencies
│
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API service layer
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # App entry point
│   ├── tests/              # Frontend tests
│   ├── Dockerfile          # Frontend container config
│   └── package.json        # Frontend dependencies
│
├── resources/              # Project resources
├── docker-compose.yml      # Production Docker setup
├── docker-compose.dev.yml  # Development Docker setup
└── README.md              # This file
```

## Development Workflow 🔄

### Running Tests

```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test

# Watch mode
npm run test:watch
```

### Code Quality

```bash
# Lint code
npm --prefix backend run lint
npm --prefix frontend run lint

# Format code
npm --prefix backend run format
npm --prefix frontend run format

# Fix linting issues
npm --prefix backend run lint:fix
npm --prefix frontend run lint:fix

# TypeScript type checking
npx --prefix backend tsc --noEmit
npx --prefix frontend tsc --noEmit
npx --prefix api tsc --noEmit
```

### TypeScript & Code Generation

```bash
# Generate OpenAPI types and client (from api/)

cd api && npx @hey-api/openapi-ts

# Type check generated code
npx --prefix api tsc --noEmit
```

### Docker Development

```bash
# Development mode with hot reload (frontend on :5173, backend on :4000)
docker-compose -f docker-compose.dev.yml up -d

# View development logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop development containers
docker-compose -f docker-compose.dev.yml down

# Production mode (frontend on :3000, backend on :5000)
docker-compose up -d

# View production logs
docker-compose logs -f

# Stop production containers
docker-compose down

# Rebuild containers after changes
docker-compose -f docker-compose.dev.yml build
```

## Environment Variables 🔧

### Backend (.env)

```bash
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend

Vite automatically loads environment variables from `.env` files:

```bash
VITE_API_URL=http://localhost:4000/api
```

## Production Deployment 🌐

The application is production-ready with:

- **Multi-stage Docker builds** for optimized image sizes
- **Nginx** as a reverse proxy for the frontend
- **Health checks** for both services
- **Security headers** and best practices
- **Graceful error handling**

### Deploy to Production

```bash
# Build and run production containers
docker-compose up -d

# Scale services if needed
docker-compose up -d --scale backend=2
```

## Phone Data Structure 📋

Each phone object contains:

```javascript
{
  "id": 0,
  "name": "iPhone 7",
  "manufacturer": "Apple",
  "description": "iPhone 7 dramatically improves...",
  "color": "black",
  "price": 769,
  "imageFileName": "IPhone_7.png",
  "screen": "4,7 inch IPS",
  "processor": "A10 Fusion",
  "ram": 2
}
```
