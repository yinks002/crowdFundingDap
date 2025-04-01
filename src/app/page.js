'use client'
import React, {useEffect, useContext, useState} from "react";
import Image from "next/image";

//internal import
import { CrowdFundingContext } from "../../Context/CrowdFunding";
import {Hero, Card, Popup} from "../../Components/index";

const Home = ()=>{
  const {titleData, 
    getCampaigns, createCampaign,
    donate
    ,getUserCampaigns, 
    getDonations} = useContext(CrowdFundingContext);
    

    const [allcampaign, setAllcampaign] = useState();
    const [usercampaign, setUsercampaign]= useState();


    useEffect(() => {
      const fetchData = async () => {
        const allData = await getCampaigns();
        const userData = await getUserCampaigns();
    
        setAllcampaign(allData);
        setUsercampaign(userData);
    
        console.log("uscam", userData);
        
        console.log("hiiii");
      };
    
      fetchData(); // Call the async function inside useEffect
    }, []);
    

    //Donation popup
    const [openModel, setOpenModel]= useState(false);
    const [donateCampaign,setDonateCampaign] = useState();
    console.log(donateCampaign)

    return (
      <>
      
      <Hero titleData={titleData} createCampaign= {createCampaign}/>
      <Card title= "All listed campaign"
      allcampaign= {allcampaign}
      setOpenModel= {setOpenModel}
      setDonate = {setDonateCampaign}
      />
     
    <Card 
    title ="Your created campaign"
    allcampaign = {usercampaign}
    setOpenModel = {setOpenModel}
    setDonate = {setDonateCampaign}
    />

    {openModel && (
      <Popup  setOpenModel = {setOpenModel}
      getDonations = {getDonations}
      donate = {donateCampaign}
      donateFunction = {donate}

      />
    )
    
    }

      </>
    )

}
export default Home;
