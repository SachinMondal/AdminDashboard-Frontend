import { Box, CircularProgress, IconButton, Menu, MenuItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SimpleLineGraph from '../charts/SimpleLineGraph'

const IntensityData = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [data, setData] = useState([]);
    const [intensityOccurrences, setIntensityOccurrences] = useState({});
    const [maxCount, setMaxCount] = useState(0); // State to hold the maximum count
    const [isLoading, setIsLoading] = useState(true);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const API = "https://admindashboard-backend-2.onrender.com";
    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch(`${API}/filterData?intensity=`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();

                // Filter out null intensity values
                const filteredData = jsonData.filter(item => item.intensity !== null);

                setData(filteredData);

                // Calculate intensity occurrences
                const intensityCount = filteredData.reduce((acc, curr) => {
                    const intensity = curr.intensity;
                    acc[intensity] = (acc[intensity] || 0) + 1;
                    return acc;
                }, {});

                setIntensityOccurrences(intensityCount);

                // Calculate maximum count
                const counts = Object.values(intensityCount);
                const max = Math.max(...counts);
                setMaxCount(max);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className='h-[2rem] w-full flex m-2 justify-between items-center'>
                <div>
                    <h2 className='text-gray-500 text-xl font-semibold text-left'>Intensity Reports</h2>
                    <h6 className='text-gray-500 text-sm text-left'>Intensity Overview</h6>
                </div>
                <div>
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        MenuListProps={{
                            'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}

                    >

                        <MenuItem key="1" onClick={handleClose}>View</MenuItem>
                        <MenuItem key="2" onClick={handleClose}>Link</MenuItem>
                        <MenuItem key="3" onClick={handleClose}>View</MenuItem>

                    </Menu>

                </div>
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center w-full h-full">
                    <CircularProgress />
                </div>
            ) : (
                <>
                    <div className="flex h-[10rem] w-full m-1 justify-between flex-wrap">
                        <div className='h-[2rem] w-full lg:w-1/4'>
                            <h1 className='text-left text-gray-600 font-extrabold text-[2rem] m-2'>1k</h1>
                            <h6 className='text-center text-gray-500 lg:text-sm sm:text-xs'>You informed about the intensity of the datas</h6>
                        </div>
                        <div className='h-full w-[20rem] mb-2 overflow-x-auto overflow-y-hidden lg:w-[29rem] scroll'>
                            <SimpleLineGraph data={data} />
                        </div>
                    </div>
                    <div className="flex border border-gray-500 h-[8rem] w-full ms-4 me-4 rounded-lg justify-evenly items-center p-2 overflow-x-auto overflow-y-hidden mt-8">
                        {Object.entries(intensityOccurrences).map(([intensity, count]) => (
                            <div className='h-[rem] lg:w-1/3 p-3 w-[8rem]' key={intensity}>
                                <div className='flex h-[2rem] w-full'>
                                    <Box className="bg-blue-400 w-[1.5rem] h-[1.5rem] rounded-lg">
                                        <h3 className='text-blue-700 font-extrabold text-sm'>$</h3>
                                    </Box>
                                    <h4 className='text-gray-500 text-md font-bold ms-2'>Intensity:{intensity} </h4>
                                </div>
                                <div>
                                    <h1 className='text-gray-800 text-xl text-left font-bold'>
                                        {count}
                                    </h1>
                                </div>
                                <div className="border border-blue-500 mt-2 rounded-lg h-[0.5rem] w-full relative">
                                    <div className='bg-blue-500 absolute h-[0.5rem] rounded-lg' style={{ width: `${(count / maxCount) * 100}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>

                </>
            )
            }

        </>
    )
}
export default IntensityData;
