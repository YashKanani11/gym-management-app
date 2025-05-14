import React, { useState } from 'react'

const ListTileMembTrainer = ({ activeMembPage }) => {
    const [membersData, setMembersData] = useState([
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
    const [trainersData, setTrainersData] = useState([
        {
            id: 1,
            name: "trainer1",
            noOfTrainees: 5,
            salaryDue: 10000,
            dueOn: 15,
            grade: "A"
        },
        {
            id: 2,
            name: "trainer2",
            noOfTrainees: 8,
            salaryDue: 12000,
            dueOn: 20,
            grade: "B"
        },
        {
            id: 3,
            name: "trainer3",
            noOfTrainees: 3,
            salaryDue: 8000,
            dueOn: 5,
            grade: "C"
        },
        {
            id: 4,
            name: "trainer4",
            noOfTrainees: 10,
            salaryDue: 15000,
            dueOn: 25,
            grade: "A"
        },
        {
            id: 5,
            name: "trainer5",
            noOfTrainees: 6,
            salaryDue: 9500,
            dueOn: 12,
            grade: "B"
        },
        {
            id: 6,
            name: "trainer6",
            noOfTrainees: 4,
            salaryDue: 7000,
            dueOn: 7,
            grade: "C"
        },
        {
            id: 7,
            name: "trainer7",
            noOfTrainees: 9,
            salaryDue: 13000,
            dueOn: 19,
            grade: "A"
        },
        {
            id: 8,
            name: "trainer8",
            noOfTrainees: 2,
            salaryDue: 6000,
            dueOn: 4,
            grade: "C"
        },
        {
            id: 9,
            name: "trainer9",
            noOfTrainees: 7,
            salaryDue: 11000,
            dueOn: 27,
            grade: "B"
        },
        {
            id: 10,
            name: "trainer10",
            noOfTrainees: 5,
            salaryDue: 10000,
            dueOn: 17,
            grade: "B"
        }
    ]);

    const data = activeMembPage ? membersData : trainersData;
    return (<section className='h-screen md:h-[80%] w-full flex justify-center md:mt-[20%] lg:mt-[20%] xl:mt-[10%] md:absolute dark:bg-transparent bg-white/90 backdrop-blur-sm'>
        <div className='h-[85%] md:h-[100%] w-[95%] dark:bg-linear-to-b dark:from-white/50 md:via-white/50 dark:to-black/70 bg-linear-to-b from-white to-black/40 rounded-b-full md:rounded-2xl dark:bg-white/20 shadow-white'>
            <div className='w-full h-[90%] overflow-y-scroll px-2'>
                <div className='grid grid-cols-4 text-[10px] md:text-2xl gap-1 py-4 border-b-2 sticky top-0 z-10 bg-[#777777]'>
                    <h2 className='text-center col-span-1 border-r flex items-center justify-center'>Name</h2>
                    <h2 className='text-center col-span-1 border-r flex items-center justify-center'>{activeMembPage ? "Membership type" : "Trainees count"}</h2>
                    <h2 className='text-center col-span-1 border-r flex items-center justify-center'>{activeMembPage ? "Due Date" : "Salary Due"}</h2>
                    <h2 className='text-center col-span-1 flex items-center justify-center'>{activeMembPage ? "Workout Type" : "Grade"}</h2>
                </div>
                {data?.map((e, i) => (
                    <IndivisualMemebTrainer key={e.id || i} data={e} activeMembPage={activeMembPage} />
                ))}
            </div>
        </div>

    </section>)
}


const IndivisualMemebTrainer = ({ data, activeMembPage }) => {
    return (
        <div className='grid grid-cols-4 text-[10px] md:text-xl gap-1 py-4 hover:bg-black/70 hover:text-white group cursor-pointer'>
            <h2 className='text-center col-span-1 border-r flex flex-wrap items-center justify-center'><p className='hidden md:flex text-black group-hover:text-white' >{data.id} . </p> {data.name}</h2>
            <h2 className='text-center col-span-1 border-r flex items-center justify-center'>{activeMembPage ? data.membType : data.noOfTrainees}</h2>
            <h2 className={`text-center col-span-1 border-r flex items-center justify-center ${new Date().getDate() > data.dueDate && 'text-red-600 bg-red-200'} ${!activeMembPage && new Date().getDate() > data.dueOn && 'text-red-600 bg-red-200'}`}>{activeMembPage ? data.dueDate : data.salaryDue}{!activeMembPage && ` on ${data.dueOn}`}</h2>
            <h2 className='text-center col-span-1 flex items-center justify-center'>{activeMembPage ? data.workoutType : data.grade}</h2>
        </div>
    )
}

export default ListTileMembTrainer

