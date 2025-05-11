import React from 'react'
import { useNavigate } from 'react-router-dom'
const BottomNav = () => {
    const navigate = useNavigate()
    return (
        <div className='fixed bottom-0 h-[10%] border-t-4 md:border-t-8 border-[#d4ff00e2] w-full rounded-tl-3xl rounded-tr-3xl flex text-center items-center justify-center'>
            <div title='Members & Trainers Page' onClick={navigate('/memebrs&trainers')} className='font-joan text-xl md:text-4xl text-shadow-lg text-shadow-[#d4ff00e2] dark:text-white text-black font-semibold tracking-wide cursor-pointer active:scale-110'>Manage Members & Trainers</div>
        </div>
    )
}

export default BottomNav