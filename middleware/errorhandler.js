// const {BaseError, APIError} = require('../utils/errorHandler')


// const errorhandler = (err, req, res, next) => {
//   const status = err.status || 500;
//   let message = err.message || "Internal Server Error";

//   console.error(err);

//   if (err.name === 'MongoError' && err.code === 11000) {
//     message = 'Duplicate key error. A document with this unique field already exists.';
//     res.status(statusCode).json({
//       error: {
//         message: errorMessage,
//         statusCode: statusCode
//       }
//   }); 
// }else if (err.name === 'ValidationError') {
//     message = 'Validation error: Some fields were not provided or in the wrong format.';
//   return res.status(status).json({ message });

//   }else{
//   return res.status(status).json({ message });
// }
// };

// module.exports = errorhandler;


// errorHandlingMiddleware.js

// errorHandlingMiddleware.js1

// function errorHandler(err, req, res, next) {
//   console.error(err.stack);

//   let statusCode = 500;
//   let errorMessage = 'Internal Server Error';

//   if (err instanceof Error && err.message.includes('duplicate key error')) {
//     statusCode = 400;
//     errorMessage = 'Duplicate key error. A document with this unique field already exists.';
//   } else if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
//     statusCode = 400;
//     errorMessage = 'Invalid JSON payload';
//   }

//   res.status(statusCode).json({
//     error: {
//       message: errorMessage,
//       statusCode: statusCode
//     }
//   });
// }

// module.exports = errorHandler;



// errorHandlingMiddleware.js2

const errorHandler = (err, req, res, next) =>{
  console.error(err.stack);

  let statusCode = 500;
  let errorMessage = 'Internal Server Error';

  if (err.name === 'HTTPError') {
    statusCode = err.statusCode;
    errorMessage = err.message;
  } else if (err.name === 'MongoServerError' && err.code === 11000) {
    statusCode = 400;
    errorMessage = 'Duplicate key error. A document with this unique field already exists.';
  } else if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    statusCode = 400;
    errorMessage = 'Invalid JSON payload';
  } else if (err instanceof TypeError) {
    statusCode = 400;
    errorMessage = 'Type Error: ' + err.message;
  } else if (err instanceof ReferenceError) {
    statusCode = 500;
    errorMessage = 'Reference Error: ' + err.message;
  }else if (err.name === 'ValidationError') {
    statusCode = 400;
    errorMessage = 'Validation Error: ' + err.message;
  }

  res.status(statusCode).json({
    error: {
      message: errorMessage,
      statusCode: statusCode
    }
  });
}

module.exports = errorHandler;
