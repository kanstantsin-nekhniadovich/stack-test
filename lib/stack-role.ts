import * as cdk from 'aws-cdk-lib';
import { Role, AccountRootPrincipal } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class StackRole extends cdk.Stack {
  serviceRole: Role;

  constructor(app: Construct, id: string, props: cdk.StackProps & { serviceName: string }) {
    super(app, id, props);

    this.serviceRole =  new Role(this, `${props.serviceName}-Role`, {
      assumedBy: new AccountRootPrincipal(),
      roleName: `${props.serviceName}-infinity-role`
    });

    new cdk.CfnOutput(this, `${props.serviceName}-RoleName`, {
      value: this.serviceRole.roleName
    })
  }
}
