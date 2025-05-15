import React from 'react'
import BG from '../Components/BG'
import Profile from '../Components/Dashboard/Profile'
import DataViewComponent from '../Components/Dashboard/DataViewComponent'
import Slider from '../Components/Dashboard/InternalCustomDataModules/Slider'
import totalIncome from '../dummyDatabaseImages/Admin/totalIncome'
import dueFees from '../dummyDatabaseImages/Admin/dueFees'
import membEnding from '../dummyDatabaseImages/Memebrs/membEnding'
import salaryDue from '../dummyDatabaseImages/Trainers/salaryDue'
import BottomNav from '../Components/Dashboard/BottomNav'
import ListTileDashboard from '../Components/Dashboard/InternalCustomDataModules/ListTileDashboard'
import { authContext } from '../Context/authContext'
import { useContext } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'


const Dashboard = () => {
    const [membEndData, setMembEndData] = useState()
    const [salaryDue, setSalaryDue] = useState()
    const fetchMembEnding = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/fetch/members/membEnding', { withCredentials: true })
            if (res.status == 200) {
                console.log(res)
                setMembEndData(res.data.membersData)
            }
        } catch (error) {
            console.log('error fetching membdata in frontend', error)
        }
    }
    const fetchSalDue = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/fetch/trainers/pendSalary", { withCredentials: true })
            if (res.status == 200) {
                console.log(res)
                setSalaryDue(res.data.trainersData)
            }
        } catch (error) {
            console.log("Encountered error while fetching salary in fronend ", error)
        }
    }
    useEffect(() => { fetchMembEnding(); fetchSalDue() }, [])
    const { user, setuser } = useContext(authContext);
    return (
        <>
            <BG />
            <Profile name={user} />
            <section className='grid grid-cols-2 md:gap-4 md:grid-cols-3 lg:grid-cols-4 gap-2.5 mt-4 md:mt-8'>
                <DataViewComponent title={"Total Income"} component={<Slider sliderData={totalIncome} />} />
                <DataViewComponent title={"Due Fees"} component={<Slider sliderData={dueFees} />} />
                <DataViewComponent title={"Membership Ending"} component={<ListTileDashboard listData={membEndData} />} />
                <DataViewComponent title={"Pending Salary \u00A0 \u00A0 \u00A0 \u00A0"} component={<ListTileDashboard listData={salaryDue} />} />
            </section>
            <BottomNav />
        </>
    )
}

export default Dashboard