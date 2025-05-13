import React, { useEffect, useState } from 'react'
import BG from '../Components/BG'
import BottomSelector from '../Components/Members&TrainersPage/BottomSelector'
import AddNewData from '../Components/Members&TrainersPage/AddNewData'
import ListTileMembTrainer from '../Components/Members&TrainersPage/ListTileMembTrainer'
import AddNewMembTrainer from './AddNewMembTrainer'

const MemebrsTrainersPage = () => {
    const [activeMembPage, setActiveMembPage] = useState(false)
    return (<>
        <BG />
        <ListTileMembTrainer activeMembPage={activeMembPage} />
        <AddNewData activeMembPage={activeMembPage} />
        <BottomSelector activeMembPageValue={activeMembPage} setActiveMembPageValue={setActiveMembPage} />
        <AddNewMembTrainer activeMembPage={activeMembPage} />
    </>)
}

export default MemebrsTrainersPage