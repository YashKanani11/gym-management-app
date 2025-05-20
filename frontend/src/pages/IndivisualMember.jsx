import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import BG from '../Components/BG'
import { FaSave } from "react-icons/fa";

const IndivisualMember = () => {
    const [form, setform] = useState({})
    const onchangefunc = (e) => {
        if (form !== data) {
            setChangeInDocument(true)
        }
        setform((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const { memberID } = useParams()
    const [data, setData] = useState()
    const [changeInDocument, setChangeInDocument] = useState(false)
    const fetchMemberData = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/fetch/members?memberID=${memberID}`, { withCredentials: true })
            if (res.status == 200) {
                setData(res.data.data[0])
                setform(res.data.data[0])
            }
            else {
                console.log(res)
            }
        } catch (error) {
            console.log("Error fetching member data at fronend ", error)
        }
    }

    useEffect(() => { fetchMemberData() }, [])

    return (<>
        <BG />

        <div className='w-screen min-h-screen md:h-fit'>

            <div className='absolute left-1/2 -translate-x-1/2 h-full overflow-y-auto w-full max-w-[850px] backdrop-blur-sm rounded-2xl md:px-10 md:border-white/30 border-2 shadow-2xl shadow-white/30'>
                <div className='w-full text-center text-white underline underline-offset-4 decoration-neonYellow pt-4 md:text-2xl'>{form?.memberID}</div>
                <div className='flex w-full mt-5'>
                    <div className='w-[60%]'>
                        <DataEntry className='' label={"Name:"} name={"name"} type={"text"} placeholder={"Your Name"} value={form?.name} onchange={onchangefunc} />
                        <DataEntry className='' label={"Contact:"} name={"contactNumber"} type={"tel"} placeholder={"+91 xxxxx-xxxxx"} value={form?.contactNumber} onchange={onchangefunc} />
                        <DataEntry className='' label={"Mail ID:"} name={"mailID"} type={"email"} placeholder={"your@mailid.com"} value={form?.mailID} onchange={onchangefunc} />
                    </div>
                    <div className='rounded-2xl overflow-hidden w-[40%] mx-5 h-[100px] md:h-[300px] border-2 border-neonYellow/50'>
                        <img className='h-full w-full' src="https://th.bing.com/th/id/R.8e632b4dbd61ffe21316d0aa8fd99717?rik=S%2fVRgWs8B1QUSA&riu=http%3a%2f%2fwww.dumpaday.com%2fwp-content%2fuploads%2f2019%2f12%2fpictures-10-2.jpg&ehk=QH5i3EAxyZYJFl0N54KuqmERNBOpDvFxygcV4nlsxsk%3d&risl=&pid=ImgRaw&r=0" alt="" />
                    </div>
                </div>
                <div className='mt-5 w-[90%]'>
                    <DataEntry className='' label={"Join Date:"} name={"joinDate"} type={"date"} placeholder={""} value={data && new Date(form?.joinDate).toISOString().split("T")[0]} onchange={onchangefunc} />
                    <div className='flex w-full border-b-2 my-3 border-neonYellow dark:text-white dark:placeholder:text-white items-center px-2 ms-2 text-xs md:overflow-hidden md:text-xl md:my-10'>
                        <label className='' htmlFor="">Memership Type:</label>
                        <select className=' ms-4 mb-1 border-b-2 border-neonYellow rounded-4xl px-2 bg-white text-black dark:bg-black/40 dark:text-white' name="membType" id="membType" onChange={onchangefunc} value={form?.membType ?? ''}>
                            <option value="" disabled >Select...</option>
                            <option value="1 Month">1 Month</option>
                            <option value="3 Month">3 Month</option>
                            <option value="6 Month">6 Month</option>
                            <option value="9 Month">9 Month</option>
                            <option value="12 Month">12 Month</option>
                        </select>
                    </div>
                    <DataEntry className='' label={"End Date:"} name={"endDate"} type={"date"} placeholder={""} value={data && new Date(form?.membEndDate).toISOString().split("T")[0]} onchange={onchangefunc} />
                    {form?.assignedTrainer && <div className='flex justify-around !flex-wrap'>
                        <DataEntry className='' label={""} name={"assignedTrainer"} type={"text"} placeholder={"Assigned Trainer"} value={form?.assignedTrainer} onchange={onchangefunc} />
                        <DataEntry className='' label={""} name={"trainerNotes"} type={"text"} placeholder={"Trainer's notes"} value={form?.optionalNotes} onchange={onchangefunc} />
                    </div>}

                </div>
                <div className='mt-5 w-[90%]'>
                    <DataEntry className='' label={"Workout Plan:"} name={"workoutType"} type={"text"} placeholder={"Full Body"} value={form?.workoutType} onchange={onchangefunc} />
                </div>
                <div className='w-full flex h-[20%] md:h-[30%] mt-10 mb-[10%]'>
                    <div className='w-1/2 mx-2 border-2 h-full border-neonYellow/30 rounded-3xl'>
                        <h2 className='text-white text-center text-xs md:text-xl border-b-1 border-neonYellow/40'>PR</h2>
                    </div>
                    <div className='w-1/2 mx-2 border-2 h-full border-neonYellow/30 rounded-3xl'>
                        <h2 className='text-white text-center text-xs md:text-xl border-b-1 border-neonYellow/40'>Attendance</h2>
                    </div>
                </div>
                {changeInDocument && <div className='h-[40px] w-[40px] rounded-full fixed bottom-15 right-1 bg-white/20 shadow-xl shadow-neonYellow backdrop-blur-sm border-2 border-neonYellow flex items-center justify-center'><FaSave className='text-xl text-white' title='Save Changes' /></div>}
            </div>
        </div >
        <MemberBottomNav />
    </>
    )
}

const DataEntry = ({ label, name, type, placeholder, value, onchange, icon }) => {
    return (
        <div className='flex w-[full] border-b-2 my-3 border-neonYellow dark:text-white dark:placeholder:text-white items-center px-2 ms-2 text-xs overflow-scroll md:overflow-hidden md:text-xl md:my-10'>
            <label htmlFor="" className="min-w-[45px]">{label}</label>
            <input className='px-3 w-fit' name={name} type={type} placeholder={placeholder} value={value} onChange={onchange} />
            <div className='absolute right-1'>{icon}</div>
        </div>
    )
}
const MemberBottomNav = () => {
    const commonClasses = {
        mainDiv: "fixed border-[#d4ff00e2] flex text-center items-center justify-center overflow-hidden bg-black/70 dark:bg-transparent shad",
        mainmd: " md:w-[700px] md:left-1/2 md:-translate-x-1/2 md:bg-black/70",
        parent: "w-1/2 border-[#d4ff00e2] h-full flex item-center justify-center active:scale-110 dark:text-white dark:bg-[#d4ff00e2]/20 text-black",
        activeButton: "dark:bg-[#d4ff00e2]/20 text-black",
        child: "font-joan text-sm text-shadow-lg text-shadow-[#d4ff00e2] tracking-wide cursor-pointer flex items-center justify-center",
        childmd: "md:text-2xl md:text-white"
    }
    return (<div
        className={`bottom-0 backdrop-blur-xl h-[10%] max-h-[100px] border-t-4 w-full rounded-tl-3xl rounded-tr-3xl md:shadow-[4px_0_5px_#FFFF33,-4px_0_5px_#FFFF33] ${commonClasses.mainDiv}
                ${commonClasses.mainmd}`}>
        <div

            className={` border-r-2  active:border-r-0 ${commonClasses.parent}`}>
            <div title='Trainers' className={`${commonClasses.child} ${commonClasses.childmd}`}>
                Feedback
            </div>
        </div>
        <div

            className={`
                 active:border-l-0 ${commonClasses.parent}`}>
            <div title='Trainers' className={`${commonClasses.child} ${commonClasses.childmd}`}>
                Send Due Notification
            </div>
        </div>
        <div

            className={`
                    border-l-2 active:border-l-0 ${commonClasses.parent}`}>
            <div title='Trainers' className={`${commonClasses.child} ${commonClasses.childmd}`}>
                Payement History
            </div>
        </div>
    </div>)
}
export default IndivisualMember
