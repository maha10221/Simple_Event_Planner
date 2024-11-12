import React, { useState } from "react";

const EventList = ({ events, Mark_As_Completed, Delete_Event_Fun, Update_Event_Fun }) => {
    const [filter, setFilter] = useState("all");

    const filteredEvents = events.filter((event) => {
        if (filter === "completed") return event.isCompleted;
        if (filter === "notCompleted") return !event.isCompleted;
        return true;
    });

    return (
        <div className="event-list">
            <h2>All Event List</h2>
            <div className="filter-buttons">
                <button onClick={() => setFilter("all")}>All</button>
                <button onClick={() => setFilter("completed")}>Completed</button>
                <button onClick={() => setFilter("notCompleted")}>Not Completed</button>
            </div>
            <div className="event-cards">
                {filteredEvents.map((event) => (
                    <div key={event.id} className={`event-card ${event.isCompleted ? "completed" : "not-completed"}`}>
                        <div className="event-card-header">
                            <span className="event-date">{event.date.toDateString()}</span>
                            <div className="event-actions">
                                <button className="update-btn" onClick={() => Update_Event_Fun(event.id, prompt("ENTER NEW TITLE"))}>
                                    Update Event
                                </button>
                                <button className="delete-btn" onClick={() => Delete_Event_Fun(event.id)}>
                                    Delete Event
                                </button>
                                <button className={`complete-btn ${event.isCompleted ? "green" : "red"}`} onClick={() => Mark_As_Completed(event.id)}>
                                    {event.isCompleted ? "Completed ✓" : "Mark as Completed"}
                                </button>
                            </div>
                        </div>
                        <div className="event-card-body">
                            <p className="event-title">{event.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventList;
