import React from 'react';

const UserNotification = ({userMessage}) => {
    let message, className;
    ({message, className} = userMessage);
    if (message === null) {
        return null;
    }
    return (
        <div className={className}>
            {message}
        </div>
    )
}

export default UserNotification;