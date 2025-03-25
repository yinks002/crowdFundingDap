import React, {useState, useEffect} from "react";
import Web3Modal from "web3modal"
import { ethers, EtherSymbol } from "ethers";



const fetchContract= (signerOrProvider) => new ethers.Contract(CrowdFundingAddress, CrowdFundingABI, signerOrProvider);

export const CrowdFundingContext = React.createContext();

export const CrowdFundingProvider =  ({children}) =>{
    const titleData = "crowd funding contract";

    const [currrentAccount, setCurrentAcount] = useState=("");
    const createCampaign = async(campaign) =>{
        const {title, description, amount, deadline} = campaign;
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.BrowserProvider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        console.log(currrentAccount);
        try {
            const transaction = await 
            contract.createCampaign(currrentAccount,title,
                description,
                ethers.utils.parseUnits(amount, 18),
                new Date(deadline).getTime()
    
            );
            await transaction.wait();
            console.log("contract call successful", transaction)
        } catch (error) {
            console.log("failed to make transaction",error)
        }
    }

    const getCampaigns = async() =>{
        const provider = new ethers.JsonRpcProvider()
        const contract  = fetchContract(provider);

        const campaigns = await contract.getCampaigns();
        const parsedCampaigns = campaigns.map((campaign, i)=> ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(
                campaign.amountCollected.toString()
            ),
            pId: i,

        }));
        return parsedCampaigns;
    };
   const getUserCampaigns = async()=>{
    const provider= new ethers.JsonRpcProvider();
    const contract = fetchContract(provider);

    const allCampaigns = await contract.getCampaigns();

    const accounts= await window.ethereum.request({
        method: "eth_accounts",
    });

    const currentUser = accounts[0];
    const filteredCampaigns = allCampaigns.filter((campaign)=>
    campaign.owner == "0xC37297b82880C3ea1926c6ba5CD386f781df514A"
    );

    const userData = filteredCampaigns.map((campaign, i)=> ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
        pId: i,

    }))
    return userData;
    
   };

   const donate= async(pId, amount) => {
    const web3Modal= new Web3Modal();
    const connection =await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);

    const campaignData = await contract.donateToCampaign(pId,{
        value: ethers.utils.parseEther(amount),

    });
    await campaignData.wait();
    location.reload();
    return campaignData;
   };

   const getDonations = async(pId)=>{
    const provider = new ethers.JsonRpcProvider();
    const contract = fetchContract(provider);

    const donations = await contract.getDonators(pId);
    const numberOfDonations= donations[0].length;
    const parsedDonations = [];

    for (let i=0; i < numberOfDonations; i++){
        parsedDonations.push({
            donator: donations[0][i],
            donation: ethers.utils.formaEther(donations[1][i].toString()),
             
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
    }
    } catch (error) {
        console.log("no account found", error);
    }
}











}