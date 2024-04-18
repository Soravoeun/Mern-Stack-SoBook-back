 export const response = () => {
  function success(response) {
    return {
      status: "OK",
      data: response,
    };
  }

  function error(err) {
    return {
      status: "KO",
      data: err,
    };
  }
  return {
    success: success,
    error: error,
  };
 };


