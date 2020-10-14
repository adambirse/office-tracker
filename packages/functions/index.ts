import { APIGatewayProxyEvent } from 'aws-lambda';
import ping from './ping';
import book from './book';
import { failure } from './response';

exports.main = async (event: APIGatewayProxyEvent) => {
  const notFound = () => failure(JSON.stringify({ message: 'not found' }), 404);
  switch (event.path) {
    case '/ping':
      return ping();
    case '/booking':
      if (event.httpMethod === 'POST') return book(event);
      return notFound();
    default:
      return notFound();
  }
};
