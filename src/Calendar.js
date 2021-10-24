import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./App.css";

const Calendar = () => {
  const [rightclick, setRightclick] = useState(false);
  const [postion, setPostion] = useState("");
  const handleClick = (e) => {
    e = e || window.event;
    switch (e.which) {
      case 1:
        alert("left");
        break;
      case 2:
        alert("middle");
        break;
      case 3:
        setPostion(e.clientX + "px, " + e.clientY + "px");
        setRightclick(true);
        break;
    }
  };

  const events = [
    {
      id: 1,
      title: "event 1",
      start: "2021-10-26T10:00:00",
      end: "2021-10-26T12:00:00",
    },
    {
      id: 2,
      title: "event 2",
      start: "2021-10-24T13:00:00",
      end: "2021-10-24T18:00:00",
    },
    { id: 3, title: "event 3", start: "2021-06-17", end: "2021-06-20" },
  ];
  return (
    <div className="main-div">
      {rightclick ? (
        <div
          className="event-settings"
          style={{
            transform: `translate(${postion})`,
            zIndex: "3",
            backgroundColor: "white",
          }}
        >
          <p>Change Color</p>
          <div className="event-settings-color">
            <button
              className="event-settings-color-button"
              style={{ backgroundColor: "#62CFA7" }}
            ></button>
            <button
              className="event-settings-color-button"
              style={{ backgroundColor: "#27A577" }}
            ></button>
          </div>
        </div>
      ) : null}
      <div id="calendar">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            center: "dayGridMonth,timeGridWeek,timeGridDay",
            //   center: "dayGridMonth,timeGridWeek,timeGridDay new",
          }}
          editable="true"
          dayMaxEvents="true" // when too many events in a day, show the popover
          events={events} //"https://fullcalendar.io/demo-events.json?overload-day"
          eventColor="#538DFF"
          nowIndicator
          eventDidMount={(info) => {
            info.el.addEventListener(
              "contextmenu",
              (ev) => {
                ev.preventDefault();
                handleClick(ev);
              },
              true
            );
          }}
        />
      </div>
    </div>
  );
};

export default Calendar;
