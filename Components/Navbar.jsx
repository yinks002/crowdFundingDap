'use client'


import React, {useState, useContext} from "react";

import { CrowdFundingContext } from "../Context/CrowdFunding";
import {Logo, Menu} from ".";
const Navbar = ()=>{
    const {currentAccount, connectWallet} = useContext(CrowdFundingContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuList= ["white paper", "project", "Donation", "Members"];

    
    return (
     <div className="backgroundMain">
        <div className="px-4 py-5 mx-auto sm:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
            <div className="relative flex items-center justify-between">
                <div className="flex items-center">
                    <a href="/" aria-label="Company"
                     title="Company"
                    className="inline-flex items center mr-8"
                    >
                        <Logo color= "text-white" />
                        <span className="ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase">
                            YinksCrowFund
                        </span>
                    </a>

            <ul className="flex items-center hidden space-x-8 lg:flex">
                {menuList.map((el,i)=>(
                    <li key={i + 1}>
                        <a href="/"
                        aria-label="Our Product"
                        title="our product"
                        className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-acccent-400"
                        >
                            {el}
                        </a>
                    </li>
                ))}
            </ul>
                </div>
                {!currentAccount  && (
                    <ul className="flex items-center hidden space-x-8 lg:flex">
                        <li>
                            <button onClick={()=> connectWallet()}
                                className="inline-flex items-center justify-center h-12
                                px-6 font-medium tracking-wide text-white transition duration-200
                                rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700
                                focus:shadow-outline focus:outline-none background
                                "
                                aria-label="Sign up"
                                title="sign up"
                                >connect Wallet</button>
                        </li>
                    </ul>
                )}


                <div className="lg:hidden z-40">
                    <button aria-label="Open Menu"
                    title="Open Menu"
                    className="p-2 -mr-1 transition duration-200 focus:outline-none focus:shadow-outline"
                    onClick={()=> setIsMenuOpen(true)}
                    >
                        <Menu />
                    </button>
                    {isMenuOpen && (
                        <div className="absolute top-0 left-0 w-full">
                            <div className="p-5 bg-white border rounded shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <a href="/"
                                        aria-label="Company"
                                        title="Company"
                                        className="inline-flex items-center"
                                        > 
                                        <Logo color="text-black"
                                        
                                        />
                                        <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                                            Company
                                        </span>
                                        </a>
                                    
                                </div>

                                <button
                                aria-label="close Menu"
                                title="close Menu"
                                className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                onClick={()=> setIsMenuOpen(false)}
                                >
                                    <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                                    <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                      <nav>
                        <ul className="space-y-4">
                            {menuList.map((el, i)=>(
                                <li key={i + 1}>
                                    <a href="/"
                                    aria-label="our product"
                                    title="our product"
                                    className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"


                                    >
                                        {el}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a href="/"
                                className="inline-flex items-center background jusitify-center
                                w-full h-12 px-6 font-medium tracking-wide text-white transaition 

                                duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700
                                focus:shadow-outline focus:outline-none
                                "
                                aria-label="sign up"
                                title="sign up"
                                >
                                    Connect Wallet
                                </a>
                    
                            </li>
                             
                        </ul>
                      </nav>
                      </div>
                    )}
                </div>


            </div>
             </div>
     </div>
    )
}
export default Navbar;