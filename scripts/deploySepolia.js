const {ethers, upgrades} = require('hardhat');
const hre = require("hardhat");
// const { time } = require("@nomicfoundation/hardhat-network-helpers");


async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main(){


  // const Token1Factory = await ethers.getContractFactory("Token1");
  const Token2Factory = await ethers.getContractFactory("Token2");

  // const token1 = await Token1Factory.deploy({
  //   gasPrice: ethers.parseUnits('10', 'gwei'), // Set a higher gas price
  //   gasLimit: 5000000 // Adjust the gas limit as needed
  // });
  // await token1.waitForDeployment(5);
  // const token1ContractAddress = await token1.getAddress();
  // console.log("Token1 Contract deployed to:", token1ContractAddress);

  const token2 = await Token2Factory.deploy({
    gasPrice: ethers.parseUnits('10', 'gwei'), // Set a higher gas price
    gasLimit: 5000000 // Adjust the gas limit as needed
  });

  await token1.waitForDeployment(5);
  const token2ContractAddress = await token2.getAddress();
  console.log("Token2 Contract deployed to:", token2ContractAddress);

  const RouterFactory = await ethers.getContractFactory("Custom_Router");

  const routerContract = await RouterFactory.deploy("0x7E0987E5b3a30e3f2828572Bb659A548460a3003","0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9", {
    gasPrice: ethers.parseUnits('10', 'gwei'), // Set a higher gas price
    gasLimit: 5000000 // Adjust the gas limit as needed
  });

  // const routerContract = await RouterFactory.deploy("0xB7926C0430Afb07AA7DEfDE6DA862aE0Bde767bc","0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd");

  await routerContract.waitForDeployment(5);

  const routerContractAddress = await routerContract.getAddress();

  console.log("Router Contract deployed to:", routerContractAddress);

  
await hre.run("verify:verify", {
    address: routerContractAddress,
    constructorArguments: ["0xB7926C0430Afb07AA7DEfDE6DA862aE0Bde767bc","0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd"],
});

// await hre.run("verify:verify", {
//   address: token1ContractAddress,
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