import * as core from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import { TableNames } from './TableNames' 

export class OfficeDatabase extends core.Construct {
  private orderTable: dynamodb.Table;
  constructor(scope: core.Construct, id: string) {
    super(scope, id);

    this.orderTable = new dynamodb.Table(this, TableNames.Booking, {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PROVISIONED,
      readCapacity: 1,
      writeCapacity: 1,
      tableName: TableNames.Booking,
      removalPolicy: core.RemovalPolicy.DESTROY,
    });
  }

  allowCrud(grantee: iam.IGrantable) {
    this.orderTable.grantReadWriteData(grantee);
  }
};
