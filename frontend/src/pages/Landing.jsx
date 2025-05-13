import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Landing = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.post("http://localhost:5000/api/admin/verify", {}, { withCredentials: true })
                if (res.status == 401) {
                    navigate("/login")

                }
                else if (res.status == 200) {
                    navigate('/dashboard')
                }
            } catch (error) {
                if (error.response?.status === 401) {
                    navigate("/login");
                } else {
                    console.log("Error verifying user at frontend", error);
                }
            }
        }
        fetchData()
    }, [])
    return (
        <div>Users are not suposed to see this page, please contact owner/developer of this site</div>
    )
}

export default Landing