import React, { useState } from "react";
import Header from "../../Component/Reusable/Header";
import Button from "../../Component/Reusable/Form/Button";
import { message, Modal } from "antd";
import { contentConstant } from "../../Component/Constant/content";

function Firmware() {
  const [rebootResponse, setRebootResponse] = useState(null);
  const [resetResponse, setResetResponse] = useState(null);
  const [pingResponse, setPingResponse] = useState(null);

  const [rebootVisible, setRebootVisible] = useState(false);
  const [resetVisible, setResetVisible] = useState(false);
  const [pingVisible, setPingVisible] = useState(false);
  const [encryptionType, setEncryptionType] = useState("open");
  const showRebootModal = () => {
    setRebootVisible(true);
  };

  const hideRebootModal = () => {
    setRebootVisible(false);
  };

  const showResetModal = () => {
    setResetVisible(true);
  };

  const hideResetModal = () => {
    setResetVisible(false);
  };

  // const showPingModal = () => {
  //   setPingVisible(true);
    
  // };

  const hidePingModal = () => {
    setPingVisible(false);
  };

  const rebootDevice = async () => {
    try {
      const response = await fetch("/api/reboot", {
        method: "POST",
        // Add any necessary headers and body data here
      });

      if (response.ok) {
        const data = await response.json();
        // Display a success message
        message.success("Device has been rebooted successfully");
        setRebootResponse(data);
      } else {
        // Handle non-successful responses, e.g., displaying an error message
        message.error("Failed to reboot device. Please try again.");
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error while rebooting:", error);
      message.error("An error occurred while rebooting the device.");
    }
  };

  const resetDevice = async () => {
    try {
      const messageText = "Resetting device..."; // Set your desired message here
      message.loading({ content: messageText, key: "resetting" });

      const response = await fetch("/api/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageText }),
      });
      const data = await response.json();

      // Close the loading message and show success message
      message.success({ content: "Device reset successfully", key: "resetting" });
      setResetResponse(data);
    } catch (error) {
      // Close the loading message and show error message
      message.error({ content: "Error while resetting", key: "resetting" });
      console.error("Error while resetting:", error);
    }
  };

  const pingDevice = async () => {
    try {
      const messageText = "Pinging device..."; // Set your desired message here
      message.loading({ content: messageText, key: "pinging" });

      const response = await fetch("/api/ping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageText }),
      });
      const data = await response.json();

      // Close the loading message and show success message
      message.success({ content: "Ping Success Rate 100%", key: "pinging" });
      setPingResponse(data);
    } catch (error) {
      // Close the loading message and show error message
      message.error({ content: "Failed to ping Internet from this Device", key: "pinging" });
      console.error("Error while pinging:", error);
    }
  };

  return (
    // <div className={"privateBody"}>
    //   <div className="row">
    //     <div className="col-sm-10">
    //       <Header type={"FIRMWARE"} />
    //     </div>
    //   </div>

    //   <div className="mt-5">
    //     <div className="card">
    //       <div className="card-body">
    //         <table className="table">
    //           <tbody>
    //             <tr>
    //               <th>Firmware Version</th>
    //               <th>Up Time</th>
    //             </tr>

    //             <tr>
    //               <td>1.1.1.1</td>
    //               <td>2 Days, 4 Hours, 36 Mins</td>
    //             </tr>
    //           </tbody>
    //         </table>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="mt-5">
    //     <div className="card">
    //       <div className="card-body">
    //       {/* <h1 style={{ fontFamily: "sans-serif" }}>Tools</h1> */}
    //       <h1 style={{ fontWeight: "bold", fontSize: "25px" }}>Tools</h1>

    //         <table className="table" >
    //           <tbody>
    //             <tr>
    //               <td >
    //                 <button className="btn btn-primary" 
    //                 onClick={showRebootModal} 
    //                 style={{ backgroundColor: "#1261A1", color: "#FFFFFF" }}>
    //                   Reboot
    //                 </button>
    //                 <Modal
    //                   title="Confirm Reboot"
    //                   visible={rebootVisible}
    //                   onOk={() => {
    //                     hideRebootModal();
    //                     rebootDevice();
    //                   }}
    //                   onCancel={hideRebootModal}
    //                   maskClosable={false}
    //                   centered
    //                   okButtonProps={{ style: { backgroundColor: "#1261A1", color: "#FFFFFF" } }}
    //                   // style={{
    //                   //   backgroundColor: "#1061a1", // Blue background color
    //                   //   color: "blue", // White text color
    //                   // }}
    //                 >
    //                   <p>Are you sure you want to reboot the device?</p>
    //                 </Modal>
    //               </td>
    //               <td>
    //                 <button className="btn btn-primary" 
    //                 onClick={showResetModal} 
    //                 style={{ backgroundColor: "#1261A1", color: "#FFFFFF" }}>
    //                   Reset
    //                 </button>
    //                 <Modal
    //                   title="Confirm Reset"
    //                   visible={resetVisible}
    //                   onOk={() => {
    //                     hideResetModal();
    //                     resetDevice();
    //                   }}
    //                   maskClosable={false}
    //                   onCancel={hideResetModal}
    //                   centered
    //                   okButtonProps={{ style: { backgroundColor: "#1261A1", color: "#FFFFFF" } }}
    //                 >
    //                   <p>Are you sure you want to reset this device to its factory settings?</p>
    //                 </Modal>
    //               </td>
    //               <td>
    //                 <button className="btn btn-primary" onClick={ pingDevice} style={{ backgroundColor: "#1261A1", color: "#FFFFFF" }}>
    //                   Ping
    //                 </button>
    //                 {/* <Modal
    //                   title="Confirm Ping"
    //                   visible={pingVisible}
    //                   onOk={() => {
    //                     hidePingModal();
    //                     pingDevice();
    //                   }}
    //                   onCancel={hidePingModal}
    //                   maskClosable={false}
    //                   centered
    //                   okButtonProps={{ style: { backgroundColor: "#1261A1", color: "#FFFFFF" } }}
    //                 >
    //                   <p>Are you sure you want to ping the device?</p>
    //                 </Modal> */}
    //               </td>
    //             </tr>
    //           </tbody>
    //         </table>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className={"privateBody"}>
      <div className="row">
        <div className="col-sm-10">
          <Header type={"FIRMWARE"} />
        </div>
      </div>

      <div className="mt-5">
        <div className="card">
          <div className="card-body">
            <table className="table">
              <tbody>
                <tr>
                  <th>Firmware Version</th>
                  <th>Up Time</th>
                </tr>

                <tr>
                  <td>1.1.1.1</td>
                  <td>2 Days, 4 Hours, 36 Mins</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="card">
          <div className="card-body">
            <h1 style={{ fontWeight: "bold", fontSize: "25px" }}>Tools</h1>
            <div className="button-group" >
            <button className="btn btn-primary"
             onClick={showRebootModal} 
             style={{ backgroundColor: "#1261A1", color: "#FFFFFF" }}>
                  Reboot
                </button>
                &nbsp;
                <button className="btn btn-primary" 
                onClick={showResetModal} 
                style={{ backgroundColor: "#1261A1", color: "#FFFFFF" }}>
                  Reset
                </button>
                &nbsp;
                <button className="btn btn-primary" 
                onClick={pingDevice} 
                style={{ backgroundColor: "#1261A1", color: "#FFFFFF" }}>
                  Ping
                </button>

            </div>
            {/* Modals for each action go here */}
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        title="Confirm Reboot"
        visible={rebootVisible}
        onOk={() => {
          hideRebootModal();
          rebootDevice();
        }}
        onCancel={hideRebootModal}
        maskClosable={false}
        centered
        okButtonProps={{ style: { backgroundColor: "#1261A1", color: "#FFFFFF" } }}
      >
        <p>Are you sure you want to reboot the device?</p>
      </Modal>

      <Modal
        title="Confirm Reset"
        visible={resetVisible}
        onOk={() => {
          hideResetModal();
          resetDevice();
        }}
        maskClosable={false}
        onCancel={hideResetModal}
        centered
        okButtonProps={{ style: { backgroundColor: "#1261A1", color: "#FFFFFF" } }}
      >
        <p>Are you sure you want to reset this device to its factory settings?</p>
      </Modal>

      {/* <Modal
        title="Confirm Ping"
        visible={pingVisible}
        onOk={() => {
          hidePingModal();
          pingDevice();
        }}
        onCancel={hidePingModal}
        maskClosable={false}
        centered
        okButtonProps={{ style: { backgroundColor: "#1261A1", color: "#FFFFFF" } }}
      >
        <p>Are you sure you want to ping the device?</p>
      </Modal> */}
    </div>
  );
}
export default Firmware;
