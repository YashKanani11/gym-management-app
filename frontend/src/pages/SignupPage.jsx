import React, { useEffect, useState } from "react";
import BG from "../Components/BG";
import HeadingTitleNeon from "../Components/auth/HeadingTitleNeon"
import signup from "../assets/Signup.png";
import InputBox from "../Components/auth/InputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const [form, setForm] = useState({});
    const [passNotMatch, setPassNotMatch] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [switchErrorState, setSwitchErrorState] = useState("")

    const checkPassMatch = () => {
        if (
            form.password &&
            form.confirmPassword &&
            form.password != form.confirmPassword
        ) {
            setPassNotMatch(true);
        }
        else if (form.password &&
            form.confirmPassword &&
            form.password == form.confirmPassword) {
            setPassNotMatch(false);
        }
    }
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
            [e.target.name]: e.target.value,
        }));
    };
    const navigate = useNavigate()
    const registerUser = async (e) => {
        e.preventDefault();
        checkMailID()
        checkPassMatch()
        if (!isValidEmail && !passNotMatch && form.mailID && form.userName && form.password && form.confirmPassword) {
            try {
                const res = await axios.post("http://localhost:5000/api/admin/register", {
                    userName: form.userName,
                    mailID: form.mailID,
                    password: form.password,
                });
                console.log("Response from backend", res);
                if (res.status == 200) {
                    alert(`Signup successfull Username: ${res.userName} & mailID: ${mailID}`)
                    navigate('/login')
                }
            } catch (error) {
                if (error.response.data?.status === 'preExistingUser') {
                    alert("Please Login Existing User")
                    setSwitchErrorState("Please Login Existing User")
                }
                console.log(error);
            }
        }

    };
    useEffect(() => {
        console.log(form);
    }, [form]);
    return (
        <>
            <BG />
            <HeadingTitleNeon top={"top-[20%]"} src={signup} />
            <div className="w-full flex justify-center">
                <InputBox
                    boxHeight={"h-[60%]"}
                    inputType={["userName", "email", "password", "confirmPassword"]}
                    onChange={onChange}
                    onSubmit={registerUser}
                    passMatchErr={passNotMatch}
                    mailError={isValidEmail}
                    switchError={switchErrorState}
                />
            </div>
        </>
    );
};

export default SignupPage;
