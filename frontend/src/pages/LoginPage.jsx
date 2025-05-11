import React, { useEffect, useState } from 'react'
import BG from '../Components/BG'
import Login from '../assets/Login.png'
import InputBox from "../Components/auth/InputBox"
import HeadingTitleNeon from '../Components/auth/HeadingTitleNeon';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [form, setForm] = useState([])
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [switchErrorState, setSwitchErrorState] = useState("")

    const navigate = useNavigate()

    const checkMailID = () => {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.mailID)
        if (!isValid) {
            setIsValidEmail(true)
        }
        else if (isValid) {
            setIsValidEmail(false)
        }
    }
    const onChange = async (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
        checkMailID()
    }
    const loginUser = async (e) => {

        e.preventDefault()
        if (!isValidEmail && form.mailID && form.password) {
            try {
                console.log(form)
                const res = await axios.post('http://localhost:5000/api/admin/login', {
                    mailID: form.mailID,
                    password: form.password
                })
                if (res.status == 200) {
                    console.log(res.data.user)
                    alert(`Login successful ${res.data.user}`)
                    navigate('/dashboard')
                    return
                }
                if (res.data.status == "nonExistingUser") {
                    alert("User not found, try signing up instead")
                    navigate("/signup")
                }
                console.log(res)
            } catch (error) {
                console.log(error)
            }
        }

    }
    return (
        <>
            <BG />
            <HeadingTitleNeon top={'top-[20%]'} src={Login} />
            <div className='w-full flex justify-center'>
                <InputBox
                    boxHeight={'h-[40%]'}
                    inputType={["email", "password"]}
                    onChange={onChange}
                    isLogin={true}
                    mailError={isValidEmail}
                    switchError={switchErrorState}
                    onSubmit={loginUser} />
            </div>
        </>
    )
}

export default LoginPage