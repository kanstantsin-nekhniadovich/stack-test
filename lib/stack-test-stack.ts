import * as cdk from 'aws-cdk-lib';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Role } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class StackTestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps & { serviceName: string, role: Role }) {
    super(scope, id, props);

    const table = new Table(this, 'StackDynamoTable', {
      tableName: `${props.serviceName}-table`,
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING
      }
    });

    table.grantReadWriteData(props.role);

    new cdk.CfnOutput(this, `${props.serviceName}-TableName`, {
      value: table.tableName
    });
  }
}
