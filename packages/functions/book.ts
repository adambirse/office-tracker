import { APIGatewayProxyEvent } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { TableNames } from 'office-database/TableNames';
import { v4 as uuidv4 } from 'uuid';
import { failure, success } from './response';

const ddb = new AWS.DynamoDB.DocumentClient();

export const book = async (event: APIGatewayProxyEvent) => {
  let newOrder = {};
  // NOTE: in a real application, we’d do more to validate input
  if (event.body != null) {
    const { date, userName } = JSON.parse(event.body);
    const newBooking = {
      id: uuidv4(),
      date,
      userName,
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
    error: 'Provide a booking entry in the body of your request.'
  }));
};

export const getBooking = async (event: APIGatewayProxyEvent, name: string) => {

  try {

    var params = {
      ExpressionAttributeValues: {
        ':userName': name
      },
      FilterExpression: 'userName = :userName',
      TableName: TableNames.Booking

    };

    const { Items: result } = await ddb.scan(params).promise();
    return success(JSON.stringify(result));
  } catch (error) {
    const body = error.stack || JSON.stringify(error, null, 2);
    return failure(body);
  }


};
