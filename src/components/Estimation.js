import React, { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Container
} from 'reactstrap';

const Estimation = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  // Service options with prices
  const services = [
    { id: 1, label: 'Service A', price: 50 },
    { id: 2, label: 'Service B', price: 30 },
    {
      id: 3,
      label: 'Service C',
      subcategories: [
        { id: 4, label: 'Sub C1', price: 20 },
        { id: 5, label: 'Sub C2', price: 25 },
      ],
    },
  ];

  // Handle selecting a service
  const handleSelectService = (service) => {
    if (!selectedServices.find((s) => s.id === service.id)) {
      setSelectedServices([...selectedServices, service]);
    }
  };

  // Handle removing a selected service
  const handleRemoveService = (id) => {
    setSelectedServices(selectedServices.filter((service) => service.id !== id));
  };

  // Calculate subtotal
  const subtotal = selectedServices.reduce((sum, service) => sum + service.price, 0);

  return (
    <Container style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div>
      <h1 className='text-center p-5'>Get A Free Estimation of Our Services</h1>
      <Row style={{ border: "1px solid black", borderRadius: "15px", padding: "20px"}}>
        <Col md={6}>
          <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle caret className='butt'>
              Select Service 
            </DropdownToggle>
            <DropdownMenu>
              {services.map((service) =>
                service.subcategories ? (
                  <React.Fragment key={service.id}>
                    <DropdownItem header>{service.label}</DropdownItem>
                    {service.subcategories.map((sub) => (
                      <DropdownItem key={sub.id} onClick={() => handleSelectService(sub)}>
                        {sub.label} - ${sub.price}
                      </DropdownItem>
                    ))}
                  </React.Fragment>
                ) : (
                  <DropdownItem key={service.id} onClick={() => handleSelectService(service)}>
                    {service.label} - ${service.price}
                  </DropdownItem>
                )
              )}
            </DropdownMenu>
          </Dropdown>
          <div className="mt-3">
            <h5>Selected Services:</h5>
            {selectedServices.length > 0 ? (
              selectedServices.map((service) => (
                <div key={service.id} className="d-flex align-items-center">
                  <span>{service.label} - ${service.price}</span>
                  <span
                    className="ml-2"
                    onClick={() => handleRemoveService(service.id)}>
                        ❌
                  </span>
                </div>
              ))
            ) : (
              <p>No services selected.</p>
            )}
          </div>
        </Col>
        <Col md={6} style={{display: "flex", alignItems: "center"}}>
          <h5 className="mt-3">Subtotal: ${subtotal}</h5>
        </Col>
      </Row>
      </div>
    </Container>
  );
};

export default Estimation;
