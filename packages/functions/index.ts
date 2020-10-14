import { APIGatewayProxyEvent } from 'aws-lambda';
import ping from './ping';
import {book, getBooking} from './book';
import { failure } from './response';

exports.main = async (event: APIGatewayProxyEvent) => {
  const notFound = () => failure(JSON.stringify({ message: 'not found' }), 404);
  switch (event.path) {
    case '/ping':
      return ping();
    case '/booking':
      if (event.httpMethod === 'POST') return book(event);
      if (event.httpMethod === 'GET') return getBooking(event);
      return notFound();
    default:
      return notFound();
  }
};
