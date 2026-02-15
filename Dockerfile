dockerfile
# --- Development Stage ---
# Use a lightweight Node.js image for development
FROM node:18-alpine AS development

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies. 'npm ci' ensures reproducible builds.
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose the port your Node.js app listens on (commonly 3000, 8080)
EXPOSE 3000

# Default command to run the application
CMD ["node", "index.js"]

# --- Production Stage ---
# Build a smaller, optimized image for production
FROM node:18-alpine AS production

WORKDIR /app

# Copy only necessary files from the development stage
# This creates a lean production image without dev dependencies or unnecessary files.
COPY --from=development /app/node_modules ./node_modules
COPY --from=development /app/package*.json ./
COPY --from=development /app/index.js ./
COPY --from=development /app/config ./config
COPY --from=development /app/routers ./routers
# Add any other required static assets or views folders if applicable

# Set environment variables for production
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "index.js"]
