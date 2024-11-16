import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";

function Testi() {
    const testimonials = [
        {
            text: "This service was absolutely amazing! Highly recommended.",
            author: "John Doe",
        },
        {
            text: "A wonderful experience from start to finish.",
            author: "Jane Smith",
        },
        {
            text: "The team was professional, and the result exceeded expectations!",
            author: "Alex Brown",
        },
    ];

    return (
        <div style={{ backgroundColor: "#00084c", color: "white", padding: "2rem", marginTop: "2rem" }}>
            <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={50}
                slidesPerView={1}
                style={{ padding: "4rem 0" }}
            >
                {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={index} style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>&ldquo;</div>
                        <p style={{ fontSize: "1.25rem", fontStyle: "italic" }}>
                            {testimonial.text}
                        </p>
                        <p style={{ marginTop: "1rem", fontWeight: "bold" }}>
                            - {testimonial.author}
                        </p>
                        <div style={{ fontSize: "3rem", marginTop: "1rem" }}>&rdquo;</div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Testi;


/* Color Code : 
Main: #00084c
Secondary: #d8d9da
Third (Small): #b61414 */