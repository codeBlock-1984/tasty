const helpers = {
  getResponseSuccess: (status, message, data, useFound = false) => {
    if ((data.length < 1 || data[0] === null) && status !== 401) {
      return {
        status: 404,
        message: 'No record found',
        data: [],
        useFound
      };
    }

    return {
      status,
      message,
      data,
      useFound
    };
  },

  getResponseFailure: (error, status = 500) => {
    return {
      error: error.message || error,
      status
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
  },

  getProductStatus: (stock) => {
    if (stock > 10) {
      return 'IN_STOCK';
    } else if (stock > 0) {
      return 'RUNNING_LOW';
    }
    return 'OUT_OF_STOCK';
  },

  getPaginationData: (pageString, isRaw = true) => {
    const page = parseInt(pageString, 10);
    const limit = 10;
    let offset = page ? (page - 1) * limit : 0;

    return { offset, limit, raw: isRaw };
  },

  getFormattedResult: (result, pageString) => {
    const page = parseInt(pageString, 10);
    const { count, rows } = result;
    const _limit = 2;
    const lastPage = Math.ceil(count / _limit);
    const next = page === lastPage ? null : page + 1;
    const current = page;
    const prev = page < 2 ? null : page - 1;
    const data = rows;
    const totalCount = count;
    const currentCount = rows.length;

    return {
      data,
      currentCount,
      totalCount,
      next,
      current,
      prev
    }
  },
}

export default helpers;
