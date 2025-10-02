# Lightweight Node image
FROM node:20-alpine

WORKDIR /app

# Install deps first (cache-friendly)
COPY package*.json ./
RUN npm install --production=false

# Copy code and build
COPY . .
RUN npm run build

# Expose app port
EXPOSE 3000

# Start Next.js in production
CMD ["npm", "start"]