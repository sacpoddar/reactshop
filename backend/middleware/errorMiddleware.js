// fallback for 404 not found
// this will be called if there is no router handler for the requested url
const notFound = (req, res, next) => {
  const error = new Error(`not found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

// custom error handler
// called only when error occurs
const errorHandler = (err, req, res, next) => {
  // sometimes we may get status 200 for error. set it to 500
  const statusCode = res.status === 200 ? 500 : res.statusCode
  res.status(statusCode)
  // no stack trace for prod
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

export { notFound, errorHandler }
