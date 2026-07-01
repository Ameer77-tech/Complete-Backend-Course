const successResponse = (message, statusCode = 200, res, data = {}) => {
  return res.status(statusCode || 200).json({
    message: message,
    success: true,
    ...(data && Object.keys(data).length > 0 ? { data } : {}),
  });
};
export default successResponse;
