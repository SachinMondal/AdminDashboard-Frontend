import React, { useState } from 'react';
import Crousel from './utils/Crousel';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import CasesOutlinedIcon from '@mui/icons-material/CasesOutlined';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Select } from '@mui/material';
import BarChart from './charts/Barchart'
import LineChart from './charts/LineChart';
import CircularBarPlot from './charts/CircularBarPlot';
import SimpleLineGraph from './charts/SimpleLineGraph';
import PieChart from './charts/PieChart';
import SectorCheckbox from './utils/CheckBox';

const countryOptions = [
    'India', 'USA', 'UK', 'Australia', 'Canada'
];
const options = [
    'None',
    'Atria',
];


const Main = () => {
    const [selectedSector, setSelectedSector] = useState("");
    const [selectedTopic, setSelectedTopic] = useState("");
    const [selectedCountry, setSelectedCountry] = useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        handleClose();
    };

    const handleSectorChange = (event) => {
        // Log the event object
        setSelectedSector(event);
    };


    const handleTopicChange = (event) => {
        setSelectedTopic(event.target.value);
    };



    const sectors = ['Energy', 'Technology', 'Finance'];
    return (
        <div>
            <div className='flex'>
                <div className='flex border h-[15rem] w-[40rem] m-3 rounded-lg'  >
                    <Crousel />
                </div>
                <div className='flex border border-gray-500 h-[15rem] w-[20rem] m-3 rounded-3 rounded-lg' >
                    <div className=' h-[2rem] w-full m-3  rounded-md'>
                        <div className='flex justify-between'>
                            <h5 className='text-gray-500 text-sm'>Sale Overview</h5>
                            <h2 className='text-green-500 text-lg font-bold'>+18%</h2>
                        </div>
                        <h1 className='text-gray-500 text-left text-2xl font-extrabold'>$42.5k</h1>
                        <div className='flex justify-between mt-6'>
                            <h5 className='text-blue-500 text-sm'>
                                <ShoppingCartOutlinedIcon />
                                <span className='text-gray-500 '>Order</span>
                                <div className='mt-4 text-left '>
                                    <h3 className='text-lg text-gray-700 font-bold'>62.5%</h3>
                                    <h4 className='text-sm text-gray-500 '>5.02</h4>
                                </div>
                            </h5>
                            <h2 className='text-blue-500 text-sm'>
                                <span className='text-gray-500 '>Visits</span>
                                <LinkOutlinedIcon style={{ rotate: "145deg" }} />
                                <div className='mt-4 text-right '>
                                    <h3 className='text-lg text-gray-700 font-bold'>62.5%</h3>
                                    <h4 className='text-sm text-gray-500 '>5.02</h4>
                                </div>
                            </h2>

                        </div>
                        <div className="border border-blue-500 mt-4 rounded-lg h-[1rem] w-full relative">
                            <div className='bg-blue-500 absolute h-full rounded-lg' style={{ width: '50%' }}></div>
                        </div>

                    </div>
                </div>
                <div className='flex border border-gray-500 h-[15rem] w-[20rem] m-3 rounded-3 rounded-lg flex-wrap' >
                    <div className=' w-full h-[5rem] ms-6 mt-6 rounded-lg '>
                        <h4 className='text-green-700 text-left bg-green-500 h-[3rem] w-[3rem] rounded-full flex  items-center justify-center '>
                            <CasesOutlinedIcon />
                        </h4>
                        <div className='text-left'>
                            <h1 className='text-left text-gray-800 font-bold text-xl'>95.7k</h1>
                            <h5 className='text-sm text-gray-400'>Revenue Generated</h5>
                        </div>

                    </div>
                    <div className='h-[6rem] w-full m-3 overflow-y-hidden overflow-x-auto'>
                        <LineChart />
                    </div>
                </div>
            </div>
            <div className='flex'>
                <div className='flex border border-gray-500 h-[23rem] w-[40rem] m-3 flex-wrap rounded-lg'>
                    <div className='h-[2rem] w-full flex m-2 justify-between items-center'>
                        <div>
                            <h2 className='text-gray-500 text-xl font-semibold text-left'>Earning Reports</h2>
                            <h6 className='text-gray-500 text-sm text-left'>Weekly Earning Overview</h6>
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
                                {options.map((option) => (
                                    <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Menu>

                        </div>
                    </div>
                    <div className="flex h-[10rem] w-full m-1 justify-between">
                        <div className='w-1/4'>
                            <h1 className='text-left text-gray-600 font-extrabold text-[2rem] m-2'>$468</h1>
                            <h6 className='text-center text-gray-500 text-sm'>You informed of this week compared to last week</h6>
                        </div>
                        <div className='h-full w-3/4 m-1 overflow-x-auto overflow-y-hidden'>
                            <SimpleLineGraph />
                        </div>
                    </div>
                    <div className="flex border border-gray-500 h-[8rem] w-full ms-4 me-4 rounded-lg justify-evenly items-center p-2">
                        <div className='h-[rem] w-1/3 p-3'>
                            <div className='flex h-[2rem] w-full'>
                                <Box className="bg-blue-400 w-[1.5rem] h-[1.5rem] rounded-lg">
                                    <h3 className='text-blue-700 font-extrabold text-sm'>$</h3>
                                </Box>
                                <h4 className='text-gray-500 text-md font-bold ms-2'>Earning</h4>
                            </div>
                            <div>
                                <h1 className='text-gray-800 text-xl text-left font-bold'>
                                    $545.69
                                </h1>
                            </div>
                            <div className="border border-blue-500 mt-2 rounded-lg h-[0.5rem] w-full relative">
                                <div className='bg-blue-500 absolute h-[0.5rem] rounded-lg' style={{ width: '50%' }}></div>
                            </div>


                        </div>
                        <div className='h-[rem] w-1/3 p-3'>
                            <div className='flex h-[2rem] w-full'>
                                <Box className="bg-blue-400 w-[1.5rem] h-[1.5rem] rounded-lg">
                                    <h3 className='text-blue-700 font-extrabold text-sm'>$</h3>
                                </Box>
                                <h4 className='text-gray-500 text-md font-bold ms-2'>Earning</h4>
                            </div>
                            <div>
                                <h1 className='text-gray-800 text-xl text-left font-bold'>
                                    $545.69
                                </h1>
                            </div>
                            <div className="border border-blue-500 mt-2 rounded-lg h-[0.5rem] w-full relative">
                                <div className='bg-blue-500 absolute h-[0.5rem] rounded-lg' style={{ width: '50%' }}></div>
                            </div>


                        </div>
                        <div className='h-[rem] w-1/3 p-3'>
                            <div className='flex h-[2rem] w-full'>
                                <Box className="bg-blue-400 w-[1.5rem] h-[1.5rem] rounded-lg">
                                    <h3 className='text-blue-700 font-extrabold text-sm'>$</h3>
                                </Box>
                                <h4 className='text-gray-500 text-md font-bold ms-2'>Earning</h4>
                            </div>
                            <div>
                                <h1 className='text-gray-800 text-xl text-left font-bold'>
                                    $545.69
                                </h1>
                            </div>
                            <div className="border border-blue-500 mt-2 rounded-lg h-[0.5rem] w-full relative">
                                <div className='bg-blue-500 absolute h-[0.5rem] rounded-lg' style={{ width: '50%' }}></div>
                            </div>


                        </div>
                    </div>
                </div>
                <div className='flex border border-gray-500 h-[23rem] w-[40rem] m-3 rounded-lg flex-wrap' >
                    <div className='h-[2rem] w-full flex m-2 justify-between items-center'>
                        <div>
                            <h2 className='text-gray-500 text-xl font-semibold text-left'>Support Tracker</h2>
                            <h6 className='text-gray-500 text-sm text-left'> Last 7 days</h6>
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
                                {countryOptions.map((option) => (
                                    <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </div>
                    </div>
                    <div className='flex h-[18rem] w-full m-3'>
                        <div className=' w-1/3 h-[16rem] m-3'>
                            <div>
                                <h1 className='text-left text-2xl font-bold text-gray-700'>164</h1>
                                <h5 className='text-left text-md text-gray-500'>Total Tickets</h5>
                            </div>
                            <div className='p-2'>
                                <div className='h-[3rem] w-full flex '>
                                    <div className='flex '>
                                        <Box className="bg-blue-400 w-[2.5rem] h-[2.5rem] rounded-lg flex justify-center  items-center">
                                            <h3 className='text-blue-700 font-extrabold text-lg'>$</h3>
                                        </Box>
                                        <div>
                                            <h4 className='text-gray-500 ms-2'>Earning</h4>
                                            <h6 className='leading-[0.1rem] text-sm text-left m-2'>njb</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className='h-[3rem] w-full flex '>
                                    <div className='flex '>
                                        <Box className="bg-blue-400 w-[2.5rem] h-[2.5rem] rounded-lg flex justify-center  items-center">
                                            <h3 className='text-blue-700 font-extrabold text-lg'>$</h3>
                                        </Box>
                                        <div>
                                            <h4 className='text-gray-500 ms-2'>Earning</h4>
                                            <h6 className='leading-[0.1rem] text-sm text-left m-2'>njb</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className='h-[3rem] w-full flex '>
                                    <div className='flex '>
                                        <Box className="bg-blue-400 w-[2.5rem] h-[2.5rem] rounded-lg flex justify-center  items-center">
                                            <h3 className='text-blue-700 font-extrabold text-lg'>$</h3>
                                        </Box>
                                        <div>
                                            <h4 className='text-gray-500 ms-2'>Earning</h4>
                                            <h6 className='leading-[0.1rem] text-sm text-left m-2'>njb</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='border border-red-500 w-2/3 h-full'>

                        </div>
                    </div>
                </div>

            </div>
            <div className='flex'>
                <div className='flex border border-gray-500 h-[25rem] w-full m-3 rounded-lg' >
                    <div className='h-[2rem] w-full flex m-2 items-center flex-wrap'>
                        <div>
                            <h2 className='text-gray-500 text-xl font-semibold text-left'>Earning Reports</h2>
                            <h6 className='text-gray-500 text-sm text-left'>Weekly Earning Overview</h6>
                        </div>

                        <div className='h-[2rem] w-full m-2'>
                            <h5 className='text-left text-lg font-bold text-gray-600'>Filter:</h5>

                            <div className='flex flex-wrap'>
                                <h4 className='text-left text-gray-700 text-sm ms-3'>Select Sector:</h4>
                                {/* Filters */}
                                <div className='flex w-full h-[7rem] flex-start overflow-y-auto overflow-x-hidden'>
                                    {sectors.map(sector => (
                                        <SectorCheckbox
                                            key={sector}
                                            sector={sector}
                                            value={sector}
                                            selectedSector={selectedSector}
                                            handleSectorChange={handleSectorChange}
                                        />
                                    ))}
                                </div>
                                <h4 className='text-left text-gray-700 text-sm ms-3'>Select Sector:</h4>
                                <div className='flex w-full h-[7rem] flex-start overflow-y-auto overflow-x-hidden'>
                                    {sectors.map(sector => (
                                        <SectorCheckbox
                                            key={sector}
                                            sector={sector}
                                            value={sector}
                                            selectedSector={selectedSector}
                                            handleSectorChange={handleSectorChange}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=''>
                        {/* Pass selected filters as props to BarChart */}
                        <BarChart sector={selectedSector} topic={selectedTopic} />
                    </div>
                </div>
            </div>
            <div className='flex'>
                <div className='flex border border-gray-500 h-[30rem] w-full m-3 rounded-lg p-3 flex-wrap'>
                    <div className='h-[2rem] w-full flex m-2 justify-between items-center'>
                        <div>
                            <h2 className='text-gray-500 text-xl font-semibold text-left'>Support Tracker</h2>
                            <h6 className='text-gray-500 text-sm text-left'> Last 7 days</h6>
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
                                {countryOptions.map((option) => (
                                    <MenuItem key={option} selected={option === selectedCountry} onClick={() => handleCountrySelect(option)}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </div>
                    </div>
                    <div className='w-full flex justify-between items-center'>
                        <div className='w-[30rem] h-full m-4'>
                            <h2 className='text-gray-500 text-2xl font-bold text-left'>Select Country</h2>
                            <Select
                                value={selectedCountry}
                                onChange={(e) => handleCountrySelect(e.target.value)}
                                variant="outlined"
                                className='w-full'
                            >
                                <MenuItem selected>Select Country</MenuItem>
                                {countryOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                            <div>
                                {selectedCountry && (
                                    <div>
                                        {/* Render content for the selected country */}
                                        <h2>{selectedCountry}</h2>
                                        {/* Add more content here */}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='me-[3rem]'>
                            <CircularBarPlot selectedCountry={selectedCountry} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex'>
                <div className='flex border border-red-500 h-[25rem] w-full m-3 rounded-lg' >

                </div>


            </div>
        </div>
    );
};

export default Main;
