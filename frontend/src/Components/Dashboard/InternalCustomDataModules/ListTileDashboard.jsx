import React from 'react'

const ListTileDashboard = ({ listData }) => {
    if (listData) return (<>
        <div className='w-full flex justify-center items-center flex-col'>
            {listData.map((e, i) => (
                <div key={e.id || i} className='w-[90%] flex justify-center py-1'>
                    <ListEntry index={i + 1} entryData={e} />
                </div>
            ))}

        </div>
    </>)


}

const ListEntry = ({ index, entryData }) => {
    return (
        <div className='flex justify-between w-full border-b-2'>
            <p className='text-[10px] md:text-base'><span>{index} </span> {entryData.name}</p><p className={`text-[9px] md:text-base ${parseInt(entryData.value) >= 10 ? 'text-red-600' : parseInt(entryData.value) < 5 ? 'text-green-600' : ''}
 `}>{entryData.value}</p>
        </div>

    )
}
export default ListTileDashboard