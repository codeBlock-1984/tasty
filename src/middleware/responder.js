const responder = (req, res) => {
  const { success, failure, found } = req;

  if (success) {
    const { status, message, data, useFound } = success;
    return res.status(status).json({
      message,
      data: found && useFound ? found : data
    });
  } else if (failure) {
    const { error, status } = failure;
    return res.status(status).json({
      message: error
    });
  }
};

export default responder;
