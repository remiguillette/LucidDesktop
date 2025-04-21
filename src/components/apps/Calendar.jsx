
import React, { useState } from 'react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showYearSelect, setShowYearSelect] = useState(false);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  const changeYear = (year) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    setCurrentDate(newDate);
    setShowYearSelect(false);
  };

  const renderYearSelect = () => {
    const currentYear = currentDate.getFullYear();
    const years = [];
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
      years.push(
        <div
          key={i}
          className={`year-option ${i === currentYear ? 'selected' : ''}`}
          onClick={() => changeYear(i)}
        >
          {i}
        </div>
      );
    }
    return (
      <div className="year-select">
        {years}
      </div>
    );
  };

  const renderCalendar = () => {
    const days = [];
    const weekDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

    weekDays.forEach(day => {
      days.push(
        <div key={`header-${day}`} className="calendar-header-cell">
          {day}
        </div>
      );
    });

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-cell empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = 
        day === new Date().getDate() && 
        currentDate.getMonth() === new Date().getMonth() &&
        currentDate.getFullYear() === new Date().getFullYear();
      days.push(
        <div
          key={`day-${day}`}
          className={`calendar-cell ${isToday ? 'today' : ''}`}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-nav">
        <button onClick={() => changeMonth(-1)}>&lt;</button>
        <div className="calendar-title" onClick={() => setShowYearSelect(!showYearSelect)}>
          {currentDate.toLocaleDateString('fr-CA', {
            month: 'long',
            year: 'numeric'
          })}
        </div>
        <button onClick={() => changeMonth(1)}>&gt;</button>
      </div>
      {showYearSelect && renderYearSelect()}
      <div className="calendar-grid">{renderCalendar()}</div>
    </div>
  );
};

export default Calendar;
