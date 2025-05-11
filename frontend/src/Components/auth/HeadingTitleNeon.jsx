import React from 'react'

const HeadingTitleNeon = ({ top, src }) => {
    return (
        <div className={`absolute ${top} w-full justify-center flex`}><img className='w-[40%] max-w-[200px] min-w-[100px]' src={src} alt="" /></div>
    )
}

export default HeadingTitleNeon