import React from "react";

const SearchEvents = ({ events, selectedDate }) => {
    if (!selectedDate) {
        return <p>Please select a date to view events.</p>;
    }

    const eventsOnSelectedDate = events.filter(event => event.date.toDateString() === selectedDate.toDateString());

    return (
        <div className="event-list">
            <h2>Events on {selectedDate.toDateString()}</h2>
            {eventsOnSelectedDate.length > 0 ? (
                <div className="event-cards">
                    {eventsOnSelectedDate.map((event) => (
                        <div key={event.id} className={`event-card ${event.isCompleted ? "completed" : ""}`}>
                            <p>{event.title}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No events on this date</p>
            )}
        </div>
    );
};

export default SearchEvents;
