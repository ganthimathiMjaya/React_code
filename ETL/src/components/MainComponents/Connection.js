import "../../styles/custom_field.css";
import Excel from '../../assets/Excel.png';
import SubPanel from '../Common/SubPanel';
import 'devextreme/dist/css/dx.light.css';
import React, { useState, useEffect } from 'react';

const Connection = () => {
  const [flags, setFlags] = useState({});
  const [checked, setChecked] = useState(false);
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [dataSources, setDataSources] = useState([]);

  const handleChange = () => {
    setChecked(!checked);
  };

  const handleFlagChange = (field, value) => {
    setFlags((prevFlags) => ({
      ...prevFlags,
      [field]: value,
    }));
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://10.20.0.187:84/ETL2/api/ETLApi/GetProcessConnectionDSInfo?processId=20&null"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setDataSources(result);

        const initialFormData = result.reduce((acc, dataSource) => {
          acc[dataSource.DsId] = {
            directoryPath: "",
            fileName: dataSource.FileName || "Unknown",
          };
          return acc;
        }, {});
        setFormData(initialFormData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (dsId, field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [dsId]: {
        ...prevFormData[dsId],
        [field]: value,
      },
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    Object.entries(formData).forEach(([dsId, { directoryPath, fileName }]) => {
      if (!directoryPath) {
        newErrors[dsId] = {
          ...newErrors[dsId],
          directoryPath: "Directory path is required.",
        };
      }
      if (!fileName) {
        newErrors[dsId] = {
          ...newErrors[dsId],
          fileName: "File name is required.",
        };
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }
    const payload = Object.entries(formData).map(([dsId, { directoryPath, fileName }]) => ({
      DsId: parseInt(dsId),
      ConnectionType: "file",
      ConnectionConfig: directoryPath || "DefaultPath",
      FileName: fileName || "Unknown",
    }));

    try {
      const response = await fetch(
        "http://10.20.0.187:84/ETL2/api/ETLApi/SubmitDataSourceConnections?processId=20&createdBy=3",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save data.");
      }

      const result = await response.json();
      alert("Data saved successfully!");
    } catch (error) {
      alert("An error occurred while saving data.");
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="sectionpanel">
          <ul className="breadcrumb customization_breadrumbs">
            <li>
              <a href="#">Admin</a>
            </li>
            <li>
              <a href="#">Inventory Setup</a>
            </li>
          </ul>
          <div className="boxpanel submenulist">
            <SubPanel />
            <div className="content_section">
              <div className="datalevel">
                <h3 className="fieldmapping_title">Connection</h3>
              </div>
              <div className="contentbox">
                <div className="content">
                  <div className="info_modeinput">
                    <label>Mode of Input</label>
                    <select className="form-control">
                      <option>File Server</option>
                      <option>File Server</option>
                      <option>File Server</option>
                      <option>File Server</option>
                    </select>
                  </div>
                  <div className="exceltable">
                    <table className="table">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Directory Path</th>
                          <th>File Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataSources.map((dataSource) => (
                          <tr key={dataSource.DsId}>
                            <td>
                              <div className="excelpanel">
                                <div>
                                  <img src={Excel} alt="Excel icon" />
                                </div>
                                <div className="claimpanel">
                                  <h5>{dataSource.DataSoruceName}</h5>
                                  <span>{dataSource.DsType}</span>
                                </div>
                              </div>
                            </td>
                            <td className="middlealign">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="/Enter/Path/Here"
                                value={formData[dataSource.DsId]?.directoryPath || ""}
                                onChange={(e) =>
                                  handleInputChange(dataSource.DsId, "directoryPath", e.target.value)
                                }
                              />
                            </td>
                            <td className="middlealign">
                              <div className="bordebox">
                                {formData[dataSource.DsId]?.fileName || "Unknown"}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
        </div>
      </div>
    </div>
  );
};

export default Connection;
