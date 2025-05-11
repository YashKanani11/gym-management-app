import React from 'react'
import input from '../../assets/email input.png'
import { TiMail } from "react-icons/ti";
import { RiLockPasswordLine, RiLockPasswordFill } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom'

const InputBox = ({ boxHeight, inputType, onChange, isLogin, onSubmit, passMatchErr, mailError, switchError }) => {
    const customBoxHeight = `md:h-[${Number(boxHeight.match(/\d+/)[0]) + 5}]`
    const navigate = useNavigate()

    return (
        <form className={`absolute bottom-0 w-full  border-t-[5px] border-l-[3px] border-r-[3px] max-w-[600px] border-black ${customBoxHeight} ${boxHeight} rounded-3xl rounded-bl-none rounded-br-none flex flex-col justify-around max-h-[300px]`}>
            {inputType.includes('email') && <InputFeild onChange={onChange} placeholder={"Email"} name={'mailID'} icon={<TiMail />} errorMessage={mailError && "Please enter valid E-mail ID"} />}

            {inputType.includes('userName') && <InputFeild onChange={onChange} placeholder={"User Name"} name={'userName'} icon={<MdOutlineDriveFileRenameOutline />} />}

            {inputType.includes('password') && <InputFeild onChange={onChange} placeholder={"Password"} name={'password'} icon={<RiLockPasswordLine />} />}

            {inputType.includes('confirmPassword') && <InputFeild onChange={onChange} placeholder={"Confirm Password"} name={'confirmPassword'} icon={<RiLockPasswordFill />} errorMessage={passMatchErr && "Confirm Password should match Password"} />}

            <div className='w-[80%] flex justify-between relative left-1/2 -translate-x-1/2'>
                <div
                    title={isLogin ? "Signup" : "Login"}
                    className={`flex items-center justify-center px-3 w-[160px] h-[60px] rounded-full transition-all border-2 ${switchError ? " border-red-600 bg-red-800 scale-110" : " border-purple-600 bg-[#d6ff00]"} font-extrabold text-shadow-lg text-sm/loose text-center cursor-pointer`}>
                    <p onClick={() => navigate(isLogin ? "/signup" : "/login")} className='text-center' >{isLogin ? "Signup Instead ?" : "Login Instead ?"}</p>
                </div>
                <div className='text-red-500'>
                    {switchError}
                </div>
                <button onClick={onSubmit} className='w-[60px] h-[60px] rounded-full bg-[#d6ff00] border-2 border-purple-600'>
                    <FaArrowRight className='text-black ps-2 pt-1 transition-all w-full h-full hover:translate-x-2 active:translate-x-2 active:text-purple-600 active:shadow-2xl scale-60' title='Submit' />
                </button>
            </div>
        </form >
    )
}

const InputFeild = ({ placeholder, name, icon, onChange, errorMessage }) => {
    return (<>
        <div className='flex justify-center relative'>
            <img className='w-[80%] ' src={input} alt="" />
            <input onChange={onChange}
                className='w-[80%] focus:border-none focus:outline-none absolute h-full bg-transparent text-base text-white placeholder:text-base placeholder:items-center placeholder:text-white px-3'
                placeholder={placeholder} name={name} type="text" />
            <span className='absolute right-[15%] top-1/2 -translate-y-1/2 text-3xl md:text-5xl'>
                {icon}
            </span>
            {errorMessage && <span className='absolute -bottom-4 text-red-500 text-base'>{errorMessage}</span>}
        </div>
    </>)
}
export default InputBox