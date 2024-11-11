const {ethers, upgrades} = require('hardhat');
const hre = require("hardhat");
// const { time } = require("@nomicfoundation/hardhat-network-helpers");


async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Usdc Deployed At 0xf1d928aADd0D23872A0BB4568C696267083e9136
// Token1 Contract deployed to: 0x988c1fcbc8a3222541692D32A0b8a8C9b61D6c6C
// Router Contract deployed to: 0x21e35AA2d636792881e6dbB3E2741656fC904A2E

async function main(){

         const Token1Factory = await ethers.getContractFactory("Token1");
         const USDCFactory = await ethers.getContractFactory("USDC");

         const token1 = Token1Factory.attach("0x988c1fcbc8a3222541692D32A0b8a8C9b61D6c6C");
         const usdc = USDCFactory.attach("0xf1d928aADd0D23872A0BB4568C696267083e9136");

         await token1.mint("0x2ccbd69B77B4E8223582773f1487C26Ad72E9FcF",ethers.parseEther("10000"), {
                  gasPrice: ethers.parseUnits('10', 'gwei'), // Set a higher gas price
                  gasLimit: 5000000 // Adjust the gas limit as needed
                });
         await sleep(3000);
         await token1.approve("0x21e35AA2d636792881e6dbB3E2741656fC904A2E",ethers.parseEther("10000"), {
                  gasPrice: ethers.parseUnits('10', 'gwei'), // Set a higher gas price
                  gasLimit: 5000000 // Adjust the gas limit as needed
                });
         await sleep(3000);

         await usdc.mint("0x2ccbd69B77B4E8223582773f1487C26Ad72E9FcF",ethers.parseEther("10000"), {
                  gasPrice: ethers.parseUnits('10', 'gwei'), // Set a higher gas price
                  gasLimit: 5000000 // Adjust the gas limit as needed
                });
         await sleep(3000);
         await usdc.approve("0x21e35AA2d636792881e6dbB3E2741656fC904A2E",ethers.parseEther("10000"), {
                  gasPrice: ethers.parseUnits('10', 'gwei'), // Set a higher gas price
                  gasLimit: 5000000 // Adjust the gas limit as needed
                });
         await sleep(3000);

         const RouterFactory = await ethers.getContractFactory("Custom_Router");
         const router = RouterFactory.attach(
           "0x21e35AA2d636792881e6dbB3E2741656fC904A2E"
         );
         

         const currentTimestamp = Math.floor(Date.now() / 1000);
         const UpdatedTimeStamp = currentTimestamp+70;
         await router.addLiquidity(
                  "0x988c1fcbc8a3222541692D32A0b8a8C9b61D6c6C",
                  "0xf1d928aADd0D23872A0BB4568C696267083e9136",
                  ethers.parseEther("10000"),
                  ethers.parseEther("10000"),
                  0,
                  0,
                  "0x2ccbd69B77B4E8223582773f1487C26Ad72E9FcF",
                  UpdatedTimeStamp, {
                           gasPrice: ethers.parseUnits('10', 'gwei'), // Set a higher gas price
                           gasLimit: 5000000 // Adjust the gas limit as needed
                         }
         );

        // await router.addLiquidityETH(
        //   "0xF0B4Ba6202324D97358aF4970d591FFF65a576cF",
        //   ethers.parseEther("1000"),
        //   0,
        //   ethers.parseEther("0.03"),
        //   "0x25E103D477025F9A8270328d84397B2cEE32D0BF",
        //   UpdatedTimeStamp,{
        //               gasPrice: ethers.parseUnits('10', 'gwei'),
        //               gasLimit: 5000000,
        //               value: ethers.parseEther("0.03")  
        //               }
        // )
         
         console.log("Done");


}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});