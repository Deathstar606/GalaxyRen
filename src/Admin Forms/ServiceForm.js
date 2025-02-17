import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import { baseUrl } from "../shared/baseurl";

const ServiceForm = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        mainImg: null,
        secondaryImg: []
    });

    const toggleForm = () => {
        setShowForm(!showForm);
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleMainImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, mainImg: file });
    };

    const handleSecondaryImagesChange = (e) => {
        const files = Array.from(e.target.files);
        const totalFiles = formData.secondaryImg.length + files.length;
    
        if (totalFiles > 3) {
            alert("You can only select up to 3 images.");
            return;
        }
    
        setFormData({ ...formData, secondaryImg: [...formData.secondaryImg, ...files] });
    };    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
    
        // Append text fields
        data.append("name", formData.name);
        data.append("description", formData.description);
    
        // Append main image
        if (formData.mainImg) {
            data.append("mainImg", formData.mainImg);
        }
    
        // Append secondary images properly
        formData.secondaryImg.forEach((file) => {
            data.append("secondaryImg", file);
        });
    
        const token = localStorage.getItem("token");
    
        try {
            const response = await axios.post(baseUrl + "services", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `bearer ${token}`,
                },
            });
            console.log("Success:", response.data);
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error);
        }
    };    

    return (
        <div>
            <Button className="butt" onClick={toggleForm}>
                {showForm ? "Cancel" : "Add Service"}
            </Button>
            {showForm && (
                <Form onSubmit={handleSubmit} className="mt-3">
                    <FormGroup>
                        <Label for="name">Service Name:</Label>
                        <Input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description:</Label>
                        <Input type="textarea" name="description" id="description" value={formData.description} onChange={handleChange} required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="mainImg">Upload Main Image:</Label>
                        <Input type="file" id="mainImg" onChange={handleMainImageChange} accept="image/*" required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="secondaryImg">Upload Secondary Images (Max: 3):</Label>
                        <Input type="file" id="secondaryImg" onChange={handleSecondaryImagesChange} accept="image/*" multiple required />
                        <div>
                            {formData.secondaryImg.length > 0 && (
                                <ul>
                                    {formData.secondaryImg.map((file, index) => (
                                        <li key={index}>{file.name}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </FormGroup>
                    <Button type="submit" className="butt">Submit</Button>
                </Form>
            )}
        </div>
    );
};

export default ServiceForm;
