import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import RightClickElement from "./RightClickElement";
import EventForm from "./EventForm";
import energyCircle from "./images/Vector.png";
import "./App.css";

const Calendar = () => {
  const eventArr = [
    {
      id: 1,
      title: "event 1",
      type: "task",
      start: "2021-10-26T10:00:00",
      end: "2021-10-26T12:00:00",
      blocked: false,
    },
    {
      id: 2,
      title: "event 2",
      type: "meeting",
      start: "2021-10-24T13:00:00",
      end: "2021-10-24T18:00:00",
      blocked: false,
      flexible: true,
      color: "#538dff",
    },
    {
      id: 3,
      title: "event 3",
      type: "other",
      start: "2021-10-25",
      end: "2021-10-25",
      blocked: false,
    },
    {
      id: 4,
      title: "Blocked",
      type: "",
      start: "2021-10-28T13:00:00",
      end: "2021-10-28T17:00:00",
      blocked: true,
    },
    {
      id: 5,
      title: "Blocked",
      type: "",
      start: "2021-10-29T14:00:00",
      end: "2021-10-29T16:00:00",
      blocked: true,
    },
  ];

  const [rightclick, setRightclick] = useState(false);
  const [events, setEvents] = useState(eventArr);
  const [event, setEvent] = useState();
  const [trueEvent, setTrueEvent] = useState("");
  const [form, setForm] = useState(false);
  const [selectEvent, setSelectEvent] = useState();

  const handleClick = (e, ev) => {
    ev = ev || window.event;
    if (ev.which === 3) {
      setEvent(events.filter((x) => x.id === Number(e.event.id))[0]);
      setTrueEvent(ev);
      setRightclick(true);
    }
  };

  const handleForm = (e) => {
    setRightclick(false);
    setSelectEvent(e);
    setForm(true);
  };

  return (
    <div className="main-div">
      <div id="calendar">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            center: "timeGridWeek",
          }}
          editable="true"
          eventOverlap={false}
          dayMaxEvents="true"
          events={events} //"https://fullcalendar.io/demo-events.json?overload-day"
          eventColor="#1565c0" //"#538DFF"
          nowIndicator
          selectable="true"
          select={handleForm}
          eventAdd={(e) => {
            console.log(e);
          }}
          eventDidMount={(info) => {
            info.el.setAttribute("id", info.event.id);
            var event = events.filter((x) => x.id === Number(info.event.id))[0];
            if (event.blocked) {
              info.el.classList.add("blocked");
            }
            if (event.type === "task" || event.type === "Task") {
              var parentNode =
                info.el.childNodes[0].childNodes[0].childNodes[1];
              var titleNode = parentNode.childNodes[0];
              var newNode = document.createElement("div");
              newNode.innerHTML = `<div class="fc-event-title fc-sticky">
              <input type="checkbox" id="task-checkbox-${info.event.id}" class="fc-event-checkbox" />
              <span id="event-title-${info.event.id}" class="fc-event-title-text">${event.title}</span>
              </div>`;
              parentNode.replaceChild(newNode, titleNode);
              var checkbox = document.getElementById(
                `task-checkbox-${info.event.id}`
              );
              checkbox.addEventListener("change", (e) => {
                var title = document.getElementById(
                  `event-title-${info.event.id}`
                );
                if (e.target.checked) title.classList.add("task-checked");
                else title.classList.remove("task-checked");
              });
            }
            if (event.type === "meeting" && event.flexible) {
              var mainNode = info.el.childNodes[0].childNodes[0];
              var img = document.createElement("div");
              img.setAttribute("class", "flexible-event");
              img.innerHTML = `<img src=${energyCircle} alt="flexible" class="flexible-icon" />`;
              mainNode.appendChild(img);
            }
            info.el.addEventListener(
              "contextmenu",
              (ev) => {
                ev.preventDefault();
                handleClick(info, ev);
              },
              true
            );
          }}
          eventClick={(info) => {}}
        />
      </div>
      {rightclick && (
        <RightClickElement
          rightclick={rightclick}
          setRightclick={setRightclick}
          events={events}
          setEvents={setEvents}
          rightClickevent={event}
          pageX={trueEvent.pageX}
          pageY={trueEvent.pageY}
        />
      )}
      {form && (
        <EventForm
          selectEvent={selectEvent}
          events={events}
          setForm={setForm}
          setEvents={setEvents}
        />
      )}
    </div>
  );
};

export default Calendar;
