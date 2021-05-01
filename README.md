# WhatToCook?!

## Project setup
```
npm run postinstall
```
The project is splitted into back- and frontend with seperate package.json files. To install all modules simply run the postinstall command. This will run the ``npm i`` in each subdirectory.

## Start back- and frontend for development
```
npm start
```
``npm start`` in the root directory will run all required services using the concurrently package:
- tsc compiler for the backend
- nodemon to run and watch for changes at the backend
- vue serve to serve the frontend in a live server