import React from 'react';

const Card = ({allcampaign, setOpenModel,setDonate, title}) => {
    console.log("all campagns", allcampaign)

    const daysLeft = (deadline)=>{
        const difference= new Date(dealine).getTime() - Date.now();
        const remainingDays = difference/ (1000 * 3600 * 24);
        return remainingDays.toFixed(0);

    }
    return (
        <div className='px-4 py-16 mx-auto sm:max-w-full lg:max-w-screem-xl md:px-24 lg:px-8 lg:py-20'>
            <p className='py-16 text-2xl font-bold leading-5'>{title}</p>
            <div className='grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full'>

            </div>
            
        </div>
    );
}

export default Card;
