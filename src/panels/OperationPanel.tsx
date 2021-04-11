import React, { FC, useEffect, useState } from 'react';
import { List } from '../List';

export const OperationPanel: FC<{ id: number }> = ({ id }) => {
  const [ operation, setOperation ] = useState<{
    name: string;
    routeIds: number[];
  } | string>('');
  // You might need to add some code here.

  useEffect(() => {
    // You must change this function.  You will need to use the functions in
    // `models.ts`.
    setOperation({
      name: 'mock operation',
      routeIds: [ 1, 2 ]
    });
  }, [ id, setOperation ]);

  return <div>
    {typeof operation === 'string' ?
      operation ? operation : 'loading operation' :
      <>
        <div>{operation.name}</div>
        <div>routes:</div>
        <List path="/routes/" ids={operation.routeIds} />
      </>
    }
  </div>;
};
