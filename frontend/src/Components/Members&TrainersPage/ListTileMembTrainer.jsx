import React, { useState } from 'react'

const ListTileMembTrainer = () => {
    const [data, setData] = useState([
        {
            id: 1,
            name: "dummyMemb1",
            membType: "3 Months",
            dueDate: 17,
            workoutType: "Lean body psnd hai"
        },
        {
            id: 2,
            name: "dummyMemb2",
            membType: "1 Month",
            dueDate: 25,
            workoutType: "Weight gain chahida"
        },
        {
            id: 3,
            name: "dummyMemb3",
            membType: "6 Months",
            dueDate: 5,
            workoutType: "Powerlifting"
        },
        {
            id: 4,
            name: "dummyMemb4",
            membType: "3 Months",
            dueDate: 12,
            workoutType: "Fat loss"
        },
        {
            id: 5,
            name: "dummyMemb5",
            membType: "1 Year",
            dueDate: 30,
            workoutType: "General fitness"
        },
        {
            id: 6,
            name: "dummyMemb6",
            membType: "1 Month",
            dueDate: 3,
            workoutType: "Cardio aur stamina"
        },
        {
            id: 7,
            name: "dummyMemb7",
            membType: "6 Months",
            dueDate: 19,
            workoutType: "Muscle gain"
        },
        {
            id: 8,
            name: "dummyMemb8",
            membType: "3 Months",
            dueDate: 11,
            workoutType: "Strength training"
        },
        {
            id: 9,
            name: "dummyMemb9",
            membType: "1 Year",
            dueDate: 27,
            workoutType: "Weight loss aur cutting"
        },
        {
            id: 10,
            name: "dummyMemb10",
            membType: "1 Month",
            dueDate: 7,
            workoutType: "Full body functional"
        }
    ]);
    return (<section className='h-screen md:h-[80%] w-full flex justify-center md:mt-[7%] md:absolute dark:bg-transparent bg-white/90'>
        <div className='h-[85%] md:h-[100%] w-[95%] dark:bg-linear-to-b dark:from-white/50 md:via-white/50 dark:to-black/70 bg-linear-to-b from-white to-black/40 rounded-b-full md:rounded-2xl dark:bg-white/20 shadow-white'>
            <div className='w-full h-[90%] overflow-y-scroll px-2'>
                <div className='grid grid-cols-4 text-[10px] md:text-2xl gap-1 py-4 border-b-2 sticky top-0 z-10 bg-[#777777]'>
                    <h2 className='text-center col-span-1 border-r flex items-center justify-center'>Name</h2>
                    <h2 className='text-center col-span-1 border-r flex items-center justify-center'>Membership Type</h2>
                    <h2 className='text-center col-span-1 border-r flex items-center justify-center'>Due Date</h2>
                    <h2 className='text-center col-span-1 flex items-center justify-center'>Workout Type</h2>
                </div>
                {data?.map((e, i) => (
                    <IndivisualMemebTrainer key={e.id || i} data={e} />
                ))}
            </div>
        </div>

    </section>)
}


const IndivisualMemebTrainer = ({ data }) => {
    return (
        <div className='grid grid-cols-4 text-[10px] md:text-xl gap-1 py-4 hover:bg-black/70 hover:text-white group cursor-pointer'>
            <h2 className='text-center col-span-1 border-r flex flex-wrap items-center justify-center'><p className='hidden md:flex text-black group-hover:text-white' >{data.id} . </p> {data.name}</h2>
            <h2 className='text-center col-span-1 border-r flex items-center justify-center'>{data.membType}</h2>
            <h2 className={`text-center col-span-1 border-r flex items-center justify-center ${new Date().getDate() > data.dueDate && 'text-red-600 bg-red-200'}`}>{data.dueDate}</h2>
            <h2 className='text-center col-span-1 flex items-center justify-center'>{data.workoutType}</h2>
        </div>
    )
}

export default ListTileMembTrainer

