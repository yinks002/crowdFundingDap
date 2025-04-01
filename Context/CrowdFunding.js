'use client'


import React, {useState, useEffect} from "react";
import Web3Modal from "web3modal"
import { ethers ,formatEther ,parseEther} from "ethers";
import { CrowdFundingABI, CrowdFundingAddress } from "./constants";





const fetchContract= (signerOrProvider) => new ethers.Contract(CrowdFundingAddress, CrowdFundingABI, signerOrProvider);


export const CrowdFundingContext = React.createContext();

export const CrowdFundingProvider =  ({children}) =>{
    const titleData = "crowd funding contract";
    console.log(CrowdFundingABI)

    const [currrentAccount, setCurrentAcount] = useState("");
    const createCampaign = async(campaign) =>{
        const {title, description, amount, deadline} = campaign;
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.BrowserProvider(connection);
        const signer = await  provider.getSigner();
        const contract = fetchContract(signer);
        console.log("contract", contract)
        console.log("accts",currrentAccount);
        try {
            const transaction = await 
            contract.createCampaign(currrentAccount,title,
                description,
                ethers.parseUnits(amount, 18),
                new Date(deadline).getTime()
    
            );
            await transaction.wait();
            console.log("contract call successful", transaction)
        } catch (error) {
            console.log("failed to make transaction",error)
        }
    }

    const getCampaigns = async() =>{
        // const provider = new ethers.JsonRpcProvider("https://rpc.sepolia.org");
        const provider = new ethers.BrowserProvider(window.ethereum);
        console.log("provider",provider)
        const contract  = fetchContract(provider);
        console.log("campcont", contract)
        try {
            const campaigns = await contract.getCampaigns();
            const parsedCampaigns = campaigns.map((campaign, i) => ({
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: formatEther(campaign.target.toString()),
                deadline: Number(campaign.deadline),
                amountCollected: formatEther(
                    campaign.amountCollected.toString()
                ),
                pId: i,
    
            }));
            console.log("parsed cmap", parsedCampaigns)
            return parsedCampaigns;
           
        } catch (error) {
            console.log("camp er",error)
        }
       
        
        
        
    };
   const getUserCampaigns = async()=>{
    // const provider = new ethers.JsonRpcProvider("https://rpc.sepolia.org");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = fetchContract(provider);

    const allCampaigns = await contract.getCampaigns();

    const accounts= await window.ethereum.request({
        method: "eth_accounts",
    });

    const currentUser = accounts[0];
    const filteredCampaigns = allCampaigns.filter(
        (campaign) => campaign.owner.toLowerCase() === currentUser.toLowerCase()
    );
    console.log(currrentAccount)

    const userData = filteredCampaigns.map((campaign, i)=> ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: formatEther(campaign.target.toString()),
        deadline: Number(campaign.deadline),
        amountCollected: ethers.formatEther(campaign.amountCollected.toString()),
        pId: i,

    }))
    console.log("isssss",userData)
    return userData;
    
   };

   const donate= async(pId, amount) => {
    const web3Modal= new Web3Modal();
    const connection =await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);

    const campaignData = await contract.donateToCampaign(pId,{
        value: parseEther(amount),

    });
    await campaignData.wait();
    location.reload();
    return campaignData;
   };

   const getDonations = async(pId)=>{
    // const provider = new ethers.JsonRpcProvider("https://rpc.sepolia.org");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = fetchContract(provider);

    const donations = await contract.getDonators(pId);
    const numberOfDonations= donations[0].length;
    const parsedDonations = [];

    for (let i=0; i < numberOfDonations; i++){
        parsedDonations.push({
            donator: donations[0][i],
            donation:  formatEther(donations[1][i].toString()),
             
        });
        

    }

    return parsedDonations;
   }

//CHECK IF WALLET IS CONNECTED
    const checkIfwalletConnected = async()=>{
        try {
            if(!window.ethereum) return setOpenError(true), setError(
                "install metamask"
            );
        const  accounts = await window.ethereum.request({
            method: "eth_accounts",
        });
        if(accounts.length){
            setCurrentAcount(accounts[0]);
        }else{
            console.log("no account found")
        }
        } catch (error) {
            console.log("error", error);
        }
    };


    useEffect(()=>{
        checkIfwalletConnected();
        getCampaigns();
    },[]);


    //connect wallet function
    const connectWallet = async()=>{
        try {
            if(!window.ethereum) return console.log("install metamask");
            const accounts= await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setCurrentAcount(accounts[0]);
        } catch (error) {
            console.log("error while connecting to wallet", error);
        }
    }


    return (
        <CrowdFundingContext.Provider
        
        value={{titleData, currrentAccount,
            createCampaign,
            getUserCampaigns,
            getCampaigns,
            donate,
            getDonations,
            connectWallet
        }}> {children}</CrowdFundingContext.Provider>
    );










}