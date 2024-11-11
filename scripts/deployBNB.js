const {ethers, upgrades} = require('hardhat');
const hre = require("hardhat");
// const { time } = require("@nomicfoundation/hardhat-network-helpers");


async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
  
  
  async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function main(){
  
    const USDCFactory = await ethers.getContractFactory("USDC");
    const usdc = await USDCFactory.deploy({
      gasPrice: ethers.parseUnits('10', 'gwei'), // Set a higher gas price
      gasLimit: 5000000 // Adjust the gas limit as needed
    })
  
    await usdc.waitForDeployment(5);
  
    const usdcAddress = await usdc.getAddress();
    console.log("Usdc Deployed At",usdcAddress);
  
  
    const Token1Factory = await ethers.getContractFactory("Token1");
    const token1 = await Token1Factory.deploy({
      gasPrice: ethers.parseUnits('10', 'gwei'), // Set a higher gas price
      gasLimit: 5000000 // Adjust the gas limit as needed
    });
    await token1.waitForDeployment(5);
    const token1ContractAddress = await token1.getAddress();
    console.log("Token1 Contract deployed to:", token1ContractAddress);
  
   
  
    const RouterFactory = await ethers.getContractFactory("Custom_Router");
  
    const routerContract = await RouterFactory.deploy("0xB7926C0430Afb07AA7DEfDE6DA862aE0Bde767bc","0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd", {
      gasPrice: ethers.parseUnits('10', 'gwei'), // Set a higher gas price
      gasLimit: 5000000 // Adjust the gas limit as needed
    });
  
  
    await routerContract.waitForDeployment(5);
  
    const routerContractAddress = await routerContract.getAddress();
  
    console.log("Router Contract deployed to:", routerContractAddress);
  
    
  await hre.run("verify:verify", {
      address: routerContractAddress,
      constructorArguments: ["0xB7926C0430Afb07AA7DEfDE6DA862aE0Bde767bc","0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd"],
  });
  
  await hre.run("verify:verify", {
    address: token1ContractAddress,
    constructorArguments: [],
  });
  
  
  
  console.log("Contracts Verified SucessFully");
  
  
  }
  
  main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
  
  
 


// Usdc Deployed At 0xf1d928aADd0D23872A0BB4568C696267083e9136
// Token1 Contract deployed to: 0x988c1fcbc8a3222541692D32A0b8a8C9b61D6c6C
// Router Contract deployed to: 0x21e35AA2d636792881e6dbB3E2741656fC904A2E