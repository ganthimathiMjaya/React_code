import React, { useState, useEffect, useRef } from 'react';
import { Popup } from "devextreme-react";
import { DataGrid, Column, Paging, Pager, Toolbar, Item, Export } from "devextreme-react/data-grid";
import 'devextreme/dist/css/dx.light.css';


const PopupOpen = ({ visible, dataSource = [] }) => {
    // Local state to manage popup visibility
    const [isFieldsPopupVisible, setIsFieldsPopupVisible] = useState(visible);

    // Sync the popup visibility when prop `visible` changes
    useEffect(() => {
        setIsFieldsPopupVisible(visible);
    }, [visible]);

    // Function to close the popup
    const toggleClosePopup = () => {
        setIsFieldsPopupVisible(false); // Close popup
    };

    return (
        <Popup
            visible={isFieldsPopupVisible} 
            onHiding={toggleClosePopup}    
            showTitle={true}
            title="Claim Details"  
            dragEnabled={true}
            height="60%" 
            width="70%"   
            position={{
                of: window,         
                at: 'center',       
                my: 'center',        
                offset: '0 0',      
            }}
        >
           
            {dataSource.length > 0 ? (
                <DataGrid
                    dataSource={dataSource}
                    showBorders={true}
                    columnAutoWidth={true}
                    allowColumnReordering={true}
                    rowAlternationEnabled={true}
                    height={270}
                >
                    <Column
                        caption="S. No"
                        width={70}
                        alignment="center"
                        cellRender={(data) => {
                            const pageIndex = data.component.pageIndex();
                            const pageSize = data.component.pageSize();
                            return pageIndex * pageSize + (data.rowIndex + 1);
                        }}
                    />
                   
                    {Object.keys(dataSource[0] || {}).map((key) => (
                        <Column key={key} dataField={key} caption={key} />
                    ))}
                    <Paging enabled={true} pageSize={10} />
                    <Pager
                        showPageSizeSelector={true}
                        allowedPageSizes={[5, 10, 20]}
                        showInfo={true}
                    />
                </DataGrid>
            ) : (
                <div style={{ textAlign: "center", padding: "20px" }}>No data available</div>
            )}
        </Popup>
    );
};

export default PopupOpen;