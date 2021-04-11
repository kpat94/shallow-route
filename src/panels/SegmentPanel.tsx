import React, { FC, useEffect, useState } from 'react';

export const SegmentPanel: FC<{ id: number }> = ({ id }) => {
  const [ name, setName ] = useState('');
  // You might need to add some code here.

  useEffect(() => {
    // You must change this function.  You will need to use the functions in
    // `models.ts`.
    setName('mock segment');
  }, [ id, setName ]);

  return <div>{name ? name : 'loading segment'}</div>;
};
