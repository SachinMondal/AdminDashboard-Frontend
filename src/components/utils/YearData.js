import React, { useState, useEffect } from 'react';
import { CircularProgress, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PieChart from '../charts/PieChart';
import SectorCheckbox from './CheckBox';
import { useDispatch, useSelector } from 'react-redux';
import { fetchingYearData } from '../../state/YearState/action';

const YearData = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedYear, setSelectedYear] = useState('');
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const data = useSelector((store) => store.year);

    useEffect(() => {
        dispatch(fetchingYearData({ selectedYear }));
    }, [selectedYear, dispatch]);;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleYearChange = (selectedYear) => {
        setSelectedYear(selectedYear);
    };

    return (
        <div className="w-full overflow-hidden relative">
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
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        getContentAnchorEl={null}
                        elevation={0}
                    >
                        <MenuItem key="1" onClick={handleClose}>View</MenuItem>
                        <MenuItem key="2" onClick={handleClose}>Link</MenuItem>
                        <MenuItem key="3" onClick={handleClose}>View</MenuItem>
                    </Menu>
                </div>
            </div>
            {data.loading ? (
                <div className="flex justify-center items-center w-full h-full">
                    <CircularProgress />
                </div>
            ) : (
                <div className='flex flex-col md:flex-row'>
                    <div className='w-full md:w-1/3 h-[20rem] overflow-x-hidden overflow-y-auto m-3'>
                        {Object.keys(data.yearData).map(year => (
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
                    <div className='w-full md:w-2/3 h-[16rem] flex justify-center'>
                        <PieChart selectedYear={selectedYear} yearData={data.yearData} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default YearData;
