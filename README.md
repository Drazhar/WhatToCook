# WhatToCook?!

## Project setup
```
npm run postinstall
```
The project is splitted into back- and frontend with seperate package.json files. To install all modules simply run the postinstall command in the root directory. This will run the ``npm i`` in each subdirectory.

## Start back- and frontend for development
```
npm start
```
``npm start`` in the root directory runs all required services for development using the concurrently package:
- tsc compiler for the backend
- nodemon to run and watch for changes at the backend
- vue serve to serve the frontend in a live server


## Deployment
```
npm run deploy
```
First run the deploy command compile the backend code and build the frontend. The result will be saved in the directory "00_deploy".
Copy the resultung files to the server (rPi in my case) and connect via SSH.
At the server navigate to the directory and run:
```
docker-compose up --build -d
```
to build the docker image and spin up the container in the background.
NOTE: A docker-compose.yml is required but omitted in the repo because of private environment variables. It should look similar to this example:
```
version: '3.8'

services:
  node:
    build:
      context: .
      dockerfile: Dockerfile_node
    container_name: whattocook
    ports:
      - '8080:8080'
    restart: always
    environment:
      - PORT=8080
      - DB_URI=*****
```
