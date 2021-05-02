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


## Run tests
Jest is used for the testing framework. By default all tests are run in --watchAll mode. 
It's possible to start the tests concurrently for the back- and frontend by calling ``npm test`` in the root directory or only for either one by calling ``npm test`` in the corrisponding directory.