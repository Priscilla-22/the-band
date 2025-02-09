import React from "react";
import PromotionalBanner from "./PromotionalBanner";
import {Link} from "react-router-dom";

const HeroSection: React.FC = () => {
    return (
        <section
            className="relative w-full h-screen bg-cover bg-center flex items-center justify-center px-6 md:px-12"
            style={{ backgroundImage: `url('/images/rnbb.jpeg')` }}
        >

            <div className="absolute inset-0 bg-black/70"></div>

            {/* Content */}
            <div className="relative text-center text-white z-20">
                <h1 className="text-5xl md:text-7xl font-extrabold uppercase transform skew-x-2">
                    <span className="text-white">Black</span>{" "}
                    <span className="text-red-500">Friday</span>
                </h1>
                <p className="mt-4 text-xl md:text-2xl font-semibold">
                    Sale Up to <span className="text-red-500">50% Off</span>
                </p>
                <p className="mt-2 text-gray-300 max-w-lg mx-auto text-sm md:text-base">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu tempor ipsum pellentesque.
                </p>

                {/* CTA Button */}
                <div className="mt-6 ">
                    <Link
                        to="/products"
                        className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold text-lg tracking-wide shadow-lg hover:bg-red-300 transition duration-300"
                    >
                        Shop Now
                    </Link>
                </div>

                {/* Social Icons */}
                <div className="mt-6 flex justify-center space-x-4">
                    <i className="fab fa-facebook text-red-500 text-xl cursor-pointer"></i>
                    <i className="fab fa-instagram text-red-500 text-xl cursor-pointer"></i>
                    <i className="fab fa-twitter text-red-500 text-xl cursor-pointer"></i>
                </div>
            </div>

            {/* Promotional Banner */}
            <PromotionalBanner />

            <div className="absolute top-0 left-0 w-full h-full flex flex-col">
                <div className="absolute top-16 left-0 w-32 h-1 bg-red-600 rotate-45"></div>
                <div className="absolute bottom-16 right-0 w-40 h-1 bg-red-600 -rotate-45"></div>
            </div>
        </section>
    );
};

export default HeroSection;
