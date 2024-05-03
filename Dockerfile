FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy the contents of the host's current directory (usually the root directory) into the container's /app directory
COPY . .

# Build your application (you can replace this with your specific build commands)
RUN npm install

EXPOSE 8080

# Specify the command to run within the container
CMD ["npm", "run", "build"]