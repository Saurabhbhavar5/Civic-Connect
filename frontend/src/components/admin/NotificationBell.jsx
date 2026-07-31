import React, { useState } from "react";
import "./NotificationBell.css";

const sampleNotifications = [
  { id: 1, text: "New complaint CMP-1004 submitted", time: "5m ago" },
  { id: 2, text: "CMP-1002 marked In Progress", time: "1h ago" },
  { id: 3, text: "CMP-1003 resolved", time: "3h ago" },
];

// Uses useState, conditional rendering, and map() to display
// a bell icon with a dynamic notification dropdown.
function NotificationBell() {
  const [open, setOpen] = useState(false);

  return (
    <div className="notification-bell">
      <button className="notification-bell-icon" onClick={() => setOpen(!open)}>
        🔔
        {sampleNotifications.length > 0 && (
          <span className="notification-bell-badge">{sampleNotifications.length}</span>
        )}
      </button>
      {open && (
        <div className="notification-bell-dropdown">
          {sampleNotifications.map((note) => (
            <div className="notification-bell-item" key={note.id}>
              <p>{note.text}</p>
              <span>{note.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
