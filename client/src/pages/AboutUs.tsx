import React from 'react';

const AboutUs: React.FC = () => {
    return (
        <div className="bg-white text-black py-12 px-6 sm:px-12 md:px-16 mt-24">
            <div className="container mx-auto">
                {/* Hero Section */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                    <div className="md:w-1/2">
                        <h1 className="text-4xl font-bold mb-4 text-center md:text-left text-red-600">
                            WHO WE ARE?
                        </h1>
                        <p className="text-lg mb-4">
                            <span className="text-4xl font-bold inline-block">T</span>he Band is an innovative and dynamic group, dedicated to providing musical entertainment, and embracing the power of music to bring people together. Founded in 2020, The Band has captivated audiences through electrifying performances and strong artistic expression.
                        </p>
                    </div>
                    <div className="md:w-1/2">
                        <video className="w-3/4 h-64 object-cover rounded-lg shadow-md mx-auto" controls>
                            <source src="/path/to/your/video.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>

                {/* Core Values */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-semibold mb-6">Our Core Values</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-2">Creativity</h3>
                            <p className="text-sm text-gray-600">We believe in pushing boundaries and exploring new creative expressions through our music.</p>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-2">Community</h3>
                            <p className="text-sm text-gray-600">Music brings people together. We are committed to fostering a community of music lovers and creatives.</p>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                            <p className="text-sm text-gray-600">We always seek new ways to push the envelope in music production, performance, and experience.</p>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-2">Passion</h3>
                            <p className="text-sm text-gray-600">Our passion for music drives everything we do, from creation to performance.</p>
                        </div>
                    </div>
                </div>

                {/* Mission & Vision */}
                <div className="mb-12 text-center">
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="mb-6 md:mb-0 md:w-1/2">
                            <h2 className="text-3xl font-semibold mb-4 text-red-600">Our Mission</h2>
                            <p className="text-lg">
                                <span className="text-4xl font-bold inline-block">T</span>o create music that resonates with diverse audiences, inspires creativity, and builds community through the power of sound.
                            </p>
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-semibold mb-4 text-red-600">Our Vision</h2>
                            <p className="text-lg">
                                <span className="text-4xl font-bold inline-block">T</span>o be a global force in the music industry, using our music to spark change, entertain, and connect people worldwide.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
