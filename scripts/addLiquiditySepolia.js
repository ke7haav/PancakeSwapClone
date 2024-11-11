const {ethers, upgrades} = require('hardhat');
const hre = require("hardhat");
// const { time } = require("@nomicfoundation/hardhat-network-helpers");


async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Usdc Deployed At 0xB7976ED79bc038Ed30F0a4eB1c75a3dE7499d9aF
// Token2 Contract deployed to: 0xb1795c14Dd756f016712aaE23503f93DC70ABAeF
// Router Contract deployed to: 0xD5301547bDFaFf9BB2EbAfe3af60B4891Ce785ee

async function main(){

         const Token2Factory = await ethers.getContractFactory("Token2");
         const USDCFactory = await ethers.getContractFactory("USDC");

         const token2 = Token2Factory.attach("0xb1795c14Dd756f016712aaE23503f93DC70ABAeF");
         const usdc = USDCFactory.attach("0xB7976ED79bc038Ed30F0a4eB1c75a3dE7499d9aF");

         await token2.mint("0x2ccbd69B77B4E8223582773f1487C26Ad72E9FcF",ethers.parseEther("10000"), {
                  gasPrice: ethers.parseUnits('10', 'gwei'), // Set a higher gas price
                  gasLimit: 5000000 // Adjust the gas limit as needed
                });
         await sleep(3000);
         await token2.approve("0xD5301547bDFaFf9BB2EbAfe3af60B4891Ce785ee",ethers.parseEther("10000"), {
                  gasPrice: ethers.parseUnits('10', 'gwei'), // Set a higher gas price
                  gasLimit: 5000000 // Adjust the gas limit as needed
                });
         await sleep(3000);

         await usdc.mint("0x2ccbd69B77B4E8223582773f1487C26Ad72E9FcF",ethers.parseEther("10000"), {
                  gasPrice: ethers.parseUnits('10', 'gwei'), // Set a higher gas price
                  gasLimit: 5000000 // Adjust the gas limit as needed
                });
         await sleep(3000);
         await usdc.approve("0xD5301547bDFaFf9BB2EbAfe3af60B4891Ce785ee",ethers.parseEther("10000"), {
                  gasPrice: ethers.parseUnits('10', 'gwei'), // Set a higher gas price
                  gasLimit: 5000000 // Adjust the gas limit as needed
                });
         await sleep(3000);

         const RouterFactory = await ethers.getContractFactory("Custom_Router");
         const router = RouterFactory.attach(
           "0xD5301547bDFaFf9BB2EbAfe3af60B4891Ce785ee"
         );
         

         const currentTimestamp = Math.floor(Date.now() / 1000);
         const UpdatedTimeStamp = currentTimestamp+70;
         console.log("UpdatedTimeStamp",UpdatedTimeStamp);
         const Tx1 =await router.addLiquidity(
                  "0xb1795c14Dd756f016712aaE23503f93DC70ABAeF",
                  "0xB7976ED79bc038Ed30F0a4eB1c75a3dE7499d9aF",
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

         console.log("Tx Hash",Tx1.hash);
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
         
         console.log("Done Adding Liquidity Sepolia");


}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});