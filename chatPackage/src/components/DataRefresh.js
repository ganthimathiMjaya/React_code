import React, { useState } from 'react';
import 'devextreme/dist/css/dx.light.css';
import "../styles/bootstrap.css";



const DataRefresh = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const [isPurge, setIsPurge] = useState(false);
    const [scheduleMode, setScheduleMode] = useState("Weekly");
    const [selectedDays, setSelectedDays] = useState([]);
    const [timeSlots, setTimeSlots] = useState([""]);


    const handleIsPurgeChange = () => setIsPurge(!isPurge);

    const handleScheduleModeChange = () => {
        setScheduleMode(scheduleMode === "Weekly" ? "Daily" : "Weekly");
    };

    const addTimeSlot = () => {
        setTimeSlots([...timeSlots, ""]);
    };

    const toggleActive = (day) => {
        setSelectedDays(prevSelectedDays => {
            if (prevSelectedDays.includes(day)) {
                return prevSelectedDays.filter(d => d !== day);
            } else {
                return [...prevSelectedDays, day];
            }
        });
    };

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
        try {
            const response = await fetch(
                "https://etlapi.accesshealthcare.co/api/ETLApi/SubmitDsSchduleInfo?processId=20&createdBy=1",
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
            } else {
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <div>
                <div>
                    <div className="boxpanel submenulist">
                        <div className="content_section">
                            <div className="datalevel">
                                <h3 className="fieldmapping_title"> Data Refresh </h3>
                            </div>

                            <div className="contentbox">
                                {/* Purge Section */}
                                <div className="datarefresh_panel">
                                    <label style={{ fontWeight: "bold" }}>Purge </label>
                                    <div className="filtercheckpanel" style={{ marginLeft: "9px" }}>
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
                                    <label style={{ fontWeight: "bold" }}>Refresh Frequency</label>
                                    <div className="frequencypanel">
                                        <input
                                            type="checkbox"
                                            id="frequency-checkbox"
                                            checked={scheduleMode === "Daily"}
                                            onChange={handleScheduleModeChange}
                                        />
                                        <label htmlFor="frequency-checkbox" className="label-hidden"></label>
                                        <label htmlFor="frequency-checkbox" className="first-label label-displayed">Daily</label>
                                        <label htmlFor="frequency-checkbox" className="second-label label-displayed">Weekly</label>
                                    </div>
                                </div>

                                {/* Display Days Section when Daily is selected */}
                                {scheduleMode === "Daily" && (
                                    <div id="divSchduleDays">
                                        <div className="timerpanelnew">
                                            {days.map((day) => (
                                                <label
                                                    key={day}
                                                    data-value={day}
                                                    onClick={() => toggleActive(day)}
                                                    className={selectedDays.includes(day) ? "active" : ""}
                                                >
                                                    {day}
                                                </label>
                                            ))}
                                        </div>
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
                                                    newSlots[index] = e.target.value;
                                                    setTimeSlots(newSlots);
                                                }}
                                            />
                                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAstJREFUeF7tmN1tFFEMhU+KQKGGUALvQVACSQuBWhJaAEoAkfeUkNQAShGgQZESsdJeG9vjO5tvX9fX9pzPx/NzJH6tChy1Vqe4ANA8BAAAQLMCzeVxAACaFWgujwMA0KxAc3kcAIBmBZrL4wAA7Cjwu1iTqYZuqmYehAdA8QSO0gNgpFDx/wBwClwtmLOd1cNDazx0eKWdvbqizoIhDUOHAfBXgZCGocMAAIBzW5SEh4Y4dBgH4ICSkXYmDQ1x6DAOmMMB/w7M6L0gA7pzSF3hq/ZfIcaqF+CS1ha8av8A2IUCANuglkUBoExaW2IA2HQqiwJAmbS2xACw6VQW9ewBRAXoPu+ajBkfQ7sFjNYHwECB0dABoFlAAADAtcV2gqMTtPXzLvVG+9CVzPh5elQTAP+j+pMzWxcw2r9LvtE0upLhAL9cAOBz9MHdxF02wAE4AAe4LGMIjj5FbP28QaLHEFYQK4gV5LKMIXjrKyTav0EiVtA+kQDA11CXiQ5uh+MAHIAD9imQ+uiemoyvof7JBQAvYgd3E3fZAAfgABzgsowhOPocvfXzBon4FMGniD0K4ACXh/JvYgAAwF4FUp8cU5PxJuwfXQDkr1AXBQAAgBcxl2UMwdGnGEOJ0pBV+59xBZWqa0gOAINIlSEAqFTXkBsABpEqQwBQqa4hNwAMIlWGAKBSXUPuzQP4KenYcKFbDPkl6WVm4xXvAT8knWY2OVGua0lvMvupAHAl6SKzyYlyfZL0IbOfCgBvJX3LbHKiXO8kfc/spwLA0t9nSWeZjU6Q64uk8+w+qgAsfY6eJrKvpTpfiVYlSZ8osezLy2plivN/lLTc10p+1QCWpl9Lei/pRNIrSS9KriQv6b2kW0l3kr5KuslLvZtpDQCV/W8+NwCaEQIAAM0KNJfHAQBoVqC5PA4AQLMCzeVxAACaFWgujwMA0KxAc/k/MerOYd675I0AAAAASUVORK5CYII=" alt="Delete" onClick={() => deleteTimeSlot(index)} />
                                        </div>
                                    ))}

                                    <button
                                        className="btns_addtion"
                                        style={{ marginTop: "20px", color: "white", background: "#113e70" }}
                                        onClick={addTimeSlot}
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
                                        onClick={handleSave}
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
    card: {
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '4px',
        marginRight: "10px"
    },


};

export default DataRefresh;
