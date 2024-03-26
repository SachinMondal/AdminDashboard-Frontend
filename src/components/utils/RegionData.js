import React, { useState, useEffect } from 'react';
import BarChart from '../charts/Barchart';
import SectorCheckbox from './CheckBox';
import { CircularProgress } from '@mui/material';
import { fetchRegionData } from '../../state/RegionState/action';
import { useDispatch, useSelector } from 'react-redux';

const RegionData = () => {
    const [selectedSector, setSelectedSector] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');
    const dispatch = useDispatch();
    const data = useSelector((store) => store.region);



    useEffect(() => {
        dispatch(fetchRegionData({ selectedSector, selectedTopic }));
    }, [dispatch, selectedSector, selectedTopic]);

    const handleSectorChange = (sector) => {
        setSelectedSector(sector);
        setSelectedTopic('');
    };



    return (
        <div className='flex border border-gray-500 h-[50rem] lg:h-[25rem] w-full lg:m-4 rounded-lg flex-wrap lg:flex-nowrap lg:w-full'>
            <div className='h-[2rem] w-full flex m-2 items-center flex-wrap lg:w-1/3'>
                <div>
                    <h2 className='text-gray-500 text-xl font-semibold text-left'>Sector Reports</h2>
                    <h6 className='text-gray-500 text-sm text-left'>Sector wise & Topic wise Overview</h6>
                </div>

                <div className='h-[2rem] w-full m-2'>
                    <h5 className='text-left text-lg font-bold text-gray-600'>Filter:</h5>

                    <div className='flex flex-wrap  w-[20rem] h-[18rem]'>
                        <div>
                            <h4 className='text-left text-gray-700 text-sm ms-3'>Select Sector:</h4>
                            {/* Filters */}
                            <div className='grid grid-cols-2 gap-2 w-full overflow-x-hidden overflow-y-auto max-h-[7rem]'>
                                {data.loading ? (
                                    <p>Loading...</p>
                                ) : (
                                    data.sectorData.map(sector => (
                                        <SectorCheckbox
                                            key={sector}
                                            sector={sector}
                                            value={sector}
                                            selectedSector={selectedSector}
                                            handleSectorChange={handleSectorChange}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                        {selectedSector && (

                            <div className=' h-[9rem]'>
                                <h4 className='text-left text-gray-700 text-sm ms-3'>Select Topic:</h4>
                                <div className='grid grid-cols-2 gap-2 w-full max-h-[9rem] overflow-x-auto'>
                                    {data.loading ? (
                                        <p>Loading...</p>
                                    ) : (
                                        data.topicData[selectedSector].map(topic => (
                                            <SectorCheckbox
                                                key={topic}
                                                sector={topic}
                                                value={topic}
                                                selectedSector={selectedTopic}
                                                handleSectorChange={() => setSelectedTopic(topic)}
                                            />
                                        ))
                                    )}
                                </div>
                            </div>

                        )}
                    </div>
                </div>
            </div>
            <div className='mt-[22rem] lg:mt-0 w-full overflow-x-auto'>
                {data.loading ? (
                    <div className="flex justify-center items-center w-full h-full">
                        <CircularProgress />
                    </div>
                ) : (
                    <BarChart sector={selectedSector} topic={selectedTopic} data={data.regionData} />
                )}
            </div>
        </div>
    );
};

export default RegionData;
