import React from "react";
import { Popup } from "devextreme-react/popup";

const PopupDialog = ({ 
    isVisible, 
    onClose, 
    onConfirm, 
    title = "Confirmation", 
    content = "Are you sure you want to proceed?", 
    confirmText = "Yes", 
    cancelText = "No" 
}) => {
    return (
        <Popup
            visible={isVisible}
            onHiding={onClose}
            dragEnabled={false}
            closeOnOutsideClick={true}
            showCloseButton={true}
            title={title}
            width={400}
            height={200}
            style={{padding: "20px"}}
        >
            <div>
                <p>{content}</p>
                <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                    <button className="btn btn-default" onClick={onClose}>
                        {cancelText}
                    </button>
                    <button className="btn btn-primary" onClick={onConfirm}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </Popup>
    );
};

export default PopupDialog;
