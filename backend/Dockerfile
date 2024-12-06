# Step 1: Use official Node.js image as the base
FROM node:18

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Step 4: Copy the rest of the application
COPY . .

# Step 5: Expose the backend port
EXPOSE 3001

# Step 6: Start the backend server
CMD ["npm", "start"]
