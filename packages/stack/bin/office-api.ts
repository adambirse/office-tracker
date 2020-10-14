#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import 'source-map-support/register';
import { OfficeApiStack } from '../office-api-stack';

const app = new cdk.App();
new OfficeApiStack(app, 'OfficeApiStack', { description: 'Office' });
