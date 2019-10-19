const helpers = {
  getResponseSuccess: (status, message, data) => {
    if (data.length < 1 || data[0] === null) {
      return {
        status: 404,
        message: 'No record found',
        data: []
      };
    }

    return {
      status,
      message,
      data
    };
  },

  getResponseFailure: (error) => {
    return {
      error: error.message
    };
  },

  getTrimmedObject: (object) => {
    const result = {};
    for (let item in object) {
      if (object[item]) {
        result[item] = object[item];
      }
    }

    return result;
  }
}

export default helpers;
