import React from 'react';
import {Link} from "react-router-dom";

const AboutUs: React.FC = () => {
    return (
        <section className="bg-white py-16 px-6 mt-28">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-extrabold text-gray-900">About Us</h2>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                    We are an online shopping platform dedicated to bringing you the best and most trendy products.
                    Our mission is to provide a seamless shopping experience with top-notch customer service.
                </p>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="flex flex-col items-center space-y-6">
                        <img
                            src="/images/redstain.jpg"
                            alt="Team"
                            className="w-64 h-64 rounded-full object-cover"
                        />
                        <h3 className="text-xl font-semibold text-gray-800">Our Mission</h3>
                        <p className="text-gray-600 text-base">
                            Our mission is to curate the best products that cater to your needs while ensuring
                            excellent quality and the best prices.
                        </p>
                    </div>

                    <div className="flex flex-col items-center space-y-6">
                        <img
                            src="/images/redstrike.jpg"
                            alt="Innovation"
                            className="w-64 h-64 rounded-full object-cover"
                        />
                        <h3 className="text-xl font-semibold text-gray-800">Innovation</h3>
                        <p className="text-gray-600 text-base">
                            We strive to stay ahead of the curve with innovative solutions and products that
                            offer something new and exciting for everyone.
                        </p>
                    </div>
                </div>

                <div className="mt-12 bg-gray-800 text-white py-12 px-6 rounded-lg">
                    <h3 className="text-3xl font-bold text-center">Join Us on Our Journey</h3>
                    <p className="mt-4 text-lg text-center text-gray-300">
                        Be a part of our growing community and enjoy exclusive offers, exciting promotions,
                        and the best shopping experience you can find online.
                    </p>
                    <div className="mt-8 flex justify-center space-x-4">
                        <Link
                            to="/products"
                            className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold text-lg tracking-wide shadow-lg hover:bg-red-300 transition duration-300"
                        >
                            Shop Now
                        </Link>
                        <button className="bg-black text-white font-semibold py-2 px-6 rounded-full hover:bg-gray-800 transition-all">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
