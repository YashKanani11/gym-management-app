import React from 'react'
import { FaUserAlt } from "react-icons/fa";
const Profile = ({ src, name = "User Name" }) => {
    return (
        <div className='pt-1'>
            <div className='w-full justify-end flex'>
                <div className='max-w-[250px] w-[35%] border-2 md:mt-4 mt-2 md:me-4 me-2 rounded-full flex justify-between bg-gradient-to-r from-black via-[rgba(214,255,0,0.1)] via-65% to-white overflow-hidden'>
                    <div className='overflow-hidden md:h-[80px] md:w-[80px] h-[40px] w-[40px] rounded-full text-white'>
                        {src ? <img src={src} /> : <FaUserAlt className='w-full h-full' />}
                    </div>
                    <div className='md:pe-4 pe-2 flex items-center text-center text-[#d6ff00] md:text-[15px] text-[10px] flex-1'>
                        <h2 className='w-full'>{name}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile