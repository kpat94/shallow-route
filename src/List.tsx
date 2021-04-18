import React, { FC, MouseEventHandler, useCallback } from "react";
import { useHistory } from "react-router-dom";

export const List: FC<{
  path: string;
  ids: number[];
}> = ({ path, ids }) => {
  const history = useHistory();

  const click = useCallback<MouseEventHandler>(
    (event) => {
      history.push(`${path}${event.currentTarget.getAttribute("data-id")}`);
    },
    [history, path]
  );

  return (
    <div>
      {ids.map((id) => (
        <button key={id} data-id={id} onClick={click}>
          {id}
        </button>
      ))}
    </div>
  );
};
