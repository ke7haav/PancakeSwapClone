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

// await hre.run("verify:verify", {
//   address: "0x988c1fcbc8a3222541692D32A0b8a8C9b61D6c6C",
//   constructorArguments: [],
//   contract: "contracts/Token1.sol:Token1",
// });



// await hre.run("verify:verify", {
//   address: "0x21e35AA2d636792881e6dbB3E2741656fC904A2E",
//   constructorArguments: ["0xB7926C0430Afb07AA7DEfDE6DA862aE0Bde767bc","0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd"],
//   contract: "contracts/Router.sol:Custom_Router"
// });

await hre.run("verify:verify", {
address: "0xf1d928aADd0D23872A0BB4568C696267083e9136",
constructorArguments: [],
contract: "contracts/USDC.sol:USDC"
});

// await hre.run("verify:verify", {
// address: "0xb1795c14Dd756f016712aaE23503f93DC70ABAeF",
// constructorArguments: [],
// contract: "contracts/Token2.sol:Token2",
// });


console.log("Contracts Verified SucessFully");


}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});