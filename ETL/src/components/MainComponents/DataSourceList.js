import React, { useState, useEffect } from 'react';
import "../../styles/sourceList.css";
import 'devextreme/dist/css/dx.light.css';
import Edit from '../../assets/edit.png';
import Excel from '../../assets/Excel.png';
import CSV from '../../assets/csv.png';
import Delete from '../../assets/delete.png';
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/actions/actions";
import { Popup } from 'devextreme-react/popup.js';
import axios from 'axios';


const DataSourceList = ({onEditSource}) => {
    const dispatch = useDispatch();
    const [isPopupVisible, setPopupVisible] = useState(false); 
    const [selectedItem, setSelectedItem] = useState(null);

    const data = useSelector((state) => state.dataSource.fetchAppRepository.data);

    useEffect(() => {
        dispatch(actions.FETCH_APP_SOURCE()); 
    }, [dispatch]);

    const showDeleteConfirmation = (item) => {
        setSelectedItem(item); 
        setPopupVisible(true); 
    };

    const handleEdit = (item) => {
        if (onEditSource) {
            onEditSource(item); 
        }
    };

    const handleDelete = async () => {
        if (!selectedItem) return;

        const apiUrl = `http://10.20.0.187:84/ETL2/api/ETLApi/DeleteDataSource`;

        try {
            const response = await axios.get(apiUrl, {
                params: {
                    processId: selectedItem.ProcessId,
                    dsUniqueId: selectedItem.DsUniqueId,
                    createdBy: 3, 
                },
            });

            if (response.status === 200) {
                // Optionally refresh the data
                dispatch(actions.FETCH_APP_SOURCE());
            } else {
                console.warn("Unexpected response:", response);
            }
        } catch (error) {
            console.error("Error deleting data source:", error);
            alert("Failed to delete the data source.");
        }

        setPopupVisible(false); // Close the popup after deletion
    };

    return (
        <div>
            <div className="content_section">
                <div className="contentbox">
                    <div className="contentbox">
                        <div className="content">
                            <div className="gridsection">
                                {data.map((item) => (
                                    <div className="cliampanel" key={item.DsId}>
                                        <div>
                                            <img
                                                src={item.DataSoruceName.includes('Excel') ? Excel : CSV}
                                                alt=""
                                                className="imagepanel"
                                                style={{ marginLeft: "4px" }}
                                            />
                                        </div>
                                        <div className="contentpanel">
                                            <h3>{item.DataSoruceName}</h3>
                                            <span> CSV</span>
                                        </div>
                                        <div className="iconpanel">
                                            <div className="lasticonsection">
                                                <img src={Edit} className="w20" alt="Edit" onClick={() => handleEdit(item)} />
                                            </div>
                                            <div>
                                                <img src={Delete} className="w20" alt="Delete" onClick={() => showDeleteConfirmation(item)}/>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Popup
                visible={isPopupVisible}
                onHiding={() => setPopupVisible(false)} // Close popup on hiding
                dragEnabled={true}
                closeOnOutsideClick={true}
                showTitle={true}
                title="Confirm Delete"
                width={500}  // Increased width
                height={200}
            >
                <div style={{ textAlign: "center", padding: "20px" }}>
                    <p>Are you sure you want to delete this data source?</p>
                    <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                        <button onClick={handleDelete} className="btn btn-primary">
                            Yes
                        </button>
                        <button onClick={() => setPopupVisible(false)} className="btn btn-secondary">
                            No
                        </button>
                    </div>
                </div>
            </Popup>
            </div>
    );
};

export default DataSourceList;
