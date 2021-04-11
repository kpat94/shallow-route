import yaml from 'yaml';

interface Base {
  id: number;
  name: string;
}

interface Segment extends Base { }

interface Route extends Base {
  segments: Segment[];
}

interface Operation extends Base {
  routes: Route[];
}

const yamlData = `
  operations:
  - id: 1
    name: operation 1
    routes:
    - id: 1
      name: route 1
      segments:
      - id: 1
        name: segment 1
      - id: 2
        name: segment 2
      - id: 3
        name: segment 3
    - id: 2
      name: route 2
      segments:
      - id: 4
        name: segment 4
      - id: 5
        name: segment 5
  - id: 2
    name: operation 2
    routes:
    - id: 3
      name: route 3
      segments:
      - id: 6
        name: segment 6
      - id: 7
        name: segment 7
`;

const models = yaml.parse(yamlData) as { operations: Operation[] };

const simulateLoading = <Result>(result: Result) => new Promise<Result>(
  resolve => setTimeout(() => resolve(result), 1000)
);

export const operations = () => simulateLoading(models.operations);
export const operationById = (id: number) => simulateLoading(
  models.operations.find(operation => operation.id === id)
);
export const routeById = (id: number) => simulateLoading(
  models.operations.flatMap(
    ({ id, routes }) => routes.map(
      route => ({ ...route, operationId: id })
    )
  ).find(
    route => route.id === id
  )
);
export const segmentById = (id: number) => simulateLoading(
  models.operations.flatMap(
    ({ routes }) => routes
  ).flatMap(
    ({ id, segments }) => segments.map(
      segment => ({ ...segment, routeId: id })
    )
  ).find(segment => segment.id === id)
);
