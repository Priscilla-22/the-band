import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config"; // Assuming you have the config file to set the base URL

interface Testimonial {
    id: number;
    customer_name: string;
    review: string;
    rating: number;
    date: string;
    image_url: string;  // Added to handle the image URL
}

const Testimonials: React.FC = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    useEffect(() => {
        axios
            .get(`${config.BASE_URL}/testimonials`)
            .then((response) => {
                setTestimonials(response.data);
            })
            .catch((error) => {
                console.error("Error fetching testimonials:", error);
            });
    }, []);

    return (
        <section className="testimonials-section py-10 bg-gray-100">
            <h2 className="text-3xl font-bold text-center mb-6">What Our Customers Say</h2>
            <div className="testimonial-cards flex flex-wrap justify-center gap-8">
                {testimonials.map((testimonial) => (
                    <div
                        key={testimonial.id}
                        className="testimonial-card bg-white p-6 rounded-lg shadow-lg w-96 flex items-center"
                    >
                        {/* Left side: Image */}
                        <div className="w-24 h-24 rounded-full overflow-hidden">
                            <img
                                src={testimonial.image_url}
                                alt={testimonial.customer_name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Right side: Review and Details */}
                        <div className="ml-6 flex flex-col">
                            <div className="flex items-center">
                                <h3 className="text-xl font-semibold">{testimonial.customer_name}</h3>
                                <p className="ml-4 text-sm text-gray-600">{testimonial.date}</p>
                            </div>

                            {/* Quote */}
                            <div className="mt-4">
                                <p className="text-gray-600 text-lg italic">
                                    <span className="text-gray-500">"</span>
                                    {testimonial.review}
                                    <span className="text-gray-500">"</span>
                                </p>
                            </div>

                            {/* Rating */}
                            <div className="mt-3">
                                <span className="text-yellow-400">
                                    {"★".repeat(testimonial.rating)}
                                    {"☆".repeat(5 - testimonial.rating)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
