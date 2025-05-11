import React from 'react'
import backgroundImg from '../assets/backgroundImg.jpg';
import backgroundImgWhite from '../assets/backgroundImgWhite.jpg';


const BG = () => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return (
        <>
            <section className='h-screen w-screen fixed top-0 left-0 -z-10'>
                <div className={`h-[75%] bg-red-300 bg-center bg-cover`} style={isDarkMode ? { backgroundImage: `url(${backgroundImg})` } : { backgroundImage: `url(${backgroundImgWhite})` }}></div>
                <div className={`h-[25%]  ${isDarkMode ? "bg-black" : "bg-[#a4b2b3]"}`}></div>
                <div className={`h-screen w-screen ${isDarkMode ? "bg-white/15" : "bg-black/20"} fixed top-0 left-0`}></div>
            </section>

        </>
    )
}

export default BG