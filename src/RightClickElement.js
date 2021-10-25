import React from "react";
import "./App.css";

function RightClickElement(props) {
  const changeColor = (color) => {
    let mainEvents = [...props.events];
    mainEvents = mainEvents.map((x) => {
      if (x.id === props.rightClickevent.id) {
        x.color = color;
      }
      return x;
    });
    props.setEvents(mainEvents);
    props.setRightclick(false);
  };

  const deleteEvent = () => {
    let mainEvents = [...props.events];
    mainEvents = mainEvents.filter((x) => x.id !== props.rightClickevent.id);
    props.setEvents(mainEvents);
    props.setRightclick(false);
  };

  if (props.rightclick) {
    return (
      <div
        className="event-settings"
        style={{
          top: props.pageY,
          left: props.pageX,
          zIndex: "3",
          backgroundColor: "white",
        }}
      >
        <button className="event-settings-delete" onClick={deleteEvent}>
          Delete
        </button>
        {!props.rightClickevent.blocked ? (
          <div>
            <p>Change Color</p>
            <div className="event-settings-color">
              <button
                className="event-settings-color-button"
                style={{ backgroundColor: "#62CFA7" }}
                onClick={() => changeColor("#62CFA7")}
              ></button>
              <button
                className="event-settings-color-button"
                style={{ backgroundColor: "#27A577" }}
                onClick={() => changeColor("#27A577")}
              ></button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
  return null;
}

export default RightClickElement;
