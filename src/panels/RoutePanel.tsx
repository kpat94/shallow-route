import React, { FC, useEffect, useState } from "react";
import { List } from "../List";
import { routeById } from "../models";

export const RoutePanel: FC<{ id: number }> = ({ id }) => {
  const [route, setRoute] = useState<
    | {
        name: string;
        segmentIds: number[];
      }
    | string
  >("");
  // You might need to add some code here.

  useEffect(() => {
    setRoute("");
    routeById(id).then((route) =>
      // You might need to change this function.

      setRoute(
        route
          ? {
              name: route.name,
              segmentIds: route.segments.map(({ id }) => id),
            }
          : "missing route"
      )
    );
  }, [id, setRoute]);

  return (
    <div>
      {typeof route === "string" ? (
        route ? (
          route
        ) : (
          "loading route"
        )
      ) : (
        <>
          <div>{route.name}</div>
          <div>segments:</div>
          <List path="/segments/" ids={route.segmentIds} />
        </>
      )}
    </div>
  );
};
