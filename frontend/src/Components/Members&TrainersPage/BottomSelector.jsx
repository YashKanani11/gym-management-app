import React from 'react'

const MemebTrainerSelector = ({ setActiveMembPageValue, activeMembPageValue }) => {
    const commonClasses = {
        mainDiv: "fixed border-[#d4ff00e2] flex text-center items-center justify-center overflow-hidden bg-black/70 dark:bg-transparent",
        mainmd: "md:top-3 md:border-4 md:border-t-0 md:rounded-none md:rounded-br-3xl md:rounded-bl-3xl md:w-[400px] md:left-1/2 md:-translate-x-1/2 md:bg-black/70",
        parent: "w-1/2 border-[#d4ff00e2] h-full flex item-center justify-center active:scale-110 dark:text-white",
        activeButton: "dark:bg-[#d4ff00e2]/20 bg-white/50 text-black",
        child: "font-joan text-xl text-shadow-lg text-shadow-[#d4ff00e2] tracking-wide cursor-pointer flex items-center justify-center",
        childmd: "md:text-4xl md:text-white"
    }
    return (
        <>
            <div
                className={`bottom-0 h-[10%] border-t-4 w-full rounded-tl-3xl rounded-tr-3xl ${commonClasses.mainDiv}
                ${commonClasses.mainmd}`}>
                <div
                    onClick={() => setActiveMembPageValue(false)}
                    className={` ${activeMembPageValue ? '' : commonClasses.activeButton} 
                    border-r-2  active:border-r-0 ${commonClasses.parent}`}>
                    <div title='Trainers' className={`${commonClasses.child} ${commonClasses.childmd}`}>
                        Trainers
                    </div>
                </div>
                <div
                    onClick={() => setActiveMembPageValue(true)}
                    className={` ${activeMembPageValue ? commonClasses.activeButton : ""}
                    border-l-2 active:border-l-0 ${commonClasses.parent}`}>
                    <div title='Trainers' className={`${commonClasses.child} ${commonClasses.childmd}`}>
                        Members
                    </div>
                </div>
            </div>

        </>
    )
}
export default MemebTrainerSelector