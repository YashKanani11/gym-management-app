import React from 'react'
import { FaArrowRight } from "react-icons/fa";
const AddNewData = ({ activeMembPage, open }) => {
    return (
        <>
            {/* Mobile Version */}
            <div onClick={() => open(true)} title={`Add new `} className='md:hidden border-black border-4 hover:border-white/60 shadow-lg shadow-[#d4ff00e2]/40 hover:shadow-[#d4ff00e2] w-[190px] flex items-center justify-around fixed bottom-[13%] left-1/2 -translate-x-1/2 bg-[#d4ff00e2] px-3 py-1 rounded-full group  cursor-pointer'>
                Add New {activeMembPage ? "Member" : "Trainer"}
                <FaArrowRight className='relative group-hover:scale-110 group-hover:translate-x-2.5 ' />
            </div>
            {/* Desktop Version */}
            <div onClick={() => open(true)} className='hidden hover:border-white/60 hover:shadow-[#d4ff00e2] font-semibold border-black border-4 shadow-2xl shadow-[#d4ff00e2]/80 w-[100px] h-[100px] md:flex items-center justify-around fixed bottom-[13%] right-2 -translate-x-1/2 bg-[#d4ff00e2] px-3 py-1 rounded-full group cursor-pointer'>
                Add New {activeMembPage ? "Member" : "Trainer"}
                <FaArrowRight className='shadow-xl border-2 border-[#d4ff00e2] shadow-black w-[50px] h-[50px] rounded-full absolute -bottom-6 -right-2 p-2 bg-black text-white transition-all group-hover:translate-x-2.5 group-active:scale-90' />
            </div>
        </>
    )
}

export default AddNewData