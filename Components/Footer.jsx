'use client'
import React from 'react';


const Footer = () => {
    const productList = ["Market", "ERC20 Token", "Donation"];
    const contactList = [
        "support@yinks.gmail.com",
        "info@olayimika.gmail.ccom",
        "Do not contact me lol"
    ]
    const usefulLink = ["Home", "About Us", "Company Bio"];
    return (
        <footer className='text-center text-white backgroundMain lg:text-left'>
            <div className='mx-6 py-10 text-center md:text-left'>
                <div className='grid-1 grid gap-8 md:grid-cols-2 lg:grid-cold-4'>
               <div className=''>
                <h6 className='mb-4 flex items-center justify-center font-semibold uppercase md:justify-start'>
                    Olayimika number 1 skrrrr
                </h6>
                <p>you just dey yarn nonsense like wtf yen yen yen who tf you talking to bruv becayse wtf you saying</p>

                </div>

                <div className=''
                >
                    <h6 className='mb-4 flex justify-center font-semibold uppercase md:justify-start'>
                        Products
                    </h6>
                    {productList.map((el, i)=>(
                        <p className='mb-4' key={i + 1}>
                            <a href="#!">{el}</a>
                        </p>
                    ))}
                    </div>
                    <div className=''>
                        <h6 className='mb-4 flex justify-center font-semibold uppercase md:justify-start'>
                            Useful links
                        </h6>
                        {usefulLink.map((el, i)=>(
                            <p className='mb-4' key={i + 1}>
                                <a href="#!">{el}</a>
                            </p>
                        ))}

                        </div>     
                </div>
            </div>

        </footer>
    );
}

export default Footer;
