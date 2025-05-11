import React, { useEffect, useState } from 'react'
import BG from '../Components/BG'
import BottomSelector from '../Components/Members&TrainersPage/BottomSelector'
import AddNewData from '../Components/Members&TrainersPage/AddNewData'
import ListTileMembTrainer from '../Components/Members&TrainersPage/ListTileMembTrainer'

const MemebrsTrainersPage = () => {
    const [activeMembPage, setActiveMembPage] = useState(true)
    return (<>
        <BG />
        <ListTileMembTrainer activeMembPage={activeMembPage} />
        <AddNewData activeMembPage={activeMembPage} />
        <BottomSelector activeMembPageValue={activeMembPage} setActiveMembPageValue={setActiveMembPage} />
    </>)
}

export default MemebrsTrainersPage