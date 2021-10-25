import React, { useState } from "react";
import "./App.css";

function EventForm(props) {
  const [selectValue, setSelectValue] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let event = {
      id: props.events.length + 1,
      title: title,
      type: selectValue || "other",
      start: props.selectEvent.startStr,
      end: props.selectEvent.endStr,
      blocked: false,
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
            <label for="types">Choose a type: </label>
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
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default EventForm;
