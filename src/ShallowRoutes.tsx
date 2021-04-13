import React, { FC, useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { operationById, routeById, segmentById } from "./models";
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
  // let operationId: number | string = "loading operation";
  const operationIdRef = useRef<number | string>(operationId);
  const [routeId, setRouteId] = useState<number | string>("loading route");
  const [segmentId, setSegmentId] = useState<number | string>(
    "loading segment"
  );

  useEffect(() => {
    // You must change this function.  You will need to use the functions in
    // `models.ts`
    // let parsedId: number;

    const parsedId = parseInt(id, 10);

    // parsedId = parseInt(id, 10);
    // You must change the content of this condition block.
    if (type === "operations") {
      setOperationId("loading operation");
      // operationId = "loading operation";
      // operationIdRef.current = "loading operation";
      operationById(parsedId).then((operation) => {
        if (!operation) {
          setOperationId("missing operation");
          // operationIdRef.current = "missing operation";
          return;
        }
        setOperationId(parsedId);
        console.log(`Setting operation id`);
        // operationIdRef.current = operationId;
        console.log(`Set operation id: ${operationIdRef.current}`);
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
        // operationIdRef.current = operationId;
        setRouteId(parsedId);
      });
    }

    // `type` must be 'segments' therefore the `if (type === 'segments')`
    // statement can be omitted.

    // You must change the content below.
    if (type === "segments") {
      setSegmentId("loading segment");
      segmentById(parsedId).then((segment) => {
        if (!segment) {
          setSegmentId("missing segment");
          return;
        }

        routeById(segment.routeId).then((route) => {
          if (!route) {
            setRouteId("missing route");
            return;
          }

          setOperationId(route.operationId);
          // operationIdRef.current = operationId;
          setRouteId(route.id);
        });
        setSegmentId(parsedId);
      });
      return;
    }

    // console.log(`Operation is: ${operationIdRef.current}`);
  }, [id, type]);

  console.log(`Id: ${id}`);
  console.log(`Route id: ${routeId}`);
  console.log(`Operation is: ${operationId}`);

  return (
    <>
      {typeof operationId === "string" && operationId && (
        <div>{operationId}</div>
      )}
      {typeof operationId === "number" && <OperationPanel id={operationId} />}
      {type !== "operations" && typeof routeId === "string" && routeId && (
        <div>{routeId}</div>
      )}
      {type !== "operations" && typeof routeId === "number" && (
        <RoutePanel id={routeId} />
      )}
      {type !== "operations" && typeof segmentId === "string" && segmentId && (
        <div>{segmentId}</div>
      )}
      {type !== "operations" && typeof segmentId === "number" && (
        <SegmentPanel id={segmentId} />
      )}
    </>
  );
};
