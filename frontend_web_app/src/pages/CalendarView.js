import React, { useState, useEffect } from "react";
import { calendarAPI } from "../services/apiService";
import { useUser } from "../contexts/UserContext";

/**
 * PUBLIC_INTERFACE
 * Full-page, interactive calendar view for work logs and leaves.
 * Visually appealing and expands to fill the content area.
 */
function CalendarView() {
  const { user } = useUser();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("default", { month: "long" });

  // Load calendar events when date changes
  useEffect(() => {
    if (user) {
      loadCalendarEvents();
    }
  }, [user, year, month]);

  async function loadCalendarEvents() {
    try {
      setIsLoading(true);
      const calendarData = await calendarAPI.getCalendarEvents(year, month);
      
      // Transform API response to events object keyed by day
      const eventsMap = {};
      calendarData.forEach(event => {
        const eventDate = new Date(event.date);
        const day = eventDate.getDate();
        
        if (!eventsMap[day]) {
          eventsMap[day] = [];
        }
        
        eventsMap[day].push({
          type: event.type, // 'log' or 'leave'
          title: event.title || event.description,
          id: event.id,
          status: event.status
        });
      });
      
      setEvents(eventsMap);
    } catch (error) {
      console.error('Error loading calendar events:', error);
      setEvents({});
    } finally {
      setIsLoading(false);
    }
  }

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

  if (!user) {
    return (
      <div className="loading-text">
        <div className="loading-spinner"></div>
        Loading calendar...
      </div>
    );
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>{`${monthName} ${year}`}</h2>
        <div className="calendar-nav">
          <button 
            onClick={() => changeMonth(-1)} 
            aria-label="Previous month"
            disabled={isLoading}
          >
            &larr;
          </button>
          <button 
            onClick={() => changeMonth(1)} 
            aria-label="Next month"
            disabled={isLoading}
          >
            &rarr;
          </button>
        </div>
      </div>
      
      {isLoading && (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <div className="loading-spinner"></div>
          <div style={{ marginTop: "10px" }}>Loading calendar events...</div>
        </div>
      )}
      
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
