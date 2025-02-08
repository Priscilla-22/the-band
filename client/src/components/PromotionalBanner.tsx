import React, { useEffect, useState, useRef } from "react";
import config from "../config";

const PromotionalBanner: React.FC = () => {
    const [promotions, setPromotions] = useState<any[]>([]);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [isScrolling, setIsScrolling] = useState(true);

    useEffect(() => {
        fetch(`${config.BASE_URL}/promotions`)
            .then((response) => response.json())
            .then((data) => {
                setPromotions(data);
            });

        const interval = setInterval(() => {
            if (scrollRef.current && isScrolling) {
                const scrollWidth = scrollRef.current.scrollWidth;
                const scrollLeft = scrollRef.current.scrollLeft;
                const clientWidth = scrollRef.current.clientWidth;

                // If we have reached the end, reset to the start
                if (scrollLeft + clientWidth >= scrollWidth) {
                    scrollRef.current.scrollTo({ left: 0, behavior: "auto" });
                } else {
                    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
                }
            }
        }, 2000); // Scroll every 2 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [isScrolling]);

    const duplicatePromotions = [...promotions, ...promotions]; // Duplicate the promotions to create a loop effect

    return (
        <div className="absolute bottom-0 left-0 right-0 px-6 py-4 pb-20">
            {/* Scrollable Container */}
            <div
                ref={scrollRef}
                className="flex gap-8 mx-auto max-w-4xl snap-x snap-mandatory"
                style={{
                    overflowX: "auto",  // Allow scrolling
                    scrollbarWidth: "none",  // For Firefox
                    msOverflowStyle: "none",  // For IE
                }}
                onMouseEnter={() => setIsScrolling(false)} // Pause scrolling on hover
                onMouseLeave={() => setIsScrolling(true)} // Resume scrolling when not hovering
            >
                {duplicatePromotions.map((promotion, index) => (
                    <div
                        key={`promotion-${index}`}
                        className={`min-w-[calc(50%-16px)] p-6 rounded-lg shadow-lg snap-start ${promotion.bg_color}`}
                    >
                        <h3 className={`text-2xl font-bold ${promotion.text_color}`}>
                            {promotion.title}
                        </h3>
                        <p className="mt-2 text-gray-300">{promotion.description}</p>
                        <a
                            href={promotion.link}
                            className="mt-4 bg-white text-black py-2 px-4 rounded-full font-semibold hover:bg-gray-200"
                        >
                            View Offers
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PromotionalBanner;