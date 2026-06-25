const logger  = (req, res, next) => {

    const start = Date.now()
    res.on("finish", () => {
    const duration = Date.now() - start;

    console.log(
      `${req.method} ${req.url} ${res.statusCode} ${duration}ms ${req.ip}`
    );
  });

  next()
}

export default logger