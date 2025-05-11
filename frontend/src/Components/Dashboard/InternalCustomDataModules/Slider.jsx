import React, { useState } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
const Slider = ({ sliderData }) => {
    return (
        <div className="h-full w-full flex items-center justify-center">
            <DataCarousel carouselData={sliderData} />
        </div>
    );
};

const DataCarousel = ({ carouselData }) => {
    const currentMonth = new Date().getMonth();
    const [activeMonth, setActiveMonth] = useState(currentMonth);
    const handleBack = () => {
        if (activeMonth == 0) {
            alert("To see prev year's data contact developer");
            return;
        }
        setActiveMonth(activeMonth - 1);
    };
    const handleNext = () => {
        if (activeMonth == currentMonth) {
            return;
        }
        setActiveMonth(activeMonth + 1);
    };
    if (carouselData)
        return (
            <section className="flex w-full relative justify-between ">
                <div className="w-[55%] relative mx-2 opacity-45">
                    {carouselData[activeMonth - 1] && (
                        <DataCard
                            month={carouselData[activeMonth - 1].month}
                            value={carouselData[activeMonth - 1].value}
                            currentCard={false}
                        />
                    )}
                </div>
                <div className="flex w-[55%] absolute left-1/2 -translate-x-1/2 mx-2 z-10">
                    <DataCard
                        month={carouselData[activeMonth].month}
                        value={carouselData[activeMonth].value}
                        currentCard={true}
                    />
                </div>
                <div className="flex w-[55%] relative opacity-45 mx-2">
                    {currentMonth > activeMonth && (
                        <DataCard
                            month={carouselData[activeMonth + 1].month}
                            value={carouselData[activeMonth].value}
                            currentCard={false}
                        />
                    )}
                </div>
                <div className="absolute w-full flex justify-between top-1/2 -translate-y-1/2 z-20">
                    <button
                        onClick={handleBack}
                        className={`bg-white rounded-3xl text-2xl   ${activeMonth == 0 ? "bg-opacity-25 hover:scale-100" : "hover:scale-105 md:hover:scale-125 border-[1px] hover:border-black bg-opacity-85"
                            }`}
                    >
                        <MdNavigateBefore />
                    </button>
                    <button
                        onClick={handleNext}
                        className={`bg-white rounded-3xl text-2xl  ${activeMonth == currentMonth ? "bg-opacity-25 hover:scale-100" : "hover:scale-105 md:hover:scale-125 border-[1px] hover:border-black bg-opacity-85"
                            }`}
                    >
                        <MdNavigateNext />
                    </button>
                </div>
            </section>
        );
};

const DataCard = ({ month, value, currentCard }) => {
    return (
        <>
            <div className="flex flex-col w-full">
                <h1
                    className={`h-1/2 flex items-center justify-center px-2 border-white ${!currentCard ? "scale-75" : "md:scale-125 border-b-[1px]"
                        }`}
                >
                    {month}
                </h1>
                <h1
                    className={`h-1/2 flex items-center justify-center px-2 border-t-2 ${!currentCard ? "scale-75" : "md:scale-125 bg-[#d6ff00]"
                        } border-slate-800 `}
                >
                    {value}
                </h1>
            </div>
        </>
    );
};
export default Slider;
