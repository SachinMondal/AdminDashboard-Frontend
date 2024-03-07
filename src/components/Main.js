import React from 'react';
import Crousel from './utils/Crousel';
import Sales from './utils/Sales';
import RelevanceData from './utils/RelevanceData';
import IntensityData from './utils/IntensityData';
import YearData from './utils/YearData';
import RegionData from './utils/RegionData';
import CountryData from './utils/CountryData';



const Main = () => {








    return (
        <div className='overflow-hidden overflow-x-hidden'>
            <div className='flex flex-wrap m-2 lg:flex-nowrap lg:m-0'>

                <div className='flex border h-[15rem] w-full rounded-lg lg:w-1/2 lg:m-3'  >
                    <Crousel />
                </div>

                <div className='flex border border-gray-500 h-[15rem] w-full rounded-lg mt-2 mb-2 lg:w-1/4 lg:m-3' >
                    <Sales />
                </div>

                <div className='flex border border-gray-500 h-[15rem] w-full rounded-lg lg:w-1/4 lg:m-3 flex-wrap' >
                    <RelevanceData />
                </div>

            </div>



            <div className='flex flex-wrap m-3 lg:m-0 lg:flex-nowrap'>

                <div className='flex border border-gray-500 h-[26rem]  w-full flex-wrap rounded-lg mt-2 mb-2 lg:w-1/2 lg:m-3'>
                    <IntensityData />
                </div>



                <div className='flex border border-gray-500 h-[44rem] lg:h-[26rem] w-full rounded-lg flex-wrap mt-2 mb-2 lg:w-1/2 lg:m-3' >
                    <YearData />
                </div>

            </div>




            <div className='flex flex-wrap m-3 lg:m-0 lg:flex-nowrap'>
                <RegionData />
            </div>




            <div className='flex flex-wrap m-3 lg:m-0 lg:flex-nowrap'>
                <CountryData />
            </div>

        </div>
    );
};

export default Main;
