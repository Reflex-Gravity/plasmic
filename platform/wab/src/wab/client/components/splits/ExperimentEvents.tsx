// This is a skeleton starter React component generated by Plasmic.
// This file is owned by you, feel free to edit as you see fit.
import { HTMLElementRefOf } from "@plasmicapp/react-web";
import * as React from "react";
import PlasmicExperimentEvent from "../../plasmic/plasmic_kit_optimize/PlasmicExperimentEvent";
import {
  DefaultExperimentEventsProps,
  PlasmicExperimentEvents,
} from "../../plasmic/plasmic_kit_optimize/PlasmicExperimentEvents";

// Your component props start with props for variants and slots you defined
// in Plasmic, but you can add more here, like event handlers that you can
// attach to named nodes in your component.
//
// If you don't want to expose certain variants or slots as a prop, you can use
// Omit to hide them:
//
// interface ExperimentEventsProps extends Omit<DefaultExperimentEventsProps, "hideProps1"|"hideProp2"> {
//   // etc.
// }
//
// You can also stop extending from DefaultExperimentEventsProps altogether and have
// total control over the props for your component.
export interface ExperimentEventsProps extends DefaultExperimentEventsProps {
  events: string[];
  changeEvents: (_: string[]) => void;
}

function ExperimentEvents_(
  props: ExperimentEventsProps,
  ref: HTMLElementRefOf<"div">
) {
  const { events, changeEvents } = props;
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <PlasmicExperimentEvents
      root={{ ref }}
      isExpanded={isExpanded}
      newBtn={{
        onClick: () => changeEvents([...events, ""]),
      }}
      expandBtn={{
        onClick: () => {
          setIsExpanded((e) => !e);
        },
      }}
      children={events.map((event, idx) => {
        return (
          <PlasmicExperimentEvent
            key={`ext-${event}-${idx}`}
            input={{
              value: event,
              onChange: (e) => {
                e.persist();
                if (e.target.value) {
                  const newEvents = [...events];
                  newEvents[idx] = e.target.value;
                  changeEvents(newEvents);
                }
              },
            }}
            withoutLabel={idx !== 0}
          />
        );
      })}
    />
  );
}

const ExperimentEvents = React.forwardRef(ExperimentEvents_);
export default ExperimentEvents;
