import React from "react";

const CreateEvent = ({ selectedDate, eventName, onNameChange, onCreateEvent }) => {
    return (
        selectedDate && (
            <div className="event-form">
                <h2>Create Event</h2>
                <p>Selected Date: {selectedDate.toDateString()}</p>
                <input
                    type="text"
                    placeholder="Event Name"
                    value={eventName}
                    onChange={onNameChange}
                />
                <button className="create-btn" onClick={onCreateEvent}>
                    Add Event
                </button>
            </div>
        )
    );
};

export default CreateEvent;
