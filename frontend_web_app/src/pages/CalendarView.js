import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * Full-page, interactive calendar view for work logs and leaves.
 * Visually appealing and expands to fill the content area.
 */
function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 (Sun) - 6 (Sat)

  // Generate calendar days
  const calendarDays = [];
  // Days from previous month
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    calendarDays.push({
      day: new Date(year, month - 1, prevMonthLastDay - i),
      isOtherMonth: true,
    });
  }
  
  // Days in current month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: new Date(year, month, i),
      isCurrentMonth: true,
    });
  }
  // Days from next month to fill the grid
  const remainingDays = 42 - calendarDays.length; // 6 weeks grid
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({
      day: new Date(year, month + 1, i),
      isOtherMonth: true,
    });
  }

  // Mock events for the current month (June 2024 for demo)
  const events = {
    4: [{ type: "log", title: "Project Alpha" }],
    7: [{ type: "leave", title: "Personal Leave" }],
    18: [{ type: "log", title: "Design Review" }, { type: 'leave', title: 'Sick' }],
    23: [{ type: "log", title: "Client Meeting" }],
  };

  const changeMonth = (offset) => {
    setCurrentDate(new Date(year, month + offset, 1));
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>{`${monthName} ${year}`}</h2>
        <div className="calendar-nav">
          <button onClick={() => changeMonth(-1)} aria-label="Previous month">&larr;</button>
          <button onClick={() => changeMonth(1)} aria-label="Next month">&rarr;</button>
        </div>
      </div>
      <div className="calendar-grid">
        {dayNames.map(name => <div key={name} className="calendar-day-name">{name}</div>)}
        {calendarDays.map(({ day, isOtherMonth }, index) => {
          const dayNumber = day.getDate();
          const dayEvents = !isOtherMonth && day.getMonth() === month ? events[dayNumber] || [] : [];
          
          let dayClass = "calendar-day";
          if (isOtherMonth) dayClass += " other-month";
          if (isToday(day)) dayClass += " today";

          return (
            <div key={index} className={dayClass}>
              <div className={`day-number ${isToday(day) && !isOtherMonth ? 'today-marker' : ''}`}>
                {dayNumber}
              </div>
              <div className="day-events">
                {dayEvents.map((event, i) => (
                  <div key={i} className={`calendar-event ${event.type === 'log' ? 'event-log' : 'event-leave'}`}>
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
       <div className="calendar-legend">
        <div className="legend-item">
            <div className="legend-color" style={{ background: "var(--accent-yellow)" }}></div>
            <span>Work Log</span>
        </div>
        <div className="legend-item">
            <div className="legend-color" style={{ background: "var(--accent-pink)" }}></div>
            <span>Leave</span>
        </div>
      </div>
    </div>
  );
}

export default CalendarView;
