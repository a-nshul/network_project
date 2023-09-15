import React, { useState, useEffect } from "react";
import { contentConstant } from "../../Constant/content";
import WirlessModal from "../../Modals/WirlessModal";
import Loader from "react-loader-spinner";
import { ThreeDots } from "react-loader-spinner";
import Switch from "react-switch";
import { Modal, Button } from "antd";

function Table(props) {
  const { dataList, type, isCheckbox } = props;
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rowStatus, setRowStatus] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [ssid, setSSID] = useState("");
  const [security, setSecurity] = useState("");
  const [confirmModalVisible, setConfirmModalVisible] = useState(false); // State to control the confirmation modal
  const [isEnableAction, setIsEnableAction] = useState(false); // State to track enable/disable action



  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleUpdateClick = (row) => {
    setSelectedRow(row);
    setShowModal(true);
    setIsEditMode(true);
    setSSID(row.SSID);
    setSecurity(row.Security);
  };

  const handleDisableEnable = (row) => {
    setSelectedRow(row);
    setIsEnableAction(!rowStatus[row.name]);
    setConfirmModalVisible(true);
  };

  // const handleConfirmAction = () => {
  //   const updatedRowStatus = { ...rowStatus };
  //   updatedRowStatus[selectedRow.name] = isEnableAction;
  //   setRowStatus(updatedRowStatus);
  //   setConfirmModalVisible(false);
  // };
  const handleConfirmAction = (selectedRow) => {
    if (selectedRow === null) {
      return;
    }
  
    const updatedRowStatus = { ...rowStatus };
    updatedRowStatus[selectedRow.name] = isEnableAction;
    setRowStatus(updatedRowStatus);
    setConfirmModalVisible(false);
  };
  

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRow(null);
    setIsEditMode(false);
  };

  return (
    <div className="card mt-5 aasan-card">
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          {showModal ? null : (
            <div className="table-responsive aasan-table">
              <table className="table">
                <thead>
                  <tr>
                    {contentConstant[props.type].TABLE.map((item) => {
                      return <th key={item} scope="col">{item}</th>;
                    })}
                    <th>WiFi Status</th>
                  </tr>
                </thead>
                <tbody >
                  {isLoading ? (
                    <tr>
                      <td
                        colSpan={contentConstant[type].TABLE.length + (isCheckbox ? 1 : 0)}
                      >
                        <ThreeDots color="#1261A1" height={50} width={50} />
                      </td>
                    </tr>
                  ) : Array.isArray(dataList) && dataList.length > 0 ? (
                    dataList.map((row, index) => (
                      <tr
                        key={index}
                        style={{
                          backgroundColor: rowStatus[row.name] ? "#000" : "#ccc", 
                          color: rowStatus[row.name] ? "#fff" : "inherit", 
                        }}
                      >
                        <td style={{ backgroundColor: rowStatus[row.name] ? "#ccc" : "inherit", color: rowStatus[row.name] ? "#808080" : "inherit" }}>{row.SSID}</td>
                        <td style={{ backgroundColor: rowStatus[row.name] ? "#ccc" : "inherit", color: rowStatus[row.name] ? "#808080" : "inherit" }}>{row.Active_Clients}</td>
                        <td style={{ backgroundColor: rowStatus[row.name] ? "#ccc" : "inherit", color: rowStatus[row.name] ? "#808080" : "inherit" }}>{row.Security}</td>
                        <td style={{ backgroundColor: rowStatus[row.name] ? "#ccc" : "inherit", color: rowStatus[row.name] ? "#808080" : "inherit" }}>{row.Experience_dBm}</td>
                        <td style={{ backgroundColor: rowStatus[row.name] ? "#ccc" : "inherit", color: rowStatus[row.name] ? "#808080" : "inherit" }}>{row.Channel}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleUpdateClick(row)}
                            style={{ backgroundColor: rowStatus[row.name] ? "#ccc" : "#1261A1", color: rowStatus[row.name] ? "#000" : "#FFFFFF" }}
                            disabled={rowStatus[row.name]}
                          >
                            Update
                          </button>
                        </td>
                        <td>
                          <Switch
                            onChange={() => handleDisableEnable(row)}
                            checked={!rowStatus[row.name] || false}
                            onColor="#1261A1"
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={contentConstant[type].TABLE.length + (isCheckbox ? 1 : 0)}
                      >
                        No data available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <WirlessModal
          show={showModal}
          onHide={handleCloseModal}
          selectedRow={selectedRow}
          isEditMode={isEditMode}
          ssid={ssid}
          security={security}
        />
      )}

      {/* Confirmation Modal */}
      {/* <Modal
        visible={confirmModalVisible}
        onOk={handleConfirmAction}
        onCancel={() => setConfirmModalVisible(false)}
        okText="Yes"
        cancelText="No"
        okButtonProps={{ style: { backgroundColor: "#1261A1", color: "#FFFFFF" } }}
        // centered
      >
        Are you sure you want to {isEnableAction ? "disable" : "enable"} this device?
      </Modal> */}
      <Modal
        visible={confirmModalVisible}
        onOk={() => handleConfirmAction(selectedRow)}
        onCancel={() => setConfirmModalVisible(false)}
        okText="Yes"
        cancelText="No"
        okButtonProps={{ style: { backgroundColor: "#1261A1", color: "#FFFFFF" } }}
        // centered
      >
        Are you sure you want to {isEnableAction ? "disable" : "enable"} this device?
      </Modal>
    </div>
  </div>
  );
}

export default Table;
// import React, { useState, useEffect } from "react";
// import { contentConstant } from "../../Constant/content";
// import WirlessModal from "../../Modals/WirlessModal";
// import Loader from "react-loader-spinner";
// import { ThreeDots } from "react-loader-spinner";
// import Switch from "react-switch";
// import { Modal, Button } from "antd";

// function Table(props) {
//   const { dataList, type, isCheckbox } = props;
//   const [showModal, setShowModal] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [ssid, setSSID] = useState("");
//   const [security, setSecurity] = useState("");
//   const [confirmModalVisible, setConfirmModalVisible] = useState(false);
//   const [isEnableAction, setIsEnableAction] = useState(false);
//   const [selectedRowEnabled, setSelectedRowEnabled] = useState(false);

//   useEffect(() => {
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);
//   }, []);

//   const handleUpdateClick = (row) => {
//     setSelectedRow(row);
//     setShowModal(true);
//     setIsEditMode(true);
//     setSSID(row.SSID);
//     setSecurity(row.Security);
//   };

//   const handleDisableEnable = (row) => {
//     setSelectedRow(row);
//     setSelectedRowEnabled(row.enabled); // Store the current enabled status
//     setIsEnableAction(!row.enabled); // Toggle enable/disable action
//     setConfirmModalVisible(true);
//   };

//   const handleConfirmAction = () => {
//     // Perform the enable/disable action here based on the value of isEnableAction
//     // Once the action is completed, close the confirmation modal and update row status
//     const updatedDataList = dataList.map((item) => {
//       if (item.name === selectedRow.name) {
//         return { ...item, enabled: isEnableAction };
//       }
//       return item;
//     });
//     props.setDataList(updatedDataList);
//     setConfirmModalVisible(false);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setSelectedRow(null);
//     setIsEditMode(false);
//   };

//   return (
//     <div className="card mt-5 aasan-card">
//       <div className="container">
//         <div className="row">
//           <div className="col-sm-12">
//             {showModal ? null : (
//               <div className="table-responsive aasan-table">
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       {contentConstant[props.type].TABLE.map((item) => {
//                         return <th key={item} scope="col">{item}</th>;
//                       })}
//                       <th>WiFi Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {isLoading ? (
//                       <tr>
//                         <td
//                           colSpan={contentConstant[type].TABLE.length + (isCheckbox ? 1 : 0)}
//                         >
//                           <ThreeDots color="#1261A1" height={50} width={50} />
//                         </td>
//                       </tr>
//                     ) : Array.isArray(dataList) && dataList.length > 0 ? (
//                       dataList.map((row, index) => (
//                         <tr
//                           key={index}
//                           style={{
//                             backgroundColor: row.enabled ? "#000" : "#ccc", 
//                             color: row.enabled ? "#fff" : "inherit", 
//                           }}
//                         >
//                           <td style={{ backgroundColor: row.enabled ? "#ccc" : "inherit", color: row.enabled ? "#808080" : "inherit" }}>{row.SSID}</td>
//                           <td style={{ backgroundColor: row.enabled ? "#ccc" : "inherit", color: row.enabled ? "#808080" : "inherit" }}>{row.Active_Clients}</td>
//                           <td style={{ backgroundColor: row.enabled ? "#ccc" : "inherit", color: row.enabled ? "#808080" : "inherit" }}>{row.Security}</td>
//                           <td style={{ backgroundColor: row.enabled ? "#ccc" : "inherit", color: row.enabled ? "#808080" : "inherit" }}>{row.Experience_dBm}</td>
//                           <td style={{ backgroundColor: row.enabled ? "#ccc" : "inherit", color: row.enabled ? "#808080" : "inherit" }}>{row.Channel}</td>
//                           <td>
//                             <button
//                               className="btn btn-primary"
//                               onClick={() => handleUpdateClick(row)}
//                               style={{ backgroundColor: row.enabled ? "#ccc" : "#1261A1", color: row.enabled ? "#000" : "#FFFFFF" }}
//                               disabled={!row.enabled}
//                             >
//                               Update
//                             </button>
//                           </td>
//                           <td>
//                             <Switch
//                               onChange={() => handleDisableEnable(row)}
//                               checked={row.enabled}
//                               onColor="#1261A1"
//                             />
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td
//                           colSpan={contentConstant[type].TABLE.length + (isCheckbox ? 1 : 0)}
//                         >
//                           No data available.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         </div>
//         {showModal && (
//           <WirlessModal
//             show={showModal}
//             onHide={handleCloseModal}
//             selectedRow={selectedRow}
//             isEditMode={isEditMode}
//             ssid={ssid}
//             security={security}
//           />
//         )}

//         {/* Confirmation Modal */}
//         <Modal
//           visible={confirmModalVisible}
//           onOk={handleConfirmAction}
//           onCancel={() => setConfirmModalVisible(false)}
//           okText="Yes"
//           cancelText="No"
//           okButtonProps={{ style: { backgroundColor: "#1261A1", color: "#FFFFFF" } }}
//         >
//           Are you sure you want to {isEnableAction ? "disable" : "enable"} this device?
//         </Modal>
//       </div>
//     </div>
//   );
// }

// export default Table;





// import React, { useState, useEffect } from "react";
// import { contentConstant } from "../../Constant/content";
// import WirlessModal from "../../Modals/WirlessModal";
// import Loader from "react-loader-spinner";
// import { ThreeDots } from "react-loader-spinner";
// import Switch from "react-switch";
// import { Modal, Button } from "antd";
// import Axios from "axios"; // Import Axios for making API requests
// import { message } from "antd";

// function Table(props) {
//   const { dataList, type, isCheckbox } = props;
//   const [showModal, setShowModal] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [rowStatus, setRowStatus] = useState({});
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [ssid, setSSID] = useState("");
//   const [security, setSecurity] = useState("");
//   const [confirmModalVisible, setConfirmModalVisible] = useState(false);
//   const [isEnableAction, setIsEnableAction] = useState(false);

//   useEffect(() => {
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);
//   }, []);

//   const handleUpdateClick = (row) => {
//     setSelectedRow(row);
//     setShowModal(true);
//     setIsEditMode(true);
//     setSSID(row.SSID);
//     setSecurity(row.Security);
//   };

//   const handleDisableEnable = (row) => {
//     setSelectedRow(row);
//     setIsEnableAction(!rowStatus[row.name]);
//     setConfirmModalVisible(true);
//   };

//   const postApiRequest = async (row, isEnableAction) => {
//     try {
//       const apiUrl = "your_api_endpoint_here";
//       const payload = {
//       }

//       const response = await Axios.post(apiUrl, payload);
//       console.log("API response:", response.data);
//       const updatedRowStatus = { ...rowStatus };
//       updatedRowStatus[row.name] = isEnableAction;
//       setRowStatus(updatedRowStatus);
//       message.success("Device successfully enabled/disabled");
//       setConfirmModalVisible(false);
//     } catch (error) {
//       console.error("API error:", error);
//       message.error("Failed to enable/disable the device. Please try again.");
//     }
//   };
  
//   const handleConfirmAction = () => {
//     postApiRequest(selectedRow, isEnableAction);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setSelectedRow(null);
//     setIsEditMode(false);
//   };

//   return (
//     <div className="card mt-5 aasan-card">
//       <div className="container">
//         <div className="row">
//           <div className="col-sm-12">
//             {showModal ? null : (
//               <div className="table-responsive aasan-table">
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       {contentConstant[props.type].TABLE.map((item) => {
//                         return <th key={item} scope="col">{item}</th>;
//                       })}
//                       <th>WiFi Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {isLoading ? (
//                       <tr>
//                         <td
//                           colSpan={contentConstant[type].TABLE.length + (isCheckbox ? 1 : 0)}
//                         >
//                           <ThreeDots color="#1261A1" height={50} width={50} />
//                         </td>
//                       </tr>
//                     ) : Array.isArray(dataList) && dataList.length > 0 ? (
//                       dataList.map((row, index) => (
//                         <tr
//                           key={index}
//                           style={{
//                             backgroundColor: rowStatus[row.name] ? "#000" : "#ccc",
//                             color: rowStatus[row.name] ? "#fff" : "inherit",
//                           }}
//                         >
//                           <td style={{ backgroundColor: rowStatus[row.name] ? "#ccc" : "inherit", color: rowStatus[row.name] ? "#808080" : "inherit" }}>{row.SSID}</td>
//                           <td style={{ backgroundColor: rowStatus[row.name] ? "#ccc" : "inherit", color: rowStatus[row.name] ? "#808080" : "inherit" }}>{row.Active_Clients}</td>
//                           <td style={{ backgroundColor: rowStatus[row.name] ? "#ccc" : "inherit", color: rowStatus[row.name] ? "#808080" : "inherit" }}>{row.Security}</td>
//                           <td style={{ backgroundColor: rowStatus[row.name] ? "#ccc" : "inherit", color: rowStatus[row.name] ? "#808080" : "inherit" }}>{row.Experience_dBm}</td>
//                           <td style={{ backgroundColor: rowStatus[row.name] ? "#ccc" : "inherit", color: rowStatus[row.name] ? "#808080" : "inherit" }}>{row.Channel}</td>
//                           <td>
//                             <button
//                               className="btn btn-primary"
//                               onClick={() => handleUpdateClick(row)}
//                               style={{ backgroundColor: rowStatus[row.name] ? "#ccc" : "#1261A1", color: rowStatus[row.name] ? "#000" : "#FFFFFF" }}
//                               disabled={rowStatus[row.name]}
//                             >
//                               Update
//                             </button>
//                           </td>
//                           <td>
//                             <Switch
//                               onChange={() => handleDisableEnable(row)}
//                               checked={!rowStatus[row.name] || false}
//                               onColor="#1261A1"
//                             />
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td
//                           colSpan={contentConstant[type].TABLE.length + (isCheckbox ? 1 : 0)}
//                         >
//                           No data available.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         </div>
//         {showModal && (
//           <WirlessModal
//             show={showModal}
//             onHide={handleCloseModal}
//             selectedRow={selectedRow}
//             isEditMode={isEditMode}
//             ssid={ssid}
//             security={security}
//           />
//         )}

//         <Modal
//           visible={confirmModalVisible}
//           onOk={handleConfirmAction}
//           onCancel={() => setConfirmModalVisible(false)}
//           okText="Yes"
//           maskClosable={false}
//           centered
//           cancelText="No"
//           okButtonProps={{ style: { backgroundColor: "#1261A1", color: "#FFFFFF" } }}
//         >
//           Are you sure you want to {isEnableAction ? "disable" : "enable"} this device?
//         </Modal>
//       </div>
//     </div>
//   );
// }

// export default Table;


