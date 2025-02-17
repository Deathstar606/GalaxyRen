import React, { useState } from "react";
import { Row, Col, Button, Form, FormGroup, Label, Input, Container, CardImg, Card, CardBody, CardTitle, CardText } from "reactstrap";
import ServiceForm from "../Admin Forms/ServiceForm";
import { baseUrl } from "../shared/baseurl";
import ToolsForm from "../Admin Forms/ToolsForm";

const Admin = (props) => {
  
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [activeTab, setActiveTab] = useState("messages");


  const services = props.services.services.map((serve, index) => {
    return (
      <Col md={6}>
        <Card key={index} className="mb-3 p-3">
          <CardBody>
            <div className="service-image-container">
              <CardImg src={baseUrl + serve.mainImg}/>
            </div>
            <CardText>Service Name: {serve.name}</CardText>
            <CardText>Description: {serve.description}</CardText>
          </CardBody>
        </Card>
      </Col>

    )
  })

  const reservations = props.reservations.reservations.map((res, index) => {
    return (
      <>
        <Card key={index} className="mb-3 p-3">
          <CardBody>
            <CardTitle tag="h5">Reservation Date: {new Date(res.createdAt).toLocaleDateString("en-GB")}</CardTitle>
            {props.tools.tool.find((tool) => tool._id === res.toolId) && (
              <>
                <div className="d-flex justify-content-center">
                  <CardImg src={baseUrl + props.tools.tool.find((tool) => tool._id === res.toolId).image} alt={props.tools.tool.find((tool) => tool._id === res.toolId).name} style={{ width: "100px" }} />
                </div>
                <h6 className="text-center">{props.tools.tool.find((tool) => tool._id === res.toolId).name}</h6>
              </>
            )}
            <CardText>Duration: {res.duration}</CardText>
            <CardText>Pickup Method: {res.pickupMethod}</CardText>
            <hr />
            <CardText>Name: {res.name}</CardText>
            <CardText>Email: {res.email}</CardText>
            <CardText>Phone: {res.phone}</CardText>
            <CardText>Charge: ${res.charge}</CardText>
            {res.location &&
              (typeof res.location === "string" ? (
                <CardText>Location: {res.location}</CardText>
              ) : res.location.latitude && res.location.longitude ? (
                <div style={{ height: "200px", width: "100%" }}>
                  <iframe
                    width="100%"
                    height="200"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src={`https://maps.google.com/maps?q=${res.location.latitude},${res.location.longitude}&z=13&output=embed`}
                  ></iframe>
                </div>
              ) : null)}
          </CardBody>
        </Card>
      </>
    );
  });

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
                            backgroundColor: activeTab === "messages" ? "black" : "white", 
                            color: activeTab === "messages" ? "white" : "black" 
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
                            backgroundColor: activeTab === "services" ? "black" : "white", 
                            color: activeTab === "services" ? "white" : "black" 
                        }} 
                        className="border rounded p-3 text-center" 
                        onClick={() => setActiveTab("services")}
                    >
                        Services
                    </div>
                </Col>
                <Col md={3} xs={6}>
                    <div 
                        style={{ 
                            backgroundColor: activeTab === "tools" ? "black" : "white", 
                            color: activeTab === "tools" ? "white" : "black" 
                        }} 
                        className="border rounded p-3 text-center" 
                        onClick={() => setActiveTab("tools")}
                    >
                        Tools
                    </div>
                </Col>
                <Col md={3} xs={6}>
                    <div 
                        style={{ 
                            backgroundColor: activeTab === "reservations" ? "black" : "white", 
                            color: activeTab === "reservations" ? "white" : "black" 
                        }} 
                        className="border rounded p-3 text-center" 
                        onClick={() => setActiveTab("reservations")}
                    >
                        Reservations
                    </div>
                </Col>
              </Row>
              {activeTab === "messages" && (
                <Row> {contacts} </Row>
              )}
              {activeTab === "services" && (
                <>
                  <Row> {services} </Row>
                  <ServiceForm />
                </>
              )}
              {activeTab === "tools" && (
                <>
                  <Row> {tools} </Row>
                  <ToolsForm/>
                </>
              )}
              {activeTab === "reservations" && (
                  <Row> {reservations} </Row>
              )}    
            </Container>
            <div style={{display: "inline-block"}} className="butt" onClick={props.logoutUser}>Logout</div>
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
