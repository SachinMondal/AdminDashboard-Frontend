import React, { useState, useEffect } from 'react';
import { IconButton, Menu, MenuItem, Checkbox, CircularProgress } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircularBarPlot from '../charts/CircularBarPlot';

const CountryData = () => {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [countries, setCountries] = useState([]);
    const [fetchedData, setFetchedData] = useState([]);
    const [isLoading, setIsLoading] = useState([]);
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

    const API = "http://localhost:5000";
    const fetchDataFromAPI = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API}/filterData?country=`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            // Filter out null or empty country values and extract unique countries
            const uniqueCountries = [...new Set(data.map(item => item.country))].filter(country => country);

            return { countries: uniqueCountries, data };
        } catch (error) {
            console.error('Error fetching data:', error);
            return { countries: [], data: [] };
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDataFromAPI().then(({ countries, data }) => {
            setCountries(countries);
            setFetchedData(data);
        });
    }, []);

    return (
        <div className='flex border border-gray-500 h-[30rem] w-full m-3 rounded-lg p-3 flex-wrap'>
            <div className='h-[2rem] w-full flex m-2 justify-between items-center'>
                <div>
                    <h2 className='text-gray-500 text-xl font-semibold text-left'>Country Tracker</h2>
                    <h6 className='text-gray-500 text-sm text-left'>All the Listed Countries</h6>
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
            <div className='w-full flex justify-between items-center text-wrap'>
                <h2 className='text-gray-500 text-2xl font-bold text-left h-full'>Select Country</h2>
                {isLoading ? (
                    <div className="flex justify-center items-center w-full h-[8rem]">
                        <CircularProgress />
                    </div>
                ) : (
                    <div className='w-[30rem] h-[22rem] m-4 overflow-x-hidden overflow-y-auto'>
                        {countries.map((country) => (
                            <div key={country} className="flex items-center">
                                <Checkbox
                                    checked={selectedCountry === country}
                                    onChange={() => handleCountrySelect(country)}
                                />
                                <span>{country}</span>
                            </div>
                        ))}
                    </div>
                )}

                <div className='me-[3rem]'>
                    <CircularBarPlot selectedCountry={selectedCountry} data={fetchedData} />
                </div>
            </div>
        </div>
    );
};

export default CountryData;
