import React, { useState } from 'react';
import Notification from './Notification'; // Adjust the import based on your folder structure

const MyComponent = () => {
    const [notificationVisible, setNotificationVisible] = useState(false);

    const handleDelete = () => {
        // Perform delete action here

        // Show notification
        setNotificationVisible(true);

        // Hide notification after duration
        setTimeout(() => {
            setNotificationVisible(false);
        }, 3000); // Duration must match the Notification component duration
    };

    return (
        <div>
            <button onClick={handleDelete}>Delete</button>
            <Notification
                message="Item deleted successfully!"
                visible={notificationVisible}
                duration={3000} // Duration must match the hide timeout
            />
        </div>
    );
};

export default MyComponent;
