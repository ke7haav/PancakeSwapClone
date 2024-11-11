const {ethers, upgrades} = require('hardhat');
const hre = require("hardhat");
// const { time } = require("@nomicfoundation/hardhat-network-helpers");


async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main(){

console.log("Start");

  const USDCFactory = await ethers.getContractFactory("USDC");
  const usdc = await USDCFactory.deploy({
    gasPrice: ethers.parseUnits('25', 'gwei'), // Set a higher gas price
    gasLimit: 3000000 // Adjust the gas limit as needed
  })

  await usdc.deploymentTransaction().wait();

  const usdcAddress = await usdc.getAddress();
  console.log("Usdc Deployed At",usdcAddress);


//   const Token2Factory = await ethers.getContractFactory("Token2");
//   const token2 = await Token2Factory.deploy({
//     gasPrice: ethers.parseUnits('10', 'gwei'), // Set a higher gas price
//     gasLimit: 3000000 // Adjust the gas limit as needed
//   });

//   await token2.waitForDeployment(5);
//   const token2ContractAddress = await token2.getAddress();
//   console.log("Token2 Contract deployed to:", token2ContractAddress);


//   const wethFactory = await ethers.getContractFactory("WETH");
//   const weth = await wethFactory.deploy({
//          gasPrice: ethers.parseUnits('10', 'gwei'), // Set a higher gas price
//          gasLimit: 3000000 // Adjust the gas limit as needed
//        });

//   await weth.waitForDeployment(5);
//   const wethAddress = await weth.getAddress();
//   console.log("Weth Address on Polygon",wethAddress)
     
//   const RouterFactory = await ethers.getContractFactory("Custom_Router");

//   const routerContract = await RouterFactory.deploy("0x586A31a288E178369FFF020bA63d2224cf8661E9",wethAddress, {
//     gasPrice: ethers.parseUnits('10', 'gwei'), // Set a higher gas price
//     gasLimit: 3000000 // Adjust the gas limit as needed
//   });


//   await routerContract.waitForDeployment(5);

//   const routerContractAddress = await routerContract.getAddress();

//   console.log("Router Contract deployed to:", routerContractAddress);

  
// await hre.run("verify:verify", {
//     address: routerContractAddress,
//     constructorArguments: ["0x586A31a288E178369FFF020bA63d2224cf8661E9",wethAddress],
// });

// await hre.run("verify:verify", {
//   address: usdcAddress,
//   constructorArguments: [],
// });

// await hre.run("verify:verify", {
//   address: token2ContractAddress,
//   constructorArguments: [],
// });




console.log("Contracts Verified SucessFully");


}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});

// Usdc Deployed At 0xB7976ED79bc038Ed30F0a4eB1c75a3dE7499d9aF
// Token2 Contract deployed to: 0xb1795c14Dd756f016712aaE23503f93DC70ABAeF
// Router Contract deployed to: 0xD5301547bDFaFf9BB2EbAfe3af60B4891Ce785ee