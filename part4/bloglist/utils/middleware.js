const logger = require('./logger');

const requestLogger = (req, res, next) => {
    logger.info('Method:', req.method);
    logger.info('Path:', req.path);
    logger.info('Body:', req.body);
    logger.info('----');
    next();
};

const errorHandler = (error, request, response, next) => {
    logger.error(error.message);
    console.log("ARE WE IN THE ERROR HANDLER?? -- error.name:", error.name)

    if (error.name === 'CastError') {
        return response.status(400).send({
          error: 'malformatted id'
        })
      } else if (error.name === 'ValidationError') {
        return response.status(400).json({
          error: error.message 
        })
      } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
          error: 'invalid token'
        })
    }

    next(error);
};

const tokenExtractor = (request, response, next) => {
    //get token from Authorization header of the request and add it as an attribute to the request object
    const authorization = request.get('authorization');

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7);
    }
    next();
}

module.exports = {
    requestLogger,
    errorHandler,
    tokenExtractor,
}