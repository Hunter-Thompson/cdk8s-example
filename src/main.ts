import { App, Chart, ChartProps, ApiObject } from 'cdk8s';
import { Construct } from 'constructs';

export class MyChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = { }) {
    super(scope, id, props);

    const label = { app: 'hello-k8s' };

    // create a deployment nginx  
    new ApiObject(this, 'deployment', {
      apiVersion: 'apps/v1',
      kind: 'Deployment',
      metadata: {
        name: 'nginx-deployment',
        namespace: 'frontend',
      },
      spec: {
        replicas: 1,
        selector: {
          matchLabels: label
        },
        template: {
          metadata: {
            labels: label
          },
          spec: {
            containers: [
              {
                name: 'nginx',
                image: 'nginx:1.14.2',
                ports: [
                  {
                    containerPort: 80
                  }
                ]
              }
            ]
          }
        }
      }
    });
  }

}

const app = new App();
new MyChart(app, 'hello', {
});
const y = app.synthYaml();
console.log(y)
