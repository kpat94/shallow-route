import React, { FC, useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { operationById, routeById, segmentById } from "./models";
import { OperationPanel } from "./panels/OperationPanel";
import { RoutePanel } from "./panels/RoutePanel";
import { SegmentPanel } from "./panels/SegmentPanel";

const LAST_CLICK_TIMEOUT = 2500;

export const ShallowRoutes: FC = () => {
  const { id, type } = useParams<{
    type: "operations" | "routes" | "segments";
    id: string;
  }>();

  const [operationId, setOperationId] = useState<number | string>(
    "loading operation"
  );
  const operationIdRef = useRef<number | string>(operationId);

  const [routeId, setRouteId] = useState<number | string>("loading route");
  const routeIdRef = useRef<number | string>(routeId);

  const [segmentId, setSegmentId] = useState<number | string>(
    "loading segment"
  );
  const segmentIdRef = useRef<number | string>(segmentId);

  useEffect(() => {
    // You must change this function.  You will need to use the functions in
    // `models.ts`
    const parsedId = parseInt(id, 10);

    // You must change the content of this condition block.
    if (type === "operations") {
      operationIdRef.current = "loading operation";
      operationById(parsedId).then((operation) => {
        if (!operation) {
          operationIdRef.current = "missing operation";
          return;
        }
        setOperationId("loading operation");
        operationIdRef.current = parsedId;
        return;
      });
    }

    // You may change the content of this condition block.
    if (type === "routes") {
      setSegmentId("");
      segmentIdRef.current = "";
      setRouteId("loading route");
      routeIdRef.current = "loading route";
      routeById(parsedId).then((route) => {
        if (!route) {
          routeIdRef.current = "missing route";
          return;
        }

        operationIdRef.current = route.operationId;
        routeIdRef.current = parsedId;
      });
    }

    // `type` must be 'segments' therefore the `if (type === 'segments')`
    // statement can be omitted.

    // You must change the content below.
    if (type === "segments") {
      setSegmentId("loading segment");
      segmentIdRef.current = "loading segment";
      segmentById(parsedId).then((segment) => {
        if (!segment) {
          segmentIdRef.current = "missing segment";
          return;
        }

        routeById(segment.routeId).then((route) => {
          if (!route) {
            routeIdRef.current = "missing route";
            return;
          }

          operationIdRef.current = operationId;
          routeIdRef.current = route.id;
        });
        segmentIdRef.current = parsedId;
      });
      return;
    }
  }, [id, type]);

  // Perform all state updates after timeout
  useEffect(() => {
    setTimeout(() => {
      setOperationId(operationIdRef.current);
    }, LAST_CLICK_TIMEOUT);
    setOperationId("loading operation");
  }, [operationIdRef.current]);

  useEffect(() => {
    setTimeout(() => {
      setRouteId(routeIdRef.current);
    }, LAST_CLICK_TIMEOUT);
    setRouteId("loading route");
  }, [routeIdRef.current]);

  useEffect(() => {
    setTimeout(() => {
      setSegmentId(segmentIdRef.current);
    }, LAST_CLICK_TIMEOUT);
    setSegmentId("loading segment");
  }, [segmentIdRef.current]);

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
