const {ethers, upgrades} = require('hardhat');
const hre = require("hardhat");
// const { time } = require("@nomicfoundation/hardhat-network-helpers");


async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main(){

// await hre.run("verify:verify", {
//     address: "0xc3beDCFa051eB22a2B3d1C06e26E8cE48E034686",
//     constructorArguments: ["0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3"],
// });

await hre.run("verify:verify", {
  address: "0xF0B4Ba6202324D97358aF4970d591FFF65a576cF",
  constructorArguments: [],
  contract: "contracts/Token1.sol:Token1",
});

await hre.run("verify:verify", {
  address: "0x01d183c903901FdCbB6CC352e7f3aDaF6b643218",
  constructorArguments: [],
  contract: "contracts/Token2.sol:Token2",

});




console.log("Contracts Verified SucessFully");


}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});