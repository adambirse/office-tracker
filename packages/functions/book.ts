import { APIGatewayProxyEvent } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { TableNames } from 'office-database/TableNames';
import { success, failure } from './response';

export const book = async (event: APIGatewayProxyEvent) => {
  const ddb = new AWS.DynamoDB.DocumentClient();
  let newOrder = {};
  // NOTE: in a real application, we’d do more to validate input
  if (event.body != null) {
    const { date, user } = JSON.parse(event.body);
    const ddb = new AWS.DynamoDB.DocumentClient();
    const newBooking = {
      id: uuidv4(),
      date,
      user,
    };
    try {
      await ddb.put({
        TableName: TableNames.Booking,
        Item: newBooking
      }).promise();      

      return success(JSON.stringify(newBooking));

    } catch (error) {
      const body = error.stack || JSON.stringify(error, null, 2);
      return failure(body);
    }
  }
  return success(JSON.stringify({
    error: 'Provide a booking entry'
  }));
};

export const getBooking = async (event: APIGatewayProxyEvent) => {
  const result = {
    id: uuidv4(),
    date: "test date",
    user: "test user",
  };

  return success(JSON.stringify(result));
};
