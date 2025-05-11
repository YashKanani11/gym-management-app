import React from 'react'
import BG from '../Components/BG'
import Profile from '../Components/Dashboard/Profile'
import DataViewComponent from '../Components/Dashboard/DataViewComponent'
import Slider from '../Components/Dashboard/InternalCustomDataModules/Slider'
import totalIncome from '../dummyDatabaseImages/Admin/totalIncome'
import dueFees from '../dummyDatabaseImages/Admin/dueFees'
import userProfile from '../dummyDatabaseImages/Admin/userProfile'
import membEnding from '../dummyDatabaseImages/Memebrs/membEnding'
import salaryDue from '../dummyDatabaseImages/Trainers/salaryDue'
import BottomNav from '../Components/Dashboard/BottomNav'
import ListTileDashboard from '../Components/Dashboard/InternalCustomDataModules/ListTileDashboard'


const Dashboard = () => {
    return (
        <>
            <BG />
            <Profile name={userProfile.name} />
            <section className='grid grid-cols-2 md:gap-4 md:grid-cols-3 gap-2.5 mt-4 md:mt-8'>
                <DataViewComponent title={"Total Income"} component={<Slider sliderData={totalIncome} />} />
                <DataViewComponent title={"Due Fees"} component={<Slider sliderData={dueFees} />} />
                <DataViewComponent title={"Membership Ending"} component={<ListTileDashboard listData={membEnding} />} />
                <DataViewComponent title={"Pending Salary \u00A0 \u00A0 \u00A0 \u00A0"} component={<ListTile listData={salaryDue} />} />
            </section>
            <BottomNav />
        </>
    )
}

export default Dashboard