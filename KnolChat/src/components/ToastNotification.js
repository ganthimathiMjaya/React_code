import React, { useState } from "react";
import { Toast } from "devextreme-react/toast";

const ToastNotification = ({ message, type, visible, onClose }) => {
    return (
        <Toast
        message={message}
        type={type} // success, error, info, warning
        visible={visible}
        onHiding={onClose}
        displayTime={3000} // Toast display time in milliseconds
        position={{
            at: "top right", // Position at the top-right corner
            my: "top right", // Align the Toast relative to the corner
            of: window, // Position relative to the window
        }}
        width={400} // Custom toast width
    />
    );
};

export default ToastNotification;
