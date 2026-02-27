const responseHandler = {
  success: (res, message = "Success", data = null, statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  },

  error: (res, message, statusCode = 500) => {
    return res.status(statusCode).json({
      success: false,
      message : message || "Internal server error",
    });
  },
};

module.exports = responseHandler
