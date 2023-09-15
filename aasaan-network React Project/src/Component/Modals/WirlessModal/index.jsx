import React, { useState, useEffect } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Form, Input, Button, Select, message } from "antd";
import axios from "axios";
import SubHeader from "../../Reusable/Header/subHeader";
import { wirlessInitialValue } from "../../Form/wirlessForm";
import { WirlessSchema } from "../../Form/wirlessForm";

const { Option } = Select;

const WirlessModal = ({ show, type, onHide, selectedRow, isEditMode, ssid, security }) => {
  const [encryptionType, setEncryptionType] = useState("open");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [previousPassword, setPreviousPassword] = useState("");
  const [selectedSecurityType, setSelectedSecurityType] = useState("open"); 
  const [form] = Form.useForm();

  useEffect(() => {
    if (isEditMode && selectedRow) {
      form.setFieldsValue({
        ssid: selectedRow.SSID,
        security: selectedRow.Security,
      });

      if (selectedRow.Security === "WPA2&3PSK") {
        setPreviousPassword(selectedRow.PreviousPassword); 
        setSelectedSecurityType("WPA2&3PSK"); 
      }
    }
  }, [isEditMode, selectedRow, form]);

  const isButtonDisabled = false;

  const handleSubmit = async (values) => {
    console.log("Submit button clicked");
    try {
      const requestBody = {
        name: values.ssid, 
        security: values.security,
        password: values.password, 
      };

      const response = await axios.post("http://localhost:3000/api/wireless", requestBody);
      console.log("API Response:", response.data);

     
      message.success("Wireless device created/updated successfully");

      onHide();
    } catch (error) {
      console.error("API Error:", error);
      if (error.response) {
        console.error("Server Error Data:", error.response.data);
      }

      // Show an error message
      message.error("Failed to create/update the wireless device");
    }
  };
  
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleBackClick = () => {
    onHide();
  };

  const handleSecurityTypeChange = (type) => {
    setSelectedSecurityType(type);
    if (type !== "WPA2&3PSK") {
      form.setFieldsValue({ security: type });
    }
  };

  return (
    <>
      <div className="mt-4">
        <button className="btn btn-secondary" onClick={handleBackClick}>
          <ArrowLeftOutlined /> Back
        </button>

        <div className="pb-2">
          <SubHeader type={"WIRELESS"} />
        </div>
        <div className="card aasan-card">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 pt-3">
                {/* <Form
                    form={form}
                    initialValues={wirlessInitialValue()}
                    onFinish={handleSubmit}
                    validateSchema={WirlessSchema}
                  >
                    <div className="row">
                      <div className="col-sm-6">
                        <h>Update your SSID and security</h>
                        <Form.Item
                          name="ssid"
                          label="SSID"
                          initialValue={ssid}
                        >
                          <Input placeholder="SSID" />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-6">
                        <Form.Item label="Security">
                          <Select
                            value={selectedSecurityType}
                            onChange={(value) => {
                              setEncryptionType(value);
                              handleSecurityTypeChange(value);
                            }}
                          >
                            <Option value="open">Open</Option>
                            <Option value="WPA2&3PSK">WPA2&3PSK</Option>
                          </Select>
                        </Form.Item>
                      </div>
                    </div>

                    {selectedSecurityType === "WPA2&3PSK" && (
                      <div className="row">
                        <div className="col-sm-6">
                          <Form.Item
                            name="security"
                            label="Enter your password"
                            initialValue={previousPassword}
                            rules={[{ required: true, message: 'Please enter your password' }]}
                          >
                            <Input.Password
                              placeholder="Enter your password"
                              iconRender={(visible) => (
                                <span onClick={togglePasswordVisibility}>
                                  {visible ? " Hide" : " Show"}
                                </span>
                              )}
                            />
                          </Form.Item>
                        </div>
                      </div>
                    )}

                    <div className="row">
                      <div className="col-sm-6">
                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            style={{ backgroundColor: "#1261A1", color: "#FFFFFF" }}
                            disabled={isButtonDisabled}
                          >
                            Submit
                          </Button>
                        </Form.Item>
                      </div>
                    </div>
                  </Form> */}
<Form
  form={form}
  initialValues={wirlessInitialValue()}
  onFinish={handleSubmit}
  validateSchema={WirlessSchema}
>
  <div className="row">
    <div className="col-sm-12">
      <h style={{fontWeight: "bold"}}>SSID</h>
      <Form.Item
        name="ssid"
        initialValue={ssid}
      >
        <Input placeholder="SSID" style={{ width: "200px" }}/>
      </Form.Item>
    </div>
  </div>

  <div className="row">
    <div className="col-sm-12">
      <h style={{fontWeight: "bold"}}>Security</h>
      <Form.Item label="" style={{ width: "200px" }}>
        <Select
          value={selectedSecurityType}
          onChange={(value) => {
            setEncryptionType(value);
            handleSecurityTypeChange(value);
          }}
        >
          <Option value="open">Open</Option>
          <Option value="WPA2&3PSK">WPA2&3PSK</Option>
        </Select>
      </Form.Item>
    </div>
  </div>

  {selectedSecurityType === "WPA2&3PSK" && (
    <div className="row">
      <div className="col-sm-12">
        <h style={{fontWeight: "bold"}}>Enter your password</h>
        <Form.Item
          name="security"
          initialValue={previousPassword}
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
          ]}
        >
          <Input.Password
          style={{ width: "200px" }}
            placeholder="Enter your password"
            iconRender={(visible) => (
              <span onClick={togglePasswordVisibility}>
                {visible ? " Hide" : " Show"}
              </span>
            )}
          />
        </Form.Item>
      </div>
    </div>
  )}

  <div className="row">
    <div className="col-sm-12">
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ backgroundColor: "#1261A1", color: "#FFFFFF" }}
          disabled={isButtonDisabled}
        >
          Submit
        </Button>
      </Form.Item>
    </div>
  </div>
</Form>



              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WirlessModal;
