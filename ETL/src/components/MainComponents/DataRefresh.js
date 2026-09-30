import React, { useState } from 'react';
import "../../styles/custom_field.css";
import Delete from '../../assets/delete.png';
import 'devextreme/dist/css/dx.light.css';
import SubPanel from '../Common/SubPanel';
import { Button } from 'devextreme-react/button.js';
import Switch from 'devextreme-react/switch.js';

const DataRefresh = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const [isPurge, setIsPurge] = useState(false);
    const [scheduleMode, setScheduleMode] = useState("Weekly"); // Default to Daily
    const [selectedDays, setSelectedDays] = useState([]);
    const [scheduleTimes, setScheduleTimes] = useState([]); // Default one time slot
    const [timeSlots, setTimeSlots] = useState([""])

    const handleIsPurgeChange = () => setIsPurge(!isPurge);

    const handleScheduleModeChange = () => {
        setScheduleMode(scheduleMode === "Weekly" ? "Daily" : "Weekly");
    };

    const toggleDaySelection = (day) => {
       
        setSelectedDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };
    // Add time slot
    const addTimeSlot = () => {
        setTimeSlots([...timeSlots, ""]);
    };

     // Delete a time slot by index
     const deleteTimeSlot = (index) => {
        const newSlots = timeSlots.filter((_, i) => i !== index);
        setTimeSlots(newSlots);
    };

    const handleSave = async () => {
        const payload = {
            IsPurge: !isPurge,
            ScheduleMode: !scheduleMode,
            WeeklyDays: selectedDays,
            SchdeuleTimes: timeSlots,
        };

        console.log("Payload:", payload);

        try {
            const response = await fetch(
                "http://10.20.0.187:84/ETL2/api/ETLApi/SubmitDsSchduleInfo?processId=20&createdBy=3",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (response.ok) {
                const result = await response.json();
                console.log("Response:", result);
                alert("Data saved successfully!");
            } else {
                alert("Failed to save data.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while saving data.");
        }
    };

    return (
        <>
            <div className="container-fluid">
                <div className="sectionpanel">
                    <ul className="breadcrumb customization_breadrumbs">
                        <li><a href="#">Admin</a></li>
                        <li><a href="#">Inventory Setup</a></li>
                    </ul>

                    <div className="boxpanel submenulist">
                        <SubPanel />
                        <div className="content_section">
                            <div className="datalevel">
                                <h3 className="fieldmapping_title"> Data Refresh </h3>
                            </div>

                            <div className="contentbox">
                                {/* Purge Section */}
                                <div className="datarefresh_panel">
                                    <label style={{fontWeight: "bold"}}>Purge </label>
                                    <div className="filtercheckpanel">
                                        <input
                                            type="checkbox"
                                            name=""
                                            value=""
                                            id="my-checkbox1"
                                            checked={isPurge}
                                            onChange={handleIsPurgeChange}
                                        />
                                        <label htmlFor="my-checkbox1" className="label-hidden"></label>
                                        <label htmlFor="my-checkbox1" className="first-label label-displayed">Yes</label>
                                        <label htmlFor="my-checkbox1" className="second-label label-displayed">No</label>
                                    </div>
                                </div>

                                {/* Refresh Frequency Section */}
                                <div className="datarefresh_panel">
                                    <label style={{fontWeight: "bold"}}>Refresh Frequency</label>
                                    <div className="frequencypanel">
                                        <input
                                            type="checkbox"
                                            id="frequency-checkbox"
                                            checked={scheduleMode === "Daily"} // Checkbox is checked if Daily
                                            onChange={handleScheduleModeChange} // Toggle between Daily and Weekly
                                        />
                                        <label htmlFor="frequency-checkbox" className="label-hidden"></label>
                                        <label htmlFor="frequency-checkbox" className="first-label label-displayed">Daily</label>
                                        <label htmlFor="frequency-checkbox" className="second-label label-displayed">Weekly</label>
                                    </div>
                                </div>
                                {scheduleMode === "Daily" && (
                                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                                        {days.map((day) => (
                                            <Button
                                                key={day}
                                                style={{
                                                    ...styles.card,
                                                    backgroundColor: selectedDays.includes(day)
                                                        ? "#113e70" // Selected background color
                                                        : (selectedDays.length >= 3 && !selectedDays.includes(day)) // If 3 days are selected and this one is not, change the background
                                                            ? "#f0f0f0" // Background color for unselectable days when limit is reached
                                                            : "#fff",
                                                    color: selectedDays.includes(day) ? "#fff" : "#000",
                                                    cursor: selectedDays.length >= 3 && !selectedDays.includes(day) ? 'not-allowed' : 'pointer', // Disable pointer events if 3 days are selected
                                                }}
                                                text={day}
                                                onClick={() => toggleDaySelection(day)}
                                                stylingMode="outlined"
                                                width={120}
                                                height={40}
                                                disabled={selectedDays.length >= 3 && !selectedDays.includes(day)} // Disable unselectable buttons
                                            />
                                        ))}
                                    </div>
                                )}


                                {/* Schedule Times Section */}
                                <div className="datarefresh_content">
                                {timeSlots.map((time, index) => (
                                        <div key={index} className="timerpanel">
                                            <input
                                                type="time"
                                                value={time}
                                                onChange={(e) => {
                                                    const newSlots = [...timeSlots];
                                                    newSlots[index] = e.target.value; // Update the specific time slot
                                                    setTimeSlots(newSlots);
                                                }}
                                            />
                                            <img src={Delete} alt="Delete" onClick={() => deleteTimeSlot(index)}></img>
                                        </div>
                                    ))}
                                   
                                    <button
                                        className="btns_addtion"
                                        style={{ marginTop: "20px", color: "white", background: "#113e70" }}
                                        onClick={addTimeSlot} // Add the new time slot
                                    >
                                        Add Slot
                                    </button>
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="footerlevel">
                                <div className="footerbutton">
                                    <button
                                        type="button"
                                        className="btn btn-default btnsave"
                                        data-dismiss="modal"
                                        onClick={() => handleSave()} // Handle save
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// Styling for the buttons and containers
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: '20px',
    },
    card: {
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '4px',
        marginRight: "10px"
    },
};

export default DataRefresh;
