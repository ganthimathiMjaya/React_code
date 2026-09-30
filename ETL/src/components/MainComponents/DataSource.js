import React, { useState, useEffect } from 'react';
import "../../styles/custom_field.css";
import "../../styles/source.css";
import { Popup } from 'devextreme-react/popup.js';
import wplus from '../../assets/wplus.png';
import close from '../../assets/delete.png';
import 'devextreme/dist/css/dx.light.css';
import plusadd_white from '../../assets/plusadd_white.png';
import { ContextMenu } from "devextreme-react/context-menu.js";
import { DataGrid, Column, FilterRow, HeaderFilter, Pager, Paging } from 'devextreme-react/data-grid.js';
import SubPanel from '../Common/SubPanel';
import DataSourceList from '../MainComponents/DataSourceList';
import { Button } from 'devextreme-react/button.js';
import { FilterBuilder } from 'devextreme-react/filter-builder.js';
import { SelectBox } from 'devextreme-react/select-box.js';
import '../../styles/addsource.css';
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/actions/actions";
import axios from 'axios';


const DataSource = () => {
    const [isFilterPopupVisible, setFilterPopupVisible] = useState(false);
    const [filterValue, setFilterValue] = useState(null);
    const [dsUniqueId, setDsUniqueId] = useState(null);
    const [selectedFormulas, setSelectedFormulas] = useState([]);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [isCustomColumnPopupVisible, setCustomColumnPopupVisible] = useState(false);
    const [isCalculatedFieldsOpen, setCalculatedFieldsOpen] = useState(false);
    const [columnsData, setColumnsData] = useState([]);
    const [actionData, setActionData] = useState([]);
    const [rowsData, setRowsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [activeButton, setActiveButton] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedSourceName, setSelectedSourceName] = useState("");
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");
    const [options, setOptions] = useState([]);


    const handleClick = (button) => {
        setActiveButton(button);
    };

    const handleSelectAPIChange = async () => {
        try {
            const response = await axios.get(
                'http://10.20.0.187:84/ETL2/api/ETLApi/GetActiveDataSource?processId=20'
            );
            console.log("response", response)
            setOptions(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleEditSource = async (item) => {

        const response = await axios.get(
            `http://10.20.0.187:84/ETL2/api/ETLApi/GetDsColumnBasedData?dataSourceKey=${item.DsUniqueId}`
        );
        const rowResponse = await axios.get(
            `http://10.20.0.187:84/ETL2/api/ETLApi/GetDsDataListByUniqueId?dataSourceKey=${item.DsUniqueId}`
        );
        setRowsData(rowResponse?.data?.data);
        setColumnsData(response.data);

        setSelectedSourceName(item.DataSoruceName);
        setDsUniqueId(item.DsUniqueId);
        setIsEditMode(true)
        setPopupVisible(true);
        fetchData();

    };

    const formula = useSelector((state) => state.dataSource.fetchFormulaApi.data);
    const sourceName = useSelector((state) => state.dataSource.fetchSourceNameApi.data);

    const fields = [
        { dataField: 'TripId', caption: 'TripId', dataType: 'string' },
    ];
    const handleSelectChange = (event) => {
        const options = Array.from(event.target.options);
        const selected = options
            .filter((option) => option.selected)
            .map((option) => option.value);
        setSelectedFormulas(selected);
    };

    const closeFilterFieldsPopup = () => {
        setFilterPopupVisible(false);
    };

    const handleFileChange = async (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0]?.name || "");
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        formData.append("processId", 20);
        formData.append("dsUniqueId", "");
        formData.append("isDistinct", false);
        formData.append("dsConfigJson", '');
        formData.append("dsTypeId", 1);
        formData.append("fileName", e.target.files[0]?.name);
        formData.append("createdBy", 3);

        try {
            const response = await axios.post(
                "http://10.20.0.187:84/ETL2/ETL/UploadNewDataSourceCsv",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setDsUniqueId(response?.data?.dsUniqueId);
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Failed to upload the file.");
        }
    };

    useEffect(() => {
        dispatch(actions.FETCH_FORMULA_API());
        dispatch(actions.FETCH_SOURCE_NAME());
    }, [dispatch]);


    const openCalculatedFieldsPopup = () => {
        setCalculatedFieldsOpen(true);
    };

    const closeCalculatedFieldsPopup = () => {
        setCalculatedFieldsOpen(false);
    };

    const showCustomColumnPopup = () => {
        setCustomColumnPopupVisible(true);
    };

    const hideCustomColumnPopup = () => {
        setCustomColumnPopupVisible(false);
    };

    const showPopup = () => {
        setPopupVisible(true);
        setColumnsData([]);
        setRowsData([]);
    };

    const [selectedDataType, setSelectedDataType] = useState(null);
    const dataTypes = [
        'String',
        'Number',
        'Boolean',
        'Date'
    ];

    const handleDataTypeChange = (value) => {
        setSelectedDataType(value);
    };
    const menuItems = [
        { text: "Filter", action: "filter" },
        { text: "Delete", action: "delete" },
        {
            text: "Datatype",
            items: [
                { text: "String", action: "datatype-string" },
                { text: "Integer", action: "datatype-integer" },
                { text: "Decimal", action: "datatype-decimal" },
                { text: "Date", action: "datatype-date" },
            ],
        },
        { text: "Edit", action: "edit" },
    ];

    const handleButtonClick = () => {
        fetchData();
    };

    const ActionList = async () => {
        const fetchActionData = await axios.get(
            `http://10.20.0.187:84/ETL2/api/ETLApi/GetStepActionList?processId=20&dsUniqueId=${dsUniqueId}&null`
        );
        setActionData(fetchActionData?.data);
    }

    const removeCard = async (stepUniqueId) => {
        const fetchActionData = await axios.get(
            `http://10.20.0.187:84/ETL2/api/ETLApi/ReoveActionInvoke?dsUniqueId=${dsUniqueId}&stepUniqueId=${stepUniqueId}&null`
        );
        ActionList();
        fetchData();
        setActionData(actionData.filter((item) => item.StepUniqueId !== stepUniqueId));
    };

    const handleDistinct = async () => {
        let payload = {
            StepCategoryId: 5,
            ProcessJson: JSON.stringify({
                IsDistinct: true,
            }),
            DataSourceKey: dsUniqueId,
            Description: "Distinct applied",
        };

        const response = await axios.post(
            "http://10.20.0.187:84/ETL2/api/ETLApi/InvokeStepAction?createdBy=3&processId=20",
            payload);
        ActionList();
        fetchData();
    }

    const handleSave = async () => {
        const apiUrl = `http://10.20.0.187:84/ETL2/api/ETLApi/SubmitDataSource`;
        const params = {
            dsUniqueId: dsUniqueId,
            createdBy: 3,
            isValidated: true,
            dsCustomName: sourceName
        };

        try {
            const response = await axios.post(apiUrl, null, { params });
            setToastMessage("Data source saved successfully!");
            setToastType("success");
            setToastVisible(true);

            dispatch(actions.FETCH_APP_SOURCE());
            setPopupVisible(false);
            console.log("Successdsd:", response.data);

        } catch (error) {
            console.error("Error during API call:", error);
        }
    };

    const handleCancel = () => {
        setPopupVisible(false);
    }

    const onContextMenuPreparing = (e) => {
        if (e.target === "header") {
            e.items = [
                {
                    text: "Filter",
                    onItemClick: () => {
                        alert(`Filter action on column: ${e.column.caption}`);
                    },
                },
                {
                    text: "Delete",
                    onItemClick: async () => {
                        let payload;
                        if (e.column.caption) {
                            const matchingColumn = columnsData.find(
                                (column) => column.ColumnName === e.column.caption
                            );

                            if (matchingColumn) {
                                payload = {
                                    StepCategoryId: 1,
                                    ProcessJson: JSON.stringify({
                                        ColumnRowNo: matchingColumn.RowNo,
                                        IsDelete: true,
                                    }),
                                    DataSourceKey: dsUniqueId,
                                    Description: e.column.caption + " " + "column removed",
                                };

                            }

                        }

                        const response = await axios.post(
                            "http://10.20.0.187:84/ETL2/api/ETLApi/InvokeStepAction?createdBy=3&processId=20",
                            payload);
                        ActionList();
                        fetchData();
                        setColumnsData(columnsData.filter((col) => col.dataField !== e.column.dataField));
                    },
                },
                {
                    text: "Datatype",
                    items: [
                        {
                            text: "String",
                            onItemClick: () => {
                                alert(`Datatype for ${e.column.caption} changed to String`);
                            },
                        },
                        {
                            text: "Integer",
                            onItemClick: () => {
                                alert(`Datatype for ${e.column.caption} changed to Integer`);
                            },
                        },
                        {
                            text: "Decimal",
                            onItemClick: () => {
                                alert(`Datatype for ${e.column.caption} changed to Decimal`);
                            },
                        },
                        {
                            text: "Date",
                            onItemClick: () => {
                                alert(`Datatype for ${e.column.caption} changed to Date`);
                            },
                        },
                    ],
                },
                {
                    text: "Edit",
                    onItemClick: () => {
                        alert(`Edit action on column: ${e.column.caption}`);
                    },
                },
            ];
        }
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `http://10.20.0.187:84/ETL2/api/ETLApi/GetDsColumnBasedData?dataSourceKey=${dsUniqueId}`
            );
            const rowResponse = await axios.get(
                `http://10.20.0.187:84/ETL2/api/ETLApi/GetDsDataListByUniqueId?dataSourceKey=${dsUniqueId}`
            );
            setRowsData(rowResponse?.data?.data);
            setColumnsData(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [dsUniqueId, isEditMode]);


    return (

        <div>

            <div className="container-fluid">
                <div className="sectionpanel">
                    <ul className="breadcrumb customization_breadrumbs">
                        <li><a href="#">Admin</a></li>
                        <li><a href="#">Inventory Setup</a></li>
                    </ul>

                    <div className="boxpanel submenulist">

                        <SubPanel />


                        <div className="content_section dataSourceColumn">
                            {!isPopupVisible &&
                                <div className="datalevel">
                                    <button onClick={showPopup} className="bt_datasource"> <img src={wplus} alt=""></img>Add Data Source </button>
                                </div>

                            }
                            <div className="contentbox">
                                {isPopupVisible ? <div style={{ width: '98%' }}>
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <div className="datasource_panel">
                                                <h4 className="modal-title">Data Source Name</h4>
                                                {/* <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter source name"
                                                    value={sourceName || selectedSourceName} // Controlled input
                                                /> */}
                                                <input type="text" className="form-control" placeholder="Enter source name" />
                                                <button
                                                    className={`btn btscv ${activeButton === 'csv' ? 'active' : ''}`}
                                                    onClick={() => handleClick('csv')}
                                                >
                                                    CSV
                                                </button>
                                                <button
                                                    className={`btn btExcel ${activeButton === 'excel' ? 'active' : ''}`}
                                                    onClick={() => handleClick('excel')}
                                                >
                                                    Excel
                                                </button>
                                                <button
                                                    className={`btn btInternal ${activeButton === 'internal' ? 'active' : ''}`}
                                                    onClick={() => handleClick('internal')}
                                                >
                                                    Internal
                                                </button>
                                                {activeButton === 'internal' && (
                                                    <></>
                                                    // <DropDownBox
                                                    //     value={selectedKeys.map((key) =>
                                                    //         options.find((item) => item.DsId === key)?.DataSoruceName
                                                    //     )}
                                                    //     valueExpr="DsId"
                                                    //     displayExpr="DataSoruceName"
                                                    //     dataSource={options}
                                                    //     contentRender={dropdownContent}
                                                    //     placeholder="Select Data Sources..."
                                                    // />
                                                )}
                                                {activeButton === 'internal' && (
                                                    <button
                                                        onClick={handleButtonClick}
                                                        style={{
                                                            backgroundColor: activeButton === 'excel' ? '#003366' : '#0055AA',
                                                            color: 'white',
                                                            padding: '10px 15px',
                                                            border: 'none',
                                                            borderRadius: '5px',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        <img src={plusadd_white} className="w20" alt="plus_add"></img>

                                                    </button>
                                                )}
                                                {activeButton === 'csv' && (
                                                    <input type="file" className="form-control" onChange={handleFileChange} />)}
                                            </div>
                                        </div>
                                        <div className="modal-body clearfix" style={{ display: "flex", gap: '10px' }}>
                                            <div className="col-sm-10 padd-none customleftside">

                                                <div className="tablebox">

                                                    <div className="data-grid-container">
                                                        <DataGrid
                                                            dataSource={rowsData}
                                                            height={400}
                                                            showBorders={true}
                                                            columnAutoWidth={true}
                                                            allowColumnResizing={true}
                                                            allowColumnReordering={true}
                                                            rowAlternationEnabled={true}
                                                            onRowClick={(e) => setSelectedRowData(e.data)}
                                                            onContextMenuPreparing={onContextMenuPreparing}
                                                        >
                                                            <FilterRow visible={true} />
                                                            <HeaderFilter visible={true} />

                                                            {columnsData.map((col) => (
                                                                <Column
                                                                    key={col.RowNo}
                                                                    dataField={col.ColumnName}
                                                                    caption={col.ColumnName}
                                                                    visible={col.Required}
                                                                />
                                                            ))}

                                                            <Pager
                                                                allowedPageSizes={[5, 10, 20]}
                                                                showPageSizeSelector={true}
                                                                showNavigationButtons={true}
                                                            />
                                                            <Paging defaultPageSize={10} />
                                                        </DataGrid>
                                                        <ContextMenu
                                                            dataSource={menuItems}
                                                            target=".dx-header-row .dx-cell"
                                                            showEvent="dxcontextmenu"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-2 customrightside">
                                                <div className="custombox">
                                                    <button className="btn_column" > <img src={plusadd_white} onClick={showCustomColumnPopup} className="w20" alt="plus_add"></img> </button>
                                                    <button className="btn_column" ><img src={plusadd_white} onClick={openCalculatedFieldsPopup} className="w20" alt="plus_add"></img> </button>
                                                    <button className="btn_column" onClick={() => handleDistinct()} >Distinct</button>
                                                </div>

                                                <div className="card-container container-list">
                                                    {actionData.length > 0 ? (
                                                        actionData.map((item, index) => (
                                                            <div className="cardpanel" key={index}>
                                                                <img
                                                                    src={close}
                                                                    className="closeicon"
                                                                    alt="close"
                                                                    onClick={() => removeCard(item.StepUniqueId)}
                                                                />
                                                                <label style={{ fontWeight: "bold" }}>{item.StepCategory}</label>
                                                                <span className="testpanel">{item.Description}</span>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="no-data">
                                                            <p>No data available</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer footersection">
                                            <button type="button" className="btn btn-default btncancel" onClick={() => handleCancel()}>Cancel</button>
                                            <button type="button" className="btn btn-primary btnsave" onClick={() => handleSave()}>Save</button>
                                        </div>
                                    </div>
                                </div> : <DataSourceList onEditSource={handleEditSource} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Popup
                visible={isCustomColumnPopupVisible}
                onHiding={hideCustomColumnPopup}
                dragEnabled={true}
                closeOnOutsideClick={true}
                showTitle={true}
                title="Custom Column"
                width="50%"
                height="auto"
            >
                <div>

                    <div className="modal-body">

                        <div>
                            <label>New Column Name </label>
                            <input type="text" className="form-control" />
                        </div>

                        <div style={{ marginTop: '16px' }}>
                            <SelectBox
                                items={dataTypes}
                                value={selectedDataType}
                                onValueChanged={(e) => handleDataTypeChange(e.value)}
                                placeholder="Select Datatype"
                                className="form-control"
                            />
                        </div>
                        <div className="flexable_box">

                            <div className="flexable_box">
                                <div className="column_box">
                                    <label>Column Formula</label>
                                    <div className="primarybox">
                                        <select
                                            className="formulaDropdown"
                                            multiple
                                            onChange={handleSelectChange}
                                            style={{ height: "130px" }} // Adjust height for better usability
                                        >
                                            {formula && formula.map((formula) => (
                                                <option key={formula.FromulaId} value={formula.FromulaId}>
                                                    {formula.Formula}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="condtion_check">
                            <div className="checkbox footer-label">
                                <label>
                                    <input type="checkbox" checked value="" /> No Syntax error has been declared
                                </label>
                            </div>
                            <div className="footer-buttons">
                                <button type="button" className="btn btn-default btncancel" data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-default btnsave" data-dismiss="modal">Add Column</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Popup>
            <Popup
                visible={isCalculatedFieldsOpen}
                onHiding={closeCalculatedFieldsPopup}
                dragEnabled={false}
                closeOnOutsideClick={true}
                showTitle={true}
                title="Calculated Field"
                width={600}
                height="auto"
            >
                <div className="modal-body">
                    <div>
                        <label>Field Name</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div style={{ marginTop: '16px' }}>
                        <SelectBox
                            items={dataTypes}
                            value={selectedDataType}
                            onValueChanged={(e) => handleDataTypeChange(e.value)}
                            placeholder="Select Datatype"
                            className="form-control"
                        />
                    </div>
                    <div className="flexable_box">
                        <div className="column_box">
                            <label>Column Formula</label>
                            <div className="primarybox">
                                <p>Primary*</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <div className="condtion_check">
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" checked value="" /> No Syntax error has been declared
                            </label>
                        </div>
                        <div className="footer-buttons">
                            <button type="button" className="btn btn-default btncancel" onClick={closeCalculatedFieldsPopup}>Cancel</button>
                            <button type="button" className="btn btn-default btnsave" onClick={closeCalculatedFieldsPopup}>Add Column</button>
                        </div>
                    </div>
                </div>
            </Popup>
            <Popup
                visible={isFilterPopupVisible}
                onHiding={closeFilterFieldsPopup}
                dragEnabled={false}
                closeOnOutsideClick={true}
                showTitle={true}
                title="Data filter expression"
                width={400}
                height={300}
            >
                <div className="filter-builder-container">
                    <FilterBuilder
                        fields={fields}
                        value={filterValue}
                        onValueChanged={(e) => setFilterValue(e.value)}
                    />
                    <Button
                        text="Update"
                        onClick={closeFilterFieldsPopup}
                        type="default"
                        stylingMode="contained"
                        style={{ marginTop: '10px' }}
                    />
                </div>
            </Popup>
            </div>
    );
};

export default DataSource;
