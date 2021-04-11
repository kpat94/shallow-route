import React, { FC, useEffect, useState } from "react";
import { segmentById } from "../models";

export const SegmentPanel: FC<{ id: number }> = ({ id }) => {
  const [name, setName] = useState("");
  // You might need to add some code here.

  useEffect(() => {
    // You must change this function.  You will need to use the functions in
    // `models.ts`.

    const segmentsPromise = segmentById(id);

    segmentsPromise.then((resolve) => {
      setName(resolve?.name ? resolve.name : "");
    });
  }, [id, setName]);

  return <div>{name ? name : "loading segment"}</div>;
};
