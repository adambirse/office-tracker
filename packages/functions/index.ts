import { APIGatewayProxyEvent } from 'aws-lambda';
import { book, getBooking } from './book';
import { notAllowed, notFound, unprocessable } from './response';

exports.main = async (event: APIGatewayProxyEvent) => {

  switch (event.path) {
    case '/booking':
      if (event.httpMethod === 'POST') return handlePost(event);
      if (event.httpMethod === 'GET') return handleGet(event);
      return notAllowed();
    default:
      return notFound();
  }
};


const handlePost = (event: APIGatewayProxyEvent) => {
  return book(event);
}

const handleGet = (event: APIGatewayProxyEvent) => {
  try {
    return getBooking(event, getName(event));
  }
  catch (e) {
    return unprocessable(e);
  }
}
const getName = (event: APIGatewayProxyEvent) => {
  if (event.queryStringParameters && event.queryStringParameters.name) {
    return event.queryStringParameters.name;
  }
  throw new Error("name must be defined as a query parameter.");

}

