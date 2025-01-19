# Base image
FROM node:18

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy application code
COPY . .

# Build and expose the app
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/index.js"]
