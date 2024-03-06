import React, { useState, useEffect } from 'react';
import BarChart from '../charts/Barchart';
import SectorCheckbox from './CheckBox';

const RegionData = () => {
    const [selectedSector, setSelectedSector] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');
    const [sectors, setSectors] = useState([]);
    const [topicsBySector, setTopicsBySector] = useState({});
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Set loading to true when fetching data
            try {
                const url = 'http://localhost:5000/filterData?';
                const params = [];
                if (selectedSector) {
                    params.push(`sector=${encodeURIComponent(selectedSector)}`);
                }
                if (selectedTopic) {
                    params.push(`topic=${encodeURIComponent(selectedTopic)}`);
                }
                const queryParams = params.join('&');

                const response = await fetch(url + queryParams);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Set loading to false when data fetching is complete
            }
        };

        fetchData();
    }, [selectedSector, selectedTopic]);

    useEffect(() => {
        // Extract unique sectors from data and filter out null values
        const uniqueSectors = [...new Set(data.map(item => item.sector))].filter(sector => sector !== null);
        setSectors(uniqueSectors);

        // Filter out null values for each specific sector and create arrays of unique topics
        const topics = {};
        uniqueSectors.forEach(sector => {
            const topicsForSector = [...new Set(data.filter(item => item.sector === sector && item.topic).map(item => item.topic))];
            topics[sector] = topicsForSector;
        });
        setTopicsBySector(topics);
    }, [data]);

    const handleSectorChange = (sector) => {
        setSelectedSector(sector);
        setSelectedTopic('');
    };

    return (
        <div className='flex border border-gray-500 h-[25rem] w-full m-3 rounded-lg'>
            <div className='h-[2rem] w-full flex m-2 items-center flex-wrap'>
                <div>
                    <h2 className='text-gray-500 text-xl font-semibold text-left'>Earning Reports</h2>
                    <h6 className='text-gray-500 text-sm text-left'>Weekly Earning Overview</h6>
                </div>

                <div className='h-[2rem] w-full m-2'>
                    <h5 className='text-left text-lg font-bold text-gray-600'>Filter:</h5>

                    <div className='flex flex-wrap  w-[20rem] h-[18rem]'>
                        <div>
                            <h4 className='text-left text-gray-700 text-sm ms-3'>Select Sector:</h4>
                            {/* Filters */}
                            <div className='grid grid-cols-2 gap-2 w-full overflow-x-hidden overflow-y-auto h-[7rem]'>
                                {loading ? (
                                    <p>Loading...</p>
                                ) : (
                                    sectors.map(sector => (
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
                            <>
                                <div className=' h-[9rem] overflow-x-hidden overflow-y-auto'>
                                    <h4 className='text-left text-gray-700 text-sm ms-3'>Select Topic:</h4>
                                    <div className='grid grid-cols-2 gap-2 w-full overflow-x-auto'>
                                        {loading ? (
                                            <p>Loading...</p>
                                        ) : (
                                            topicsBySector[selectedSector].map(topic => (
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
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className=''>
                {/* Pass selected filters as props to BarChart */}
                <BarChart sector={selectedSector} topic={selectedTopic} data={data} />
            </div>
        </div>
    );
};

export default RegionData;
