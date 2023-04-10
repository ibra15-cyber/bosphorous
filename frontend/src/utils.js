export const getError = (error) => {
  return error.response && error.response.message
    ? error.response.data.message
    : error.message;
};

//we will pass an object with error in to geterror fn
// if there's .response and .response.message attached to error, giv
// us els give us eror.message
// catch (err) {
//     dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
//   }
