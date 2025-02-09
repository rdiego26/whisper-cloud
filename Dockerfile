# Use Node.js LTS as the base image
FROM node:lts-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the application code
COPY . .

# Compile TypeScript
RUN npx tsc

# Run the application
CMD ["node", "dist/index.js"]
