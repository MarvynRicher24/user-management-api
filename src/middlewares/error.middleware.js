function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  // Do not leak stack in production
  res.status(status).json({ error: message });
}

module.exports = errorHandler;