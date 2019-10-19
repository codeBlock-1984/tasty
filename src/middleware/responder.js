const responder = (req, res) => {
  const { success, failure, found } = req;

  if (success) {
    const { status, message, data } = success;
    res.status(status).json({
      message,
      data: found ? found : data
    });
  } else if (failure) {
    const { error } = failure;
    res.status(500).json({
      message: error
    });
  }
};

export default responder;
