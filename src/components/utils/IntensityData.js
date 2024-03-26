import { Box, CircularProgress, IconButton, Menu, MenuItem } from '@mui/material'
import React, { useEffect } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SimpleLineGraph from '../charts/SimpleLineGraph'
import { useDispatch, useSelector } from 'react-redux';
import { fetchIntensityData } from '../../state/IntensityState/action';

const IntensityData = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const data = useSelector((store) => store.intensity);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        dispatch(fetchIntensityData());
    }, [dispatch]);


    return (
        <>
            <div className='h-[2rem] w-full flex m-2 justify-between items-center overflow-hidden'>
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

            {data.loading ? (
                <div className="flex justify-center items-center w-full h-[8rem]">
                    <CircularProgress />
                </div>
            ) : (
                <div className="flex h-[10rem] w-full m-1 justify-evenly flex-wrap">
                    <div className='h-[2rem] w-full lg:w-1/5'>
                        <h1 className='text-left text-gray-600 font-extrabold text-[2rem] m-1'>1k</h1>
                        <h6 className='text-center text-gray-500 lg:text-sm sm:text-xs'>You informed about the intensity of the datas</h6>
                    </div>

                    <div className='h-full w-[22rem] mt-3 mb-2 overflow-x-auto overflow-y-hidden lg:w-[29rem]'>
                        <SimpleLineGraph data={data.filteredData} />
                    </div>

                </div>
            )}
            <div className="flex border border-gray-500 h-[8rem] w-full ms-4 me-4 rounded-lg justify-evenly items-center p-2 overflow-x-auto overflow-y-hidden mt-8">
                {Object.entries(data.intensityCount).map(([intensity, count]) => (
                    <div className='lg:w-1/3 p-3 w-[8rem]' key={intensity}>
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
                            <div className='bg-blue-500 absolute h-[0.5rem] rounded-lg' style={{ width: `${(count / data.maxCount) * 100}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>




        </>
    )
}
export default IntensityData;
