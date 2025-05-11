import React from 'react'

const DataViewComponent = ({ title, component }) => {
    return (
        <div className='w-full justify-center flex'>
            <div className='min-w-[130px] min-h-[130px] w-[55%] md:w-[80%] aspect-square border-2 rounded-3xl bg-white bg-opacity-50 flex flex-col overflow-hidden'>
                <div className='md:border-b-[6px] border-b-[3px] md:px-6  px-3 py-1 border-[#d4ff00e2] md:h-[20%] flex items-center' >
                    <h2 className='text-sm md:text-2xl h-fit'>{title}</h2>
                </div>
                <div className='flex-1 overflow-y-auto overflow-x-visible'>{component}</div>
            </div>
        </div>
    )
}

export default DataViewComponent