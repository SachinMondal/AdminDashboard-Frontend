import React, { useEffect } from 'react';
import CasesOutlinedIcon from '@mui/icons-material/CasesOutlined';
import LineChart from '../charts/LineChart';
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRelevanceData } from '../../state/RelevanceData/action';

const RelevanceData = () => {
    const dispatch = useDispatch();
    const data = useSelector((store) => store.relevance)

    useEffect(() => {
        dispatch(fetchRelevanceData());
    }, [dispatch]);

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
                {data.loading ? (
                    <div className="flex justify-center items-center w-full h-full">
                        <CircularProgress />
                    </div>
                ) : (
                    <LineChart data={data.relevanceData} />
                )}
            </div>
        </>
    );
};

export default RelevanceData;
