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
        <div>
            <div className='flex '>

                <div className='flex border h-[15rem] w-[40rem] m-3 rounded-lg'  >
                    <Crousel />
                </div>

                <div className='flex border border-gray-500 h-[15rem] w-[20rem] m-3 rounded-3 rounded-lg' >
                    <Sales />
                </div>

                <div className='flex border border-gray-500 h-[15rem] w-[20rem] m-3 rounded-3 rounded-lg flex-wrap ' >
                    <RelevanceData />
                </div>

            </div>



            <div className='flex'>

                <div className='flex border border-gray-500 h-[23rem] w-[40rem] m-3 flex-wrap rounded-lg'>
                    <IntensityData />
                </div>



                <div className='flex border border-gray-500 h-[23rem] w-[40rem] m-3 rounded-lg flex-wrap' >
                    <YearData />
                </div>

            </div>




            <div className='flex'>
                <RegionData />
            </div>




            <div className='flex'>
                <CountryData />
            </div>

        </div>
    );
};

export default Main;
