import React, { useState, useEffect } from 'react';
import CasesOutlinedIcon from '@mui/icons-material/CasesOutlined';
import LineChart from '../charts/LineChart';
import { CircularProgress } from '@mui/material';

const RelevanceData = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const API = "http://localhost:5000";

    const fetchData = async () => {
        try {
            const response = await fetch(`${API}/filterData?rel=`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();
            setData(jsonData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className=' w-full h-[5rem] ms-6 mt-6 rounded-lg '>
                <h4 className='text-green-700 text-left bg-green-500 h-[3rem] w-[3rem] rounded-full flex  items-center justify-center '>
                    <CasesOutlinedIcon />
                </h4>
                <div className='text-left'>
                    <h1 className='text-left text-gray-800 font-bold text-xl'>1k</h1>
                    <h5 className='text-sm text-gray-400'>Relevance</h5>
                </div>
            </div>
            <div className='h-[6rem] w-full m-3 overflow-y-hidden overflow-x-auto'>
                {loading ? (
                    <div className="flex justify-center items-center w-full h-full">
                        <CircularProgress />
                    </div>
                ) : (
                    <LineChart data={data} />
                )}
            </div>
        </>
    );
};

export default RelevanceData;
