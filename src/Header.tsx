import React, { FC, useEffect, useState } from 'react';
import { List } from './List';
import { operations } from './models';

export const Header: FC = () => {
  const [ operationIds, setOperationIds ] = useState<number[] | null>(null);

  useEffect(() => {
    operations().then(operations =>
      setOperationIds(operations.map(({ id }) => id))
    );
  }, [ ]);

  return <div>
    {operationIds ?
      <>
        <div>operations:</div>
        <List path="/operations/" ids={operationIds} />
      </> :
      'loading operations'
    }
  </div>;
};
