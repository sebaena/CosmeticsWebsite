const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const usersRouter = require('./controllers/users')
const cosmeticsRouter = require('./controllers/cosmetics')
const ingredientsRouter = require('./controllers/ingredients')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('conneting to', config.MONGODB_URL)

mongoose.connect(config.MONGODB_URL)
.then(()=>{
    logger.info('connected to', config.MONGODB_URL);
})
.catch((error) => {
    logger.error('error connecting to', config.MONGODB_URL, error.message);
})

// the order here is IMPORTANT !!!
app.use(cors()); // allow frontend and backend get resouces from same roots
app.use(express.static('build')); // use frontend ready-build from ./build/
app.use(express.json()); // use json format for request and response
app.use(middleware.requestLogger); // self-defined middleware
/***************routes*****************/
app.use('/api/users', usersRouter);
app.use('/api/cosmetics', cosmeticsRouter);
app.use('/api/ingredients', ingredientsRouter);
/**************************************/
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
module.exports = app
