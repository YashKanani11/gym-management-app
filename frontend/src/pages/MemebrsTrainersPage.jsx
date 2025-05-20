import React, { useEffect, useState } from 'react'
import BG from '../Components/BG'
import BottomSelector from '../Components/Members&TrainersPage/BottomSelector'
import AddNewData from '../Components/Members&TrainersPage/AddNewData'
import ListTileMembTrainer from '../Components/Members&TrainersPage/ListTileMembTrainer'
import AddNewMembTrainer from './AddNewMembTrainer'

const MemebrsTrainersPage = () => {
    const [activeMembPage, setActiveMembPage] = useState(true)
    const [seeAddMemebTrainerComponent, setSeeAddMemebTrainerComponent] = useState(false)
    return (<>
        <BG />
        <ListTileMembTrainer activeMembPage={activeMembPage} refreshOn={seeAddMemebTrainerComponent} />
        <AddNewData activeMembPage={activeMembPage} open={setSeeAddMemebTrainerComponent} />
        <BottomSelector activeMembPageValue={activeMembPage} setActiveMembPageValue={setActiveMembPage} />
        {seeAddMemebTrainerComponent && <AddNewMembTrainer activeMembPage={activeMembPage} close={setSeeAddMemebTrainerComponent} />}
    </>)
}

export default MemebrsTrainersPage