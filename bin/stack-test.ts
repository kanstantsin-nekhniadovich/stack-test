#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { StackTestStack } from '../lib/stack-test-stack';
import { StackRole } from '../lib/stack-role';

const serviceName = 'test-stack-service';

const app = new cdk.App();
  const roleStack = new StackRole(app, 'RoleId', { serviceName: serviceName });

  new StackTestStack(app, 'StackTestStack', { serviceName, role: roleStack.serviceRole });

app.synth();
