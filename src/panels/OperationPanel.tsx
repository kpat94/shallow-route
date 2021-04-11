import React, { FC, useEffect, useState } from "react";
import { List } from "../List";
import { operationById } from "../models";

export const OperationPanel: FC<{ id: number }> = ({ id }) => {
  const [operation, setOperation] = useState<
    | {
        name: string;
        routeIds: number[];
      }
    | string
  >("");
  // You might need to add some code here.

  useEffect(() => {
    // You must change this function.  You will need to use the functions in
    // `models.ts`.
    const operationPromise = operationById(id);

    operationPromise.then((resolve) => {
      setOperation({
        name: resolve?.name ? resolve?.name : "",
        routeIds: resolve?.routes
          ? resolve?.routes.map((route) => route.id)
          : [],
      });
    });
  }, [id, setOperation]);

  return (
    <div>
      {typeof operation === "string" ? (
        operation ? (
          operation
        ) : (
          "loading operation"
        )
      ) : (
        <>
          <div>{operation.name}</div>
          <div>routes:</div>
          <List path="/routes/" ids={operation.routeIds} />
        </>
      )}
    </div>
  );
};
