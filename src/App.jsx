import React, { useState } from "react";
import Calendar from "react-calendar";
import CreateEvent from "./components/CreateEvent";
import EventList from "./components/EventList";
import SearchEvents from "./components/SearchEvents";
import Notification from "./components/Notification";
import "./Calendar.css";
import "./App.css";

const App = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [eventName, setEventName] = useState("");
    const [events, setEvents] = useState([]);
    const [notification, setNotification] = useState({ message: "", visible: false });

    const showNotification = (message) => {
        setNotification({ message, visible: true });
        setTimeout(() => {
            setNotification((prev) => ({
                ...prev,
                visible: false
            }));
        }, 5000); // Notification will stay visible for 5 seconds
    };

    const Date_Click_Fun = (date) => setSelectedDate(date);

    const Event_Data_Update = (event) => setEventName(event.target.value);

    const Create_Event_Fun = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate && eventName) {
            if (selectedDate < today) {
                showNotification("Cannot create events for past dates!");
            } else {
                const newEvent = {
                    id: new Date().getTime(),
                    date: selectedDate,
                    title: eventName,
                    isCompleted: false,
                };
                setEvents([...events, newEvent]);
                setSelectedDate(null);
                setEventName("");
                showNotification("Event added successfully!");
            }
        }
    };

    const Update_Event_Fun = (eventId, newName) => {
        const updated_Events = events.map((event) =>
            event.id === eventId ? { ...event, title: newName } : event
        );
        setEvents(updated_Events);
        showNotification("Event updated successfully!");
    };

    const Delete_Event_Fun = (eventId) => {
        setEvents(events.filter((event) => event.id !== eventId));
        showNotification("Event deleted successfully!");
    };

    const Mark_As_Completed = (eventId) => {
        const updated_Events = events.map((event) =>
            event.id === eventId ? { ...event, isCompleted: !event.isCompleted } : event
        );
        setEvents(updated_Events);
    };

    return (
        <div className="app">
            <Notification message={notification.message} visible={notification.visible} />
            <h1>Event Booking</h1>
            <div className="container">
                <div className="calendar-container">
                    <Calendar
                        value={selectedDate}
                        onClickDay={Date_Click_Fun}
                        tileClassName={({ date }) =>
                            events.some(event => event.date.toDateString() === date.toDateString()) ? "event-marked" : ""
                        }
                    />
                </div>

                <CreateEvent
                    selectedDate={selectedDate}
                    eventName={eventName}
                    onNameChange={Event_Data_Update}
                    onCreateEvent={Create_Event_Fun}
                />

                <SearchEvents events={events} selectedDate={selectedDate} />
            </div>

            <EventList
                events={events}
                Mark_As_Completed={Mark_As_Completed}
                Delete_Event_Fun={Delete_Event_Fun}
                Update_Event_Fun={Update_Event_Fun}
            />
        </div>
    );
};

export default App;
