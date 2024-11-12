import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = ({ message, visible, duration = 3000 }) => {
    const [progress, setProgress] = useState(100); // Start with full width (100%)
    const [isVisible, setIsVisible] = useState(visible);

    useEffect(() => {
        if (visible) {
            setIsVisible(true);
            setProgress(100); // Reset progress when notification becomes visible

            // Update progress
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev <= 0) {
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - (100 / (duration / 50)); // Decrease progress over time
                });
            }, 50);

            // Hide notification after the duration ends
            const hideTimeout = setTimeout(() => {
                setIsVisible(false);
            }, duration);

            return () => {
                clearInterval(interval); // Cleanup interval on component unmount
                clearTimeout(hideTimeout); // Cleanup timeout on component unmount
            };
        } else {
            // Ensure progress is reset if not visible
            setProgress(100);
        }
    }, [visible, duration]);

    return (
        <div className={`notification ${!isVisible ? 'hide' : ''}`}>
            {message}
            <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

export default Notification;
