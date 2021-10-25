import React, { useState } from "react";
import "./App.css";

function EventForm(props) {
  const [selectValue, setSelectValue] = useState("Task");
  const [title, setTitle] = useState("");
  const [flexible, setFlexible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let event = {
      id: props.events.length + 1,
      title: title,
      type: selectValue || "other",
      start: e.currentTarget[2].value
        ? props.selectEvent.startStr.split("T")[0] +
          "T" +
          e.currentTarget[2].value +
          ":00+05:30"
        : props.selectEvent.startStr,
      end: e.currentTarget[3].value
        ? props.selectEvent.endStr.split("T")[0] +
          "T" +
          e.currentTarget[3].value +
          ":00+05:30"
        : props.selectEvent.endStr,
      blocked: false,
      flexible: selectValue === "meeting" && flexible ? true : false,
      color: selectValue === "meeting" && "#538dff",
    };
    props.setEvents([...props.events, event]);
    props.setForm(false);
  };

  const handleChange = (e) => {
    setSelectValue(e.target.value);
  };

  const closeForm = () => {
    props.setForm(false);
  };

  const changeFlexible = (e) => {
    if (e.target.checked) {
      setFlexible(true);
    } else {
      setFlexible(false);
    }
  };

  return (
    <div
      className="event-form"
      style={{
        top: props.selectEvent.jsEvent.pageY,
        left: props.selectEvent.jsEvent.pageX,
        zIndex: "3",
        backgroundColor: "white",
      }}
    >
      <div className="event-form-title">
        <h4>Add Event</h4>
        <button className="event-form-close" onClick={closeForm}>
          x
        </button>
      </div>
      <div className="event-form-inputs">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <div>
            <label>Choose a type: </label>
            <select
              name="types"
              id="event-types"
              value={selectValue || "task"}
              onChange={handleChange}
            >
              <option value="task">Task</option>
              <option value="meeting">Meeting</option>
              <option value="other">Other</option>
            </select>
          </div>
          {selectValue === "meeting" && (
            <div>
              <span id="flexible-text">Flexible</span>
              <input
                type="checkbox"
                name="flexible"
                id="flexible"
                onChange={changeFlexible}
              />
            </div>
          )}
          <input
            id="start-time"
            type="time"
            placeholder="Start Time"
            // onChange={(e) => setTitle(e.target.value)}
          />
          <input
            id="end-time"
            type="time"
            placeholder="End Time"
            // onChange={(e) => setTitle(e.target.value)}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default EventForm;
