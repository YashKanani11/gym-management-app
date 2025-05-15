import React, { useEffect, useState } from 'react'
import axios from 'axios'
const ListTileMembTrainer = ({ activeMembPage, refreshOn }) => {
    const [membersData, setMembersData] = useState([]);
    const [trainersData, setTrainersData] = useState([])
    useEffect(() => {
        fetchMembers()
        fetchTrainers()
    }, [refreshOn])
    const fetchMembers = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/fetch/members', {
                withCredentials: true,
            })
            if (res.status == 200) {
                console.log(res.data.data)
                setMembersData(res.data.data)
            }
            else {
                console.log(res)
            }
        } catch (error) {
            console.log("Error fetching members in frontned", error)
        }
    }
    const fetchTrainers = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/fetch/trainers', {
                withCredentials: true,
            })
            if (res.status == 200) {
                console.log(res.data.data)
                setTrainersData(res.data.data)
            }
            else {
                console.log(res)
            }
        } catch (error) {
            console.log("Error fetching trainers in frontned", error)
        }
    }
    useEffect(() => {
        fetchMembers()
        fetchTrainers()
    }, [])


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
    const date = new Date(data.membEndDate)
    const formatedDate = date.toLocaleDateString("en-GB")

    return (
        <div className='grid grid-cols-4 text-[10px] md:text-xl gap-1 py-4 hover:bg-black/70 hover:text-white group cursor-pointer'>
            <h2 className='text-center col-span-1 border-r flex flex-wrap items-center justify-center'><p className='hidden md:flex text-black group-hover:text-white' >{activeMembPage ? data.memberID : data.trainerID} . </p> {data.name}</h2>
            <h2 className='text-center col-span-1 border-r flex items-center justify-center'>{activeMembPage ? data.membType : data.noOfTrainees || "0"}</h2>
            <h2 className={`text-center col-span-1 border-r flex items-center justify-center ${new Date().getDate() > formatedDate && 'text-red-600 bg-red-200'} ${!activeMembPage && new Date().getDate() > formatedDate && 'text-red-600 bg-red-200'}`}>{activeMembPage ? formatedDate : data.salaryDue}</h2>
            <h2 className='text-center col-span-1 flex items-center justify-center'>{activeMembPage ? data.workoutType : data.grade || "Not graded yet"}</h2>
        </div>
    )
}

export default ListTileMembTrainer

