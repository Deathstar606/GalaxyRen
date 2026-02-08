import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Col,
  CardImg,
  Button,
} from "reactstrap";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { baseUrl } from "../shared/baseurl";
import axios from "axios";
import contact from "../images/contact2.jpg";

const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "galaxyReno_up"); // Replace with your Cloudinary upload preset
  formData.append("folder", "galaxyReno/contacts");

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/drliblpx7/image/upload",
      {
        method: "POST",
        body: formData,
      },
    );
    const data = await response.json();
    return data.secure_url; // Return the uploaded image URL
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    description: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file));
    setFormData({ ...formData, mainImg: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, phone, email, address, description } = formData;

    if (!name || !phone || !email || !address || !description) {
      alert("Please fill in all required fields before submitting.");
      return;
    }

    const requestData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      description: formData.description,
    };

    try {
      setIsSubmitting(true);
      if (formData.mainImg) {
        alert("Please wait, your image is being uploaded...");
        const mainImgUrl = formData.mainImg
          ? await uploadToCloudinary(formData.mainImg)
          : null;
        requestData.mainImgUrl = mainImgUrl;
      }

      setUploadProgress(0);

      const response = await axios.post(baseUrl + "contact", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setUploadProgress(percent);
        },
      });

      console.log("Success:", response.data);
      alert("✅ Submission complete! Your message has been sent.");
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Upload failed. Please try again.");
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  return (
    <motion.div
      transition={{ duration: 0.5, type: "tween", ease: "easeIn" }}
      initial={{ x: 1000, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -1000, opacity: 0 }}
    >
      <Container
        className="d-flex justify-content-center"
        style={{ paddingTop: "5vh", marginBottom: "10rem" }}
      >
        <Form
          onSubmit={handleSubmit}
          style={{ overflow: "hidden", width: "100%" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key="details"
              transition={{ duration: 0.5, type: "tween", ease: "easeIn" }}
              initial={{ x: 1000, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -1000, opacity: 0 }}
            >
              <h3 className="text-center pb-4">Contact Information</h3>
              <Row className="pt-4">
                <Col md={6}>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Input
                      type="text"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="address">Address</Label>
                    <Input
                      type="text"
                      name="address"
                      id="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="description">Description</Label>
                    <Input
                      style={{ height: "100px" }}
                      type="textarea"
                      name="description"
                      id="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="image">Upload Image</Label>
                    <div className="custom-file">
                      <Input
                        type="file"
                        className="custom-file-input"
                        name="image"
                        id="image"
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                      <Label className="custom-file-label" for="image">
                        Choose file
                      </Label>
                    </div>
                  </FormGroup>
                </Col>
              </Row>
              {imagePreview && (
                <Row className="mb-3">
                  <Col md={12} className="text-center">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: "8px",
                        marginTop: "10px",
                      }}
                    />
                  </Col>
                </Row>
              )}
              {isSubmitting && <p>Uploading image... {uploadProgress}%</p>}
              <div
                className="butt"
                style={{
                  display: "inline-block",
                  opacity: isSubmitting ? 0.6 : 1,
                  pointerEvents: isSubmitting ? "none" : "auto",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                }}
                onClick={!isSubmitting ? handleSubmit : undefined}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </div>
            </motion.div>
          </AnimatePresence>
        </Form>
      </Container>
      <div style={{ backgroundColor: "#00084c" }}>
        <Container style={{ minWidth: "65vw" }}>
          <Row className="pt-5 pb-4" style={{ padding: "1rem" }}>
            <Col
              md={6}
              className="d-flex justify-content-center align-items-center"
            >
              <CardImg
                className="mb-4"
                src={contact}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  borderRadius: "15px",
                }}
              ></CardImg>
            </Col>
            <Col md={6} className="d-flex align-items-center">
              <div>
                <p className="text-white">
                  Have a question, need a quote, or ready to book a service?
                  We’re here to help! At Galaxy Home Solutions, we take pride in
                  fast responses, clear communication, and reliable
                  service—every time.
                </p>
                <div className="mt-5">
                  <a
                    href="tel:416123-4567"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="mr-2">Phone/Text:</span>
                      <span className="fw-semibold">416 123-4567</span>
                    </div>
                  </a>
                  <a
                    href="mailto:solutionsgalaxyhome@gmail.com"
                    target="blank"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <div className="d-flex align-items-center gap-2 mb-2 pt-2">
                      <FaEnvelope className="mr-2" size={20} />
                      <span className="fw-semibold">
                        solutionsgalaxyhome@gmail.com
                      </span>
                    </div>
                  </a>
                  <p className="text-white pt-2">
                    📍 Service Area: Proudly serving Toronto, the GTA, and
                    surrounding areas.
                  </p>
                  <p className="text-white">Hours: Available 7 days a week</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </motion.div>
  );
};

export default AppointmentForm;
