# Create image based on the official Node image from the dockerhub
FROM node:13.6.0-alpine3.10

# Create a directory where our app will be placed
RUN mkdir -p /home/node/app

# Change directory so that our commands run inside this new directory
WORKDIR /home/node/app

# Copy dependency definitions
COPY package.json /home/node/app

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . /home/node/app

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["npm", "start"]
