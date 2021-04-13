import React, {
  FC,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useHistory } from "react-router-dom";

export const List: FC<{
  path: string;
  ids: number[];
}> = ({ path, ids }) => {
  const history = useHistory();
  // Array to hold all successive events
  let eventsArray: Array<React.MouseEvent<Element, MouseEvent>> = [];

  // Hold the latest click event
  let latestEvent: React.MouseEvent<Element, MouseEvent>;

  // TODO: Use the topmost element in the array. This will be the latest click event. All previous events are not required.
  // This should prevent results from all previous events from being displayed on the screen

  const click = useCallback<MouseEventHandler>(
    (event) => {
      eventsArray.push(event);
      const timer = setTimeout(() => {
        latestEvent = eventsArray[eventsArray.length - 1];
        console.log(`Event from setTimeOut: ${event.view}`);
        history.push(
          `${path}${latestEvent.currentTarget.getAttribute("data-id")}`
        );
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
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
