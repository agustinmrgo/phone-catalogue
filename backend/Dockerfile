# syntax=docker/dockerfile:1

# Base stage with common configuration
FROM node:22-alpine AS base
WORKDIR /app

# Install system dependencies for potential native modules
RUN apk add --no-cache \
    python3 \
    make \
    g++

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Development stage
FROM base AS dev
ENV NODE_ENV=development

# Install ALL dependencies (including devDependencies)
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev

# Copy application code
COPY . .

# Change ownership and switch to non-root user
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose development port
EXPOSE 4000

# Start development server with nodemon
CMD ["npm", "run", "dev"]

# Production stage
FROM base AS prod
ENV NODE_ENV=production

# Install only production dependencies
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Copy application code
COPY . .

# Change ownership and switch to non-root user
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose production port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:5000/health', (res) => { \
        process.exit(res.statusCode === 200 ? 0 : 1) \
    }).on('error', () => process.exit(1))"

# Start the application
CMD ["npm", "start"]