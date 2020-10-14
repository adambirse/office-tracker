import * as cdk from '@aws-cdk/core';
import { OfficeDatabase } from 'office-database';
import { OfficeApi } from 'office-api';

export class ReactshoppeApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const api = new OfficeApi(this, 'ReactshoppeApi');
    const db = new OfficeDatabase(this, 'ReactshoppeDatabase');

    db.allowCrud(api.handler);
  }
}
