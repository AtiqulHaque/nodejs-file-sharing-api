const dayjs = require("dayjs");

const memory_format = (data) => {
  const heap = data / 1024 / 1024;
  return `${Math.round(heap * 100) / 100} MB`;
};

const data_type_check = (data) =>
  Array.isArray(data) ? [...data] : { ...data };

let Response = {
  startTime: dayjs(),

  success: (data) => {
    return {
      status: "success",
      payload: data
    };
  },
  errorWithMessage: (message) => {
    let errorMessage = message || "Something went wrong.";
    return {
      status: "error",
      payload: errorMessage
    };
  },
  validationError: (data) => {
    return {
      status: "validation-error",
      payload: data
    };
  },
};

module.exports = Response;
