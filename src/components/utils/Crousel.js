import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';

const crouselMenu = [
    {
        "url": "https://cdn4.iconfinder.com/data/icons/seo-web-3-1/128/Vigor_Analysis-Data-Analytics-1024.png",
        "Name": "Web Analytics",
        "SubTitle": "Total 28.5% Population Rate",
        "Heading": "Traffic",
        "analytics": [
            { "Sessions": 100 },
            { "Order": 100 },
            { "Order": 100 },
            { "Order": 100 }
        ]
    },
    {
        "url": "https://cdn4.iconfinder.com/data/icons/seo-web-3-1/128/Vigor_Analysis-Data-Analytics-1024.png",
        "Name": "Web Analytics",
        "SubTitle": "Total 28.5% Population Rate",
        "Heading": "Traffic",
        "analytics": [
            { "Sessions": 400 },
            { "Order": 100 },
            { "Order": 100 },
            { "Order": 100 }
        ]
    }
];

const Carousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768); // Adjust the breakpoint as needed
        };

        handleResize(); // Set initial screen size
        window.addEventListener('resize', handleResize);

        const intervalId = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex === crouselMenu.length - 1 ? 0 : prevIndex + 1));
        }, 5000);

        return () => {
            clearInterval(intervalId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleDotClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className="relative w-full overflow-hidden bg-blue-500 rounded-lg">
            <div className="flex" style={{ width: `${crouselMenu.length * 100}%`, transform: `translateX(-${activeIndex * (100 / crouselMenu.length)}%)`, transition: 'transform 0.2s ease-in-out' }}>
                {crouselMenu.map((menuItem, index) => (
                    <div key={index} className="w-full h-full flex justify-center items-center">
                        <div className="rounded-lg p-4 flex justify-center flex-col lg:flex-row items-center">
                            <div className={`w-full lg:w-[23rem] h-[13rem] p-2 ${isSmallScreen ? 'text-sm' : ''}`}>
                                <div className='items-start'>
                                    <h1 className='text-white text-left font-bold text-2xl'>{menuItem.Name}</h1>
                                    <h6 className='text-white text-left text-sm'>{menuItem.SubTitle}</h6>
                                    <h4 className='text-white text-left text-lg mt-4'>{menuItem.Heading}</h4>
                                    <div className='h-[5rem] w-full lg:w-[70%] mt-2'>
                                        <div>
                                            <Box className="flex flex-wrap">
                                                {menuItem.analytics.map((data, index) => (
                                                    <div key={index} className="w-[7rem] m-1">
                                                        {Object.keys(data).map((key, subIndex) => (
                                                            <div key={subIndex} className='h-[2rem] w-full flex flex-wrap items-center'>
                                                                <div className='bg-blue-700 p-1 ps-2 pe-2 rounded-md text-white'>
                                                                    {data[key]}
                                                                </div>
                                                                <span className='text-white ms-2 text-md'>{key}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ))}
                                            </Box>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='w-full lg:w-[12rem] h-[13rem] flex items-center justify-center'>
                                <img src={menuItem.url} alt={menuItem.Name} className="w-24 h-24 mx-auto mb-4" />
                            </div>

                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute top-4 right-4 flex">
                {crouselMenu.map((_, index) => (
                    <button
                        key={index}
                        className={`w-[0.5rem] sm:w-[0.2rem] h-[0.5rem] rounded-full mx-1 focus:outline-none ${activeIndex === index ? 'bg-white' : 'bg-blue-800'
                            }`}
                        onClick={() => handleDotClick(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
