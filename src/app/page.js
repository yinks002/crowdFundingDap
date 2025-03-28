'use client'
import React, {useEffect, useContext, useState} from "react";
import Image from "next/image";

//internal import
import { CrowdFundingContext } from "../../Context/CrowdFunding";
import {Hero, Card, PopUp} from "../../Components/Hero";

const Home = ()=>{
  const {titleData, 
    getCampaigns, createCampaign,
    donate
    ,getUserCampaigns, 
    getDonations} = useContext(CrowdFundingContext);
    

    const [allcampign, setAllcampaign] = useState();
    const [usercampaign, setUsercampaign]= useState();


    useEffect(()=>{
      const getCampaignsData = getCampaigns();
      const userCampaignsData = getUserCampaigns();

      return async ()=>{
        const allData = await getCampaignsData;
        const userData = await userCampaignsData;

        setAllcampaign(allData);
        setUsercampaign(userData);
      }
    },[]);

    //Donation popup
    const [openModel, setOpenModel]= useState(false);
    const [donateCampaign,setDonateCampaign] = useState();
    console.log(donateCampaign)

    return (
      <>
      <Hero titleData={titleData} createCampaign= {createCampaign}/>
      <Card title= "All listed campaign"
      allcampign= {allcampign}
      setOpenModel= {setOpenModel}
      setDonate = {setDonateCampaign}
      />
    <Card 
    title ="Your created campaign"
    allcampign = {usercampaign}
    setOpenModel = {setOpenModel}
    setDonate = {setDonateCampaign}
    />

    {openModel && (
      <PopUp  setOpenModel = {setOpenModel}
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
