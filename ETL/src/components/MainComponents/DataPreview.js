import React, { useState, useEffect } from 'react';
import "../../styles/custom_field.css";
import 'devextreme/dist/css/dx.light.css';
import { DataGrid, Column, FilterRow, HeaderFilter, Pager, Paging } from 'devextreme-react/data-grid.js';
import { Accordion, Item as AccordionItem } from 'devextreme-react/accordion.js';
import SubPanel from '../Common/SubPanel';
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/actions/actions";
import babel from '@rollup/plugin-babel';


const DataPreview = () => {
    const [isToggled, setIsToggled] = useState(false);
    const dispatch = useDispatch();
    const data = useSelector((state) => state.dataPreview.fetchAppRepository.data);
    const loading = useSelector((state) => state.dataPreview.fetchAppRepository.loading);
    const error = useSelector((state) => state.dataPreview.fetchAppRepository.error);

    useEffect(() => {
        dispatch(actions.FETCH_APP_PREVIEW());
    }, [dispatch]);



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
                        <div style={{ maxWidth: '84%' }}>
                            <div className="col-sm-12 padd-none">
                                <div className="tablebox">
                                    <div className="boxpanel submenulist" style={{ height: "100%" }}>
                                        <Accordion collapsible={true}>
                                            {data.map((dataset, index) => (
                                                <AccordionItem title={dataset.TableName} key={index}>
                                                    <DataGrid
                                                        dataSource={dataset.ParsedResult || []}
                                                        showBorders={true}
                                                        columnAutoWidth={true}
                                                        allowColumnResizing={true}
                                                        allowColumnReordering={true}
                                                        rowAlternationEnabled={true}
                                                    >
                                                        <FilterRow visible={true} />
                                                        <HeaderFilter visible={true} />
    
                                                        {dataset.ParsedResult &&
                                                            dataset.ParsedResult.length > 0 &&
                                                            Object.keys(dataset.ParsedResult[0]).map((key) => (
                                                                <Column key={key} dataField={key} caption={key} />
                                                            ))}
    
                                                        <Pager
                                                            allowedPageSizes={[5, 10, 20]}
                                                            showPageSizeSelector={true}
                                                            showNavigationButtons={true}
                                                        />
                                                        <Paging defaultPageSize={10} />
                                                    </DataGrid>
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
};

export default DataPreview;
