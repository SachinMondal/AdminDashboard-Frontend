import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Menu, MenuItem, CircularProgress } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircularBarPlot from '../charts/CircularBarPlot';
import { fetchCountryData } from '../../state/CountryState/action';
import SectorCheckbox from './CheckBox';



const CountryData = () => {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);

    const dispatch = useDispatch();
    const data = useSelector((store) => store.country);


    useEffect(() => {
        dispatch(fetchCountryData());
    }, [dispatch]);


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

    return (
        <div className='flex flex-col md:flex-row border border-gray-500 h-auto w-full rounded-lg p-3 md:flex-wrap lg:m-3'>
            <div className='w-full md:w-full flex flex-row justify-between items-start mb-4 md:mb-0'>
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
            <div className='w-full md:w-full flex flex-col md:flex-row justify-between items-start md:flex-nowrap'>
                <h2 className='text-gray-500 text-2xl font-bold'>Select Country</h2>
                {data.countryLoading ? (
                    <div className="flex justify-center items-center w-full h-[8rem]">
                        <CircularProgress />
                    </div>
                ) : (
                    <div className='w-full md:w-[30rem] h-[22rem] m-4 overflow-x-hidden overflow-y-auto'>
                        {data?.countryData?.map((item) => (
                            <div key={item._id} className="flex items-center">
                                <SectorCheckbox
                                    sector={item.country}
                                    value={item.country}
                                    selectedSector={selectedCountry}
                                    handleSectorChange={handleCountrySelect}
                                />

                            </div>
                        ))}
                    </div>
                )}

                <div className='me-[3rem]'>
                    <CircularBarPlot selectedCountry={selectedCountry} data={data.countryDictionary} />
                </div>
            </div>
        </div>
    );
};

export default CountryData;