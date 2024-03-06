import React, { useState, useEffect } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PieChart from '../charts/PieChart';
import SectorCheckbox from './CheckBox';

const YearData = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [yearsData, setYearsData] = useState({});
    const [selectedYear, setSelectedYear] = useState('');
    const [loading, setLoading] = useState(true);
    const open = Boolean(anchorEl);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/filterData?startYear=`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();
            const filteredData = jsonData.filter(item => item.start_year !== null);
            const processedData = processData(filteredData);
            setYearsData(processedData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const processData = (data) => {
        const startYearCounts = {};
        data.forEach(item => {
            const startYear = item.start_year;
            // Check if start year is not null and not an empty string
            if (startYear !== null && startYear !== '') {
                startYearCounts[startYear] = startYearCounts[startYear] ? startYearCounts[startYear] + 1 : 1;
            }
        });
        return startYearCounts;
    };



    const handleYearChange = (selectedYear) => {
        setSelectedYear(selectedYear);
    };

    return (
        <>
            <div className='h-[2rem] w-full flex m-2 justify-between items-center'>
                <div>
                    <h2 className='text-gray-500 text-xl font-semibold text-left'>Start Year</h2>
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
            {loading ? (
                <div className='flex justify-center items-center'>Loading...</div>
            ) : (
                <div className='flex h-[18rem] w-full m-3'>
                    <div className=' w-1/3 h-[16rem] m-3 overflow-x-hidden overflow-y-auto'>
                        {Object.keys(yearsData).map(year => (
                            <div key={year}>
                                <SectorCheckbox
                                    sector={year}
                                    value={year}
                                    selectedSector={selectedYear}
                                    handleSectorChange={handleYearChange}
                                />
                            </div>
                        ))}
                    </div>
                    <div className='w-2/3 h-full'>
                        <PieChart selectedYear={selectedYear} yearData={yearsData} />
                    </div>
                </div>
            )}
        </>
    );
};

export default YearData;
