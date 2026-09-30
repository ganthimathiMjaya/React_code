import React, { useState } from 'react';
import "../../styles/custom_field.css";
import tick from '../../assets/tick.png';
import SubPanel from '../Common/SubPanel';
import 'devextreme/dist/css/dx.light.css';

const FieldMapping = () => {
    const [flags, setFlags] = useState({});
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked(!checked);
    };
    const [modalOpen, setModalOpen] = useState(false);

    const handleFlagChange = (field, value) => {
        setFlags(prevFlags => ({
            ...prevFlags,
            [field]: value,
        }));
    };

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    return (

        <div>

            <div className="container-fluid">

                <div className="sectionpanel">

                    <ul className="breadcrumb customization_breadrumbs">
                        <li><a href="#">Admin</a></li>
                        <li><a href="#">Inventory Setup</a></li>
                    </ul>

                    <div className="boxpanel submenulist">

                    <SubPanel/>

                        <div className="content_section">
                            <div className="datalevel">
                                <h3 className="fieldmapping_title">Field Mapping </h3>

                            </div>


                            <div className="contentbox">


                                <div className="content">

                                    <div className="acc accordated">
                                        <div className="acc__card">
                                            <div className="acc__title active"> Encounter </div>
                                            <div className="acc__panel" style={{ display: "block" }}>

                                                <div className="">

                                                    <table className="table encounter_tables">
                                                        <thead>
                                                            <tr>
                                                                <th>Fields</th>
                                                                <th>Mandatory</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>EncounterNumber </td>
                                                                <td> <img src={tick} className="tick_image" alt=""></img> </td>
                                                                <td>
                                                                    <select className="fieldmappingSelect">
                                                                        <option> Data Source 1 table 3 </option>
                                                                    </select>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>PayerName </td>
                                                                <td> <img src={tick} className="tick_image" alt=""></img> </td>
                                                                <td>
                                                                    <select className="fieldmappingSelect">
                                                                        <option> Data Source 1 table 3 </option>
                                                                    </select>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>PersonNumber </td>
                                                                <td> <img src={tick} className="tick_image" alt=""></img> </td>
                                                                <td>
                                                                    <select className="fieldmappingSelect">
                                                                        <option> Data Source 1 table 3 </option>
                                                                    </select>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Admitdate </td>
                                                                <td> <img src={tick} className="tick_image" alt=""></img> </td>
                                                                <td>
                                                                    <select className="fieldmappingSelect">
                                                                        <option> Data Source 1 table 3 </option>
                                                                    </select>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Dischargedate </td>
                                                                <td> <img src={tick} className="tick_image" alt=""></img> </td>
                                                                <td>
                                                                    <select className="fieldmappingSelect">
                                                                        <option> Data Source 1 table 3 </option>
                                                                    </select>
                                                                </td>
                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </div>


                                            </div>
                                        </div>
                                        {/* <div className="acc__card">
                                            <div className="acc__title active">Accordion Title #2</div>
                                            <div className="acc__panel" style={{ display: "block" }}>


                                                <div className="">

                                                    <table className="table encounter_tables">
                                                        <thead>
                                                            <tr>
                                                                <th>Fields</th>
                                                                <th>Mandatory</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>EncounterNumber </td>
                                                                <td> <img src={tick} className="tick_image" alt="" /> </td>
                                                                <td>
                                                                    <select className="fieldmappingSelect">
                                                                        <option> Data Source 1 table 3 </option>
                                                                    </select>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>PayerName </td>
                                                                <td> <img src={tick} className="tick_image" alt="" /> </td>
                                                                <td>
                                                                    <select className="fieldmappingSelect">
                                                                        <option> Data Source 1 table 3 </option>
                                                                    </select>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>PersonNumber </td>
                                                                <td> <img src={tick} className="tick_image" alt="" /> </td>
                                                                <td>
                                                                    <select className="fieldmappingSelect">
                                                                        <option> Data Source 1 table 3 </option>
                                                                    </select>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Admitdate </td>
                                                                <td> <img src={tick} className="tick_image" alt="" /> </td>
                                                                <td>
                                                                    <select className="fieldmappingSelect">
                                                                        <option> Data Source 1 table 3 </option>
                                                                    </select>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Dischargedate </td>
                                                                <td> <img src={tick} className="tick_image" alt="" /> </td>
                                                                <td>
                                                                    <select className="fieldmappingSelect">
                                                                        <option> Data Source 1 table 3 </option>
                                                                    </select>
                                                                </td>
                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>
                                        </div> */}


                                    </div>
                                    <div className="footerlevel">
                                        <div className="footerbutton">
                                            <button type="button" className="btn btn-default btncancel" data-dismiss="modal">Cancel</button>
                                            <button type="button" className="btn btn-default btnsave" data-dismiss="modal">Next</button>
                                        </div>
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

export default FieldMapping;
