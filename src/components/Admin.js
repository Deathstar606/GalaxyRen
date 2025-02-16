import React, { useState } from "react";
import { Row, Col, Button, Form, FormGroup, Label, Input, Container, CardImg } from "reactstrap";
import axios from "axios";
import { baseUrl } from "../shared/baseurl";

const Admin = (props) => {

  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [activeTab, setActiveTab] = useState("messages");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    prices: ["", "", "", ""]
  });

  const [image, setImage] = useState(null);

  const contacts = props.contacts.contact.map((contact, index) => {
      return (
          <>
            <Col md={6} key={index}>
              <h4>{contact.name}</h4>
              <p>{contact.email}</p>
              <p>{contact.phone}</p>
              <p>{contact.address}</p>
              <p>{contact.description}</p>
            </Col>
            <Col md={6}>
              <CardImg src={baseUrl + contact.image}/>
            </Col>
          </>
      );
  })
  
  const tools = props.tools.tool.map((tool, index) => {
    console.log(tool);
    return (
      <>
        <Col md={6} key={index}>
          <h4>{tool.name}</h4>
          <p>{tool.description}</p>
          <p>1 hour: {tool.prices[0]}</p>
          <p>4 hours: {tool.prices[1]}</p>
          <p>1 day: {tool.prices[2]}</p>
          <p>1 week: {tool.prices[3]}</p>
        </Col>
        <Col md={6}>
          <CardImg src={baseUrl + tool.image}/>
        </Col>
      </>
    )
  })

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };

  const handlePriceChange = (index, value) => {
      const updatedPrices = [...formData.prices];
      updatedPrices[index] = value;
      setFormData({ ...formData, prices: updatedPrices });
  };

  const handleImageChange = (e) => {
      const file = e.target.files[0];
      setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    
    for (const key in formData) {
        if (Array.isArray(formData[key])) {
            formData[key].forEach((item, index) => {
                data.append(`${key}[${index}]`, item);
            });
        } else {
            data.append(key, formData[key]);
        }
    }
    
    if (image) {
        data.append("image", image);
    }

    const token = localStorage.getItem("token");

    try {
        const response = await axios.post(baseUrl + "tools", data, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `bearer ${token}`, // Attach token here
            },
        });
        console.log("Success:", response.data);
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error);
    }
};

  const handleChangeAdmin = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmitAdmin = (e) => {
    e.preventDefault();
    props.loginUser(credentials);
  };

  return (
    <div className="mt-5">
      {props.auth.isAuthenticated ? (
        <div>
            <h1 className="text-center">Admin Page</h1>
            <Container>
              <Row>
                <Col md={3} xs={6}>
                    <div 
                        style={{ 
                            backgroundColor: activeTab === "messages" ? "white" : "black", 
                            color: activeTab === "messages" ? "black" : "white" 
                        }} 
                        className="border rounded p-3 text-center" 
                        onClick={() => setActiveTab("messages")}
                    >
                        Messages
                    </div>
                </Col>
                <Col md={3} xs={6}>
                    <div 
                        style={{ 
                            backgroundColor: activeTab === "tools" ? "white" : "black", 
                            color: activeTab === "tools" ? "black" : "white" 
                        }} 
                        className="border rounded p-3 text-center" 
                        onClick={() => setActiveTab("tools")}
                    >
                        Tools
                    </div>
                </Col>
              </Row>
              {activeTab === "messages" && (
                <Row> {contacts} </Row>
              )}
              {activeTab === "tools" && (
                  <Row> {tools} </Row>
              )}          
            </Container>
{/*             <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="name">Tool Name:</Label>
                    <Input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description:</Label>
                    <Input type="textarea" name="description" id="description" value={formData.description} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label>Prices:</Label>
                    <Row>
                        <Col><Input type="number" placeholder="1 hour" value={formData.prices[0]} onChange={(e) => handlePriceChange(0, e.target.value)} required /></Col>
                        <Col><Input type="number" placeholder="4 hours" value={formData.prices[1]} onChange={(e) => handlePriceChange(1, e.target.value)} required /></Col>
                        <Col><Input type="number" placeholder="1 day" value={formData.prices[2]} onChange={(e) => handlePriceChange(2, e.target.value)} required /></Col>
                        <Col><Input type="number" placeholder="1 week" value={formData.prices[3]} onChange={(e) => handlePriceChange(3, e.target.value)} required /></Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Label for="image">Upload Image:</Label>
                    <Input type="file" id="image" onChange={handleImageChange} accept="image/*" required />
                </FormGroup>
                <Button type="submit" color="primary">Submit</Button>
            </Form>
 */}            <div style={{display: "inline-block"}} className="butt" onClick={props.logoutUser}>Logout</div>
        </div>
      ) : (
        <Form onSubmit={handleSubmitAdmin} className="p-4 border rounded shadow">
          <h2 className="mb-4">Admin Login</h2>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              type="text"
              name="username"
              id="username"
              value={credentials.username}
              onChange={handleChangeAdmin}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={credentials.password}
              onChange={handleChangeAdmin}
              required
            />
          </FormGroup>
          <Button className="butt" type="submit">
            Login
          </Button>
        </Form>
      )}
    </div>
  );
};

export default Admin;
