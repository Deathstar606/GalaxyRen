import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  CardImg,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Badge,
} from "reactstrap";
import ServiceForm from "../Admin Forms/ServiceForm";
import ToolsForm from "../Admin Forms/ToolsForm";
import { baseUrl } from "../shared/baseurl";
import axios from "axios";

const Admin = (props) => {
  const deleteService = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this service?",
    );
    if (!confirmed) return;

    const token = localStorage.getItem("token");

    try {
      const deletereq = await axios.delete(`${baseUrl}services/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Delete Successful:", deletereq.data);
      alert("Service deleted successfully!");
    } catch (error) {
      console.error(
        "Delete Error:",
        error.response ? error.response.data : error,
      );
      alert("Failed to delete the service. Please try again.");
    }
  };

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [activeTab, setActiveTab] = useState("messages");

  const services = props.services.services.map((serve, index) => {
    return (
      <Col md={6}>
        <Card key={index} className="mb-3 p-3">
          <CardBody>
            <div className="service-image-container">
              <CardImg src={serve.mainImg} />
            </div>
            <CardText className="mt-4">Service Name: {serve.name}</CardText>
            <CardText>Description: {serve.description}</CardText>
            <div
              className="butt"
              style={{ display: "inline-block" }}
              onClick={() => deleteService(serve._id)}
            >
              Delete Service
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  });

  const reservations = props.reservations.reservations.map((res, index) => {
    return (
      <>
        <Card key={index} className="mb-3 p-3">
          <CardBody>
            <CardTitle tag="h5">
              Reservation Date:{" "}
              {new Date(res.createdAt).toLocaleDateString("en-GB")}
            </CardTitle>
            {props.tools.tool.find((tool) => tool._id === res.toolId) && (
              <>
                <div className="d-flex justify-content-center">
                  <CardImg
                    src={
                      baseUrl +
                      props.tools.tool.find((tool) => tool._id === res.toolId)
                        .image
                    }
                    alt={
                      props.tools.tool.find((tool) => tool._id === res.toolId)
                        .name
                    }
                    style={{ width: "100px" }}
                  />
                </div>
                <h6 className="text-center">
                  {
                    props.tools.tool.find((tool) => tool._id === res.toolId)
                      .name
                  }
                </h6>
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

  const contacts = props.contacts.contact.map((contact) => {
    return (
      <Col md={12} key={contact._id} className="mb-4">
        <Card className="shadow-sm">
          <CardBody>
            <Row className="align-items-center">
              {/* Image Section */}
              <Col
                md={6}
                className="d-flex justify-content-center mb-3 mb-md-0"
              >
                {contact.image ? (
                  <CardImg
                    src={contact.image}
                    alt={contact.name}
                    top
                    style={{
                      width: "100%",
                      height: "400px",
                      objectFit: "contain",
                      borderRadius: "0.5rem",
                    }}
                  />
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center bg-light text-muted"
                    style={{
                      width: "100%",
                      height: "400px",
                      borderRadius: "0.5rem",
                      fontWeight: 500,
                    }}
                  >
                    No Image
                  </div>
                )}
              </Col>

              {/* Content Section */}
              <Col md={6}>
                <h4 className="mb-2">
                  {contact.name}{" "}
                  <Badge className="ml-1" color="secondary" pill>
                    Contact
                  </Badge>
                </h4>

                <p className="mb-1">
                  <strong>Email:</strong> {contact.email}
                </p>
                <p className="mb-1">
                  <strong>Phone:</strong> {contact.phone}
                </p>
                <p className="mb-1">
                  <strong>Address:</strong> {contact.address}
                </p>

                {contact.description && (
                  <p className="mt-3 text-muted">{contact.description}</p>
                )}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    );
  });

  const tools = props.tools.tool.map((tool, index) => (
    <Col md={4} key={index} className="mb-3">
      <Card>
        <CardImg top src={baseUrl + tool.image} alt={tool.name} />
        <CardBody>
          <CardTitle tag="h4">{tool.name}</CardTitle>
          <CardText>{tool.description}</CardText>
          <CardText>1 hour: {tool.prices[0]}</CardText>
          <CardText>4 hours: {tool.prices[1]}</CardText>
          <CardText>1 day: {tool.prices[2]}</CardText>
          <CardText>1 week: {tool.prices[3]}</CardText>
        </CardBody>
      </Card>
    </Col>
  ));

  const handleChangeAdmin = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmitAdmin = (e) => {
    e.preventDefault();
    props.loginUser(credentials);
  };

  return (
    <div className="mt-5 mb-5">
      {props.auth.isAuthenticated ? (
        <div style={{ position: "relative" }}>
          <Container>
            <div className="d-flex justify-content-between align-items-center mb-1 mt-1">
              {/* Left side */}
              <h1
                className="m-0"
                style={{
                  whiteSpace: "nowrap",
                  fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                }}
              >
                Admin Page
              </h1>

              {/* Right side */}
              <div className="d-flex align-items-center gap-3">
                <div
                  className="butt"
                  style={{ cursor: "pointer" }}
                  onClick={props.logoutUser}
                >
                  Logout
                </div>
              </div>
            </div>
            <Row className="p-5">
              <Col md={3} xs={6}>
                <div
                  style={{
                    borderRadius: "15px",
                    marginBottom: "15px",
                    backgroundColor:
                      activeTab === "messages" ? "#00084c" : "white",
                    color: activeTab === "messages" ? "white" : "#00084c",
                  }}
                  className="border p-3 text-center"
                  onClick={() => setActiveTab("messages")}
                >
                  Messages
                </div>
              </Col>
              <Col md={3} xs={6}>
                <div
                  style={{
                    borderRadius: "15px",
                    backgroundColor:
                      activeTab === "services" ? "#00084c" : "white",
                    color: activeTab === "services" ? "white" : "#00084c",
                  }}
                  className="border p-3 text-center"
                  onClick={() => setActiveTab("services")}
                >
                  Services
                </div>
              </Col>
              <Col md={3} xs={6}>
                <div
                  style={{
                    borderRadius: "15px",
                    backgroundColor:
                      activeTab === "tools" ? "#00084c" : "white",
                    color: activeTab === "tools" ? "white" : "#00084c",
                  }}
                  className="border p-3 text-center"
                  onClick={() => setActiveTab("tools")}
                >
                  Tools
                </div>
              </Col>
              <Col md={3} xs={6}>
                <div
                  style={{
                    borderRadius: "15px",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    backgroundColor:
                      activeTab === "reservations" ? "#00084c" : "white",
                    color: activeTab === "reservations" ? "white" : "#00084c",
                  }}
                  className="border p-3 text-center"
                  onClick={() => setActiveTab("reservations")}
                >
                  Reservations
                </div>
              </Col>
            </Row>
            {activeTab === "messages" && (
              <Row className="pt-4"> {contacts} </Row>
            )}
            {activeTab === "services" && (
              <>
                <Row className="pt-4"> {services} </Row>
                <ServiceForm />
              </>
            )}
            {activeTab === "tools" && (
              <>
                <Row className="pt-4"> {tools} </Row>
                <ToolsForm />
              </>
            )}
            {activeTab === "reservations" && (
              <Row className="pt-4"> {reservations} </Row>
            )}
          </Container>
        </div>
      ) : (
        <Container className="p-4">
          <Form
            onSubmit={handleSubmitAdmin}
            className="p-4 border rounded shadow"
          >
            <h2 className="mb-4 text-center">Admin Login</h2>
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
        </Container>
      )}
    </div>
  );
};

export default Admin;
