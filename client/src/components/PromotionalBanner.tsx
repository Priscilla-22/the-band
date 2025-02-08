import React, { useEffect, useRef } from "react";

const PromotionalBanner: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    // Automatically scroll every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if (scrollRef.current) {
                const scrollWidth = scrollRef.current.scrollWidth;
                const scrollLeft = scrollRef.current.scrollLeft;

                // Scroll when the right end is reached
                if (scrollLeft + scrollRef.current.offsetWidth >= scrollWidth) {
                    scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
                } else {
                    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
                }
            }
        }, 3000); // Scroll every 3 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div className="absolute bottom-0 left-0 right-0 px-6 py-4">
            {/* Scrollable Container */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-8 mx-auto max-w-4xl scrollbar-hide snap-x snap-mandatory"
            >
                {/* Promotion 1 */}
                <div className="min-w-[calc(50%-16px)] bg-red-600 p-6 rounded-lg shadow-lg snap-start">
                    <h3 className="text-2xl font-bold text-white">50% OFF!</h3>
                    <p className="mt-2 text-gray-300">Save big on Black Friday deals.</p>
                    <a
                        href="/offers"
                        className="mt-4 bg-white text-black py-2 px-4 rounded-full font-semibold hover:bg-gray-200"
                    >
                        View Offers
                    </a>
                </div>

                {/* Promotion 2 */}
                <div className="min-w-[calc(50%-16px)] bg-yellow-400 p-6 rounded-lg shadow-lg snap-start">
                    <h3 className="text-2xl font-bold text-black">Buy 1 Get 1 Free!</h3>
                    <p className="mt-2 text-gray-800">Amazing offer on shoes & accessories.</p>
                    <a
                        href="/offers"
                        className="mt-4 bg-black text-white py-2 px-4 rounded-full font-semibold hover:bg-gray-700"
                    >
                        Shop Now
                    </a>
                </div>

                {/* Promotion 3 */}
                <div className="min-w-[calc(50%-16px)] bg-green-500 p-6 rounded-lg shadow-lg snap-start">
                    <h3 className="text-2xl font-bold text-white">Limited Time!</h3>
                    <p className="mt-2 text-gray-300">Get exclusive discounts this weekend.</p>
                    <a
                        href="/offers"
                        className="mt-4 bg-white text-black py-2 px-4 rounded-full font-semibold hover:bg-gray-200"
                    >
                        Explore Now
                    </a>
                </div>

                {/* Promotion 4 */}
                <div className="min-w-[calc(50%-16px)] bg-blue-500 p-6 rounded-lg shadow-lg snap-start">
                    <h3 className="text-2xl font-bold text-white">Free Shipping</h3>
                    <p className="mt-2 text-gray-300">Enjoy free shipping on all orders above $50!</p>
                    <a
                        href="/offers"
                        className="mt-4 bg-white text-black py-2 px-4 rounded-full font-semibold hover:bg-gray-200"
                    >
                        Learn More
                    </a>
                </div>

                {/* Duplicate Promotions for Continuous Scrolling */}
                {/* Promotion 1 */}
                <div className="min-w-[calc(50%-16px)] bg-red-600 p-6 rounded-lg shadow-lg snap-start">
                    <h3 className="text-2xl font-bold text-white">50% OFF!</h3>
                    <p className="mt-2 text-gray-300">Save big on Black Friday deals.</p>
                    <a
                        href="/offers"
                        className="mt-4 bg-white text-black py-2 px-4 rounded-full font-semibold hover:bg-gray-200"
                    >
                        View Offers
                    </a>
                </div>

                {/* Promotion 2 */}
                <div className="min-w-[calc(50%-16px)] bg-yellow-400 p-6 rounded-lg shadow-lg snap-start">
                    <h3 className="text-2xl font-bold text-black">Buy 1 Get 1 Free!</h3>
                    <p className="mt-2 text-gray-800">Amazing offer on shoes & accessories.</p>
                    <a
                        href="/offers"
                        className="mt-4 bg-black text-white py-2 px-4 rounded-full font-semibold hover:bg-gray-700"
                    >
                        Shop Now
                    </a>
                </div>

                {/* Promotion 3 */}
                <div className="min-w-[calc(50%-16px)] bg-green-500 p-6 rounded-lg shadow-lg snap-start">
                    <h3 className="text-2xl font-bold text-white">Limited Time!</h3>
                    <p className="mt-2 text-gray-300">Get exclusive discounts this weekend.</p>
                    <a
                        href="/offers"
                        className="mt-4 bg-white text-black py-2 px-4 rounded-full font-semibold hover:bg-gray-200"
                    >
                        Explore Now
                    </a>
                </div>

                {/* Promotion 4 */}
                <div className="min-w-[calc(50%-16px)] bg-blue-500 p-6 rounded-lg shadow-lg snap-start">
                    <h3 className="text-2xl font-bold text-white">Free Shipping</h3>
                    <p className="mt-2 text-gray-300">Enjoy free shipping on all orders above $50!</p>
                    <a
                        href="/offers"
                        className="mt-4 bg-white text-black py-2 px-4 rounded-full font-semibold hover:bg-gray-200"
                    >
                        Learn More
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PromotionalBanner;
