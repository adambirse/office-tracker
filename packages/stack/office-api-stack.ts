import * as cdk from '@aws-cdk/core';
import { OfficeDatabase } from 'office-database';
import { OfficeApi } from 'office-api';

export class OfficeApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const api = new OfficeApi(this, 'OfficeApi');
    const db = new OfficeDatabase(this, 'OfficeDatabase');

    db.allowCrud(api.handler);
  }
}
