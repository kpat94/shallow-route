import { open } from "node:fs";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { operationById, operations, routeById, segmentById } from "./models";
import { OperationPanel } from "./panels/OperationPanel";
import { RoutePanel } from "./panels/RoutePanel";
import { SegmentPanel } from "./panels/SegmentPanel";

export const ShallowRoutes: FC = () => {
  const { id, type } = useParams<{
    type: "operations" | "routes" | "segments";
    id: string;
  }>();
  const [operationId, setOperationId] = useState<number | string>(
    "loading operation"
  );
  const [routeId, setRouteId] = useState<number | string>("loading route");
  const [segmentId, setSegmentId] = useState<number | string>(
    "loading segment"
  );

  useEffect(() => {
    // You must change this function.  You will need to use the functions in
    // `models.ts`
    const parsedId = parseInt(id, 10);

    // You must change the content of this condition block.
    if (type === "operations") {
      setOperationId("loading operation");
      operationById(parsedId).then((operation) => {
        if (!operation) {
          setOperationId("missing operation");
          return;
        }
        setOperationId(parsedId);
        return;
      });
    }

    // You may change the content of this condition block.
    if (type === "routes") {
      setSegmentId("");
      setRouteId("loading route");
      routeById(parsedId).then((route) => {
        if (!route) {
          setRouteId("missing route");
          return;
        }

        setOperationId(route.operationId);
        setRouteId(parsedId);
      });
      return;
    }

    // `type` must be 'segments' therefore the `if (type === 'segments')`
    // statement can be omitted.

    // You must change the content below.
    setSegmentId("loading segment");
    segmentById(parsedId).then((segment) => {
      if (!segment) {
        setSegmentId("missing segment");
        return;
      }

      setSegmentId(parsedId);
    });
    return;
  }, [id, type]);

  return (
    <>
      {typeof operationId === "string" && operationId && (
        <div>{operationId}</div>
      )}
      {typeof operationId === "number" && <OperationPanel id={operationId} />}
      {type != "operations" && typeof routeId === "string" && routeId && (
        <div>{routeId}</div>
      )}
      {type != "operations" && typeof routeId === "number" && (
        <RoutePanel id={routeId} />
      )}
      {type != "operations" && typeof segmentId === "string" && segmentId && (
        <div>{segmentId}</div>
      )}
      {type != "operations" && typeof segmentId === "number" && (
        <SegmentPanel id={segmentId} />
      )}
    </>
  );
};
