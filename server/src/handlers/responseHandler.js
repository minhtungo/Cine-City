const responseWithData = (res, statusCode, data) =>
  res.status(statusCode).json(data);

const errorResponse = (res) =>
  responseWithData(res, 500, {
    error: 'Something went wrong. Please try again later.',
    status: 500,
  });

const badRequestResponse = (res, message) =>
  responseWithData(res, 400, {
    message,
    status: 400,
  });

const successResponse = (res, data) => responseWithData(res, 200, data);

const createdResponse = (res, data) => responseWithData(res, 201, data);

const unauthorizedResponse = (res) =>
  responseWithData(res, 401, {
    message: 'Unauthorized. Please login to continue.',
    status: 401,
  });

const notFoundResponse = (res) =>
  responseWithData(res, 404, { status: 404, message: 'Not found.' });

export default {
  errorResponse,
  badRequestResponse,
  successResponse,
  createdResponse,
  unauthorizedResponse,
  notFoundResponse,
};
