import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import BG from '../Components/BG'
const IndivisualMember = () => {

    const { memberID } = useParams()
    const [data, setData] = useState()
    const fetchMemberData = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/fetch/members?memberID=${memberID}`, { withCredentials: true })
            if (res.status == 200) {
                setData(res.data.data[0])
            }
            else {
                console.log(res)
            }
        } catch (error) {
            console.log("Error fetching member data at fronend ", error)
        }
    }

    useEffect(() => { fetchMemberData() }, [])
    useEffect(() => { console.log(data) }, [data])
    return (<>
        <BG />
        <div className='text-white'>Hyy {data.name}</div>
    </>

    )
}

export default IndivisualMember