import axios from 'axios'
import React, { useState } from 'react'

const AddNewMembTrainer = ({ activeMembPage, close }) => {
    const [form, setForm] = useState({ password: "Maxfit" })
    const handleChange = (e) => {
        setForm(prev => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (activeMembPage) {
            try {
                const res = await axios.post('http://localhost:5000/api/access/add_member', {
                    assignedTrainer: form.assignedTrainer,
                    contactNumber: form.contactNumber,
                    joinDate: form.joinDate,
                    mailID: form.mailID,
                    membType: form.membType,
                    name: form.name,
                    optionalNotes: form.optionalNotes,
                    password: form.password,
                    workoutType: form.workoutPlan
                }, { withCredentials: true })
                if (res) {
                    console.log(res)
                    close(false)
                    alert(`Member added with ID: ${res.data.ID}`)

                }
            } catch (error) {
                if (error.response.data.status == "preExisting") {
                    alert("User already exists")
                    return
                }
                console.log(error)
            }
            return
        }
        try {
            const res = await axios.post('http://localhost:5000/api/access/add_trainer', {
                contactNumber: form.contactNumber,
                joinDate: form.joinDate,
                mailID: form.mailID,
                name: form.name,
                optionalNotes: form.optionalNotes,
                password: form.password,
            }, { withCredentials: true })
            if (res) {
                close(false);
                console.log(res.data.ID)
                alert(`Trainer added with ID: ${res.data.ID}`)
            }
        } catch (error) {
            if (error.response.data.status == "preExisting") {
                alert("User already exists")
                return
            }
            console.log(error)
        }
    }
    const [addCompleteDetails, setAddCompleteDetails] = useState(false)
    return (
        <section className='w-screen h-screen fixed top-0 flex justify-center items-center border-2 z-50 bg-white/50 dark:bg-black/50 '>
            <div className='w-full max-w-[300px] h-fit border-2 bg-linear-to-b from-black/50 via-[#d6ff00] dark:via-[#d6ff00]/60 via-30% to-white dark:to-white/60 rounded-3xl p-4 flex justify-center shadow-2xl shadow-[#d6ff00]/40 backdrop-blur-md'>
                <form className='w-[80%] h-full flex flex-col justify-around' action="">
                    <div onClick={() => close(false)} className='absolute top-3 right-5 text-white border-2 px-2 rounded-3xl hover:scale-125'>X</div>
                    <p className='text-center text-sm underline decoration-amber-400 text-white'>{activeMembPage ? "Member" : "Trainer"}</p>
                    <MemebTrainerInput onchange={handleChange} name={"name"} value={form.name ?? ''} label={"Name"} inputType={"text"} />
                    <MemebTrainerInput onchange={handleChange} name={"mailID"} value={form.mailID ?? ''} label={"Email ID"} inputType={"text"} />
                    <MemebTrainerInput onchange={handleChange} name={"password"} value={form.password ?? 'Maxfit'} label={"Default Password: Maxfit"} inputType={"text"} />
                    <MemebTrainerInput onchange={handleChange} name={"joinDate"} value={form.joinDate ?? ''} label={"Joining Date"} inputType={"date"} labelTrue={true} />
                    {!activeMembPage && <MemebTrainerInput onchange={handleChange} name={"salary"} value={form.salary ?? ''} label={"Salary"} inputType={"number"} />}
                    {activeMembPage && <div className='w-full flex justify-between my-2'>
                        <label className='text-sm' htmlFor="">Memership Type:</label>
                        <select className='border-2 rounded-4xl px-2' name="membType" id="membType" onChange={handleChange} value={form.membType ?? ''}>
                            <option value="" disabled >Select...</option>
                            <option value="1 Month">1 Month</option>
                            <option value="3 Month">3 Month</option>
                            <option value="6 Month">6 Month</option>
                            <option value="9 Month">9 Month</option>
                            <option value="12 Month">12 Month</option>
                        </select>
                    </div>}
                    {addCompleteDetails && <MemebTrainerInput onchange={handleChange} name={"contactNumber"} value={form.contactNumber ?? ''} label={"Contact number"} inputType={"number"} />}
                    {addCompleteDetails && activeMembPage && <MemebTrainerInput onchange={handleChange} name={"assignedTrainer"} value={form.assignedTrainer ?? ''} label={"Assigned Trainer"} inputType={"text"} />}
                    {addCompleteDetails && activeMembPage && <MemebTrainerInput onchange={handleChange} name={"workoutPlan"} value={form.workoutPlan ?? ''} label={"Workout Plan"} inputType={"text"} />}
                    {addCompleteDetails && <MemebTrainerInput onchange={handleChange} name={"optionalNotes"} value={form.optionalNotes ?? ''} label={"Notes"} inputType={"text"} />}
                    <div className='flex justify-around items-center'>
                        <div onClick={() => setAddCompleteDetails(!addCompleteDetails)} className='text-center text-xs p-0 w-[45%] rounded-full bg-gray-950 shadow-lg shadow-black hover:scale-105 text-white border-2 border-[#d6ff00]'>Add {addCompleteDetails ? " necessary " : " complete "} details</div>
                        <button onClick={handleSubmit} className='text-xs p-0 w-[45%] rounded-full bg-gray-950 shadow-lg shadow-black hover:scale-105 text-white border-2 border-[#d6ff00]'>Add New {activeMembPage ? "Member" : "\u00A0 Trainer"}</button>
                    </div>
                </form>
            </div>
        </section>
    )
}
const MemebTrainerInput = ({ label, inputType, labelTrue, name, onchange, value }) => {
    return (
        <div className='w-full flex justify-between my-2'>
            {labelTrue && <label className='text-sm' htmlFor="">{label}:</label>}
            <input
                className='w-full border-2 rounded-full px-2'
                name={name}
                value={value}
                onChange={onchange}
                placeholder={label} type={inputType} />
        </div>
    )
}
export default AddNewMembTrainer