function errorHandler(err, req, res, next) {
  if (err.status === 333) {
    res.status(333)
      .json({ message: 'ErrorHandler: not allowed!' })
  } else {
    console.error(err.stack)
    let errors = {};

    Object.keys(err?.errors || []).forEach(k => {
      errors[k] = err.errors[k]?.properties?.message || undefined;
    });
    res.status(500)
      .json({ message: 'ErrorHandler: Something went wrong!', errors: errors, err })
  }
}

module.exports = errorHandler;
