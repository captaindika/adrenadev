const status = (status, object, message,) => {
  let data = {}
  switch (status) {
    case 200: {
      data = {
        Success: true,
        Message: message,
        data: object
      }
    }
      break;
    case 400: {
      data = {
        Success: false,
        Message: 'Bad Request'
      }
    }
      break;
    case 401: {
      data= {
        Success: false,
        Message: 'Unauthorized'
      }
    }
    break;
    case 404: {
      data = {
        Success: false,
        Message: 'Data Not Found'
      }
    }
      break 
    case 500: {
      data = {
        Success: false,
        Message: 'Internal Server Error'
      }
    }
      break
    default:  {
      data = {
        Success: false,
        Message: message,
      }
    }
      break;
  }
  return data
}

const code = {
  success: 200,
  notFound: 404,
  badRequest: 400,
  unauthorized: 401,
  internalServerError: 500
}

module.exports = {
  status,
  code
}