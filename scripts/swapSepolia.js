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
         
         const UsdcFactory = await ethers.getContractFactory("USDC");
         const usdc = UsdcFactory.attach("0xB7976ED79bc038Ed30F0a4eB1c75a3dE7499d9aF");


         // await token1.mint("0x95E270Ef64960DCf6d6583479CDe14dE31D420Af",ethers.parseEther("100"), {
         //          gasPrice: ethers.parseUnits('10', 'gwei'), // Set a higher gas price
         //          gasLimit: 5000000 // Adjust the gas limit as needed
         //        });
         // await sleep(3000);

         await usdc.approve("0xD5301547bDFaFf9BB2EbAfe3af60B4891Ce785ee",ethers.parseEther("10"), {
                  gasPrice: ethers.parseUnits('10', 'gwei'), // Set a higher gas price
                  gasLimit: 5000000 // Adjust the gas limit as needed
                });
                console.log("Approval Done");

         // await sleep(3000);

         const RouterFactory = await ethers.getContractFactory("Custom_Router");
         const router = RouterFactory.attach(
           "0xD5301547bDFaFf9BB2EbAfe3af60B4891Ce785ee" // The deployed contract address
         );

        //  const result = await router.getAmountsOut(ethers.parseEther("99.5"),["0xF0B4Ba6202324D97358aF4970d591FFF65a576cF","0x01d183c903901FdCbB6CC352e7f3aDaF6b643218"]);
        //  console.log("getAmountsOut [Token1 ,Token2]",result); // Amount of token2 you will receive for 99.5 Token1

        //  const result2 = await router.getAmountsOut(ethers.parseEther("99.5"),["0x01d183c903901FdCbB6CC352e7f3aDaF6b643218","0xF0B4Ba6202324D97358aF4970d591FFF65a576cF"]);
        //  console.log("getAmountsOut [Token2 ,Token1]",result2); // Amount of Token1 you will receive for 99.5 Token2

        //  const result3 = await router.getAmountsIn(ethers.parseEther("99.5"),["0xF0B4Ba6202324D97358aF4970d591FFF65a576cF","0x01d183c903901FdCbB6CC352e7f3aDaF6b643218"]);
        //  console.log("getAmountsIn [Token1 ,Token2]",result3)  // Amount to token1 you need to provide to get 99.5 Token2

        //  const result4 = await router.getAmountsIn(ethers.parseEther("99.5"),["0x01d183c903901FdCbB6CC352e7f3aDaF6b643218","0xF0B4Ba6202324D97358aF4970d591FFF65a576cF"]);
        //  console.log("getAmountsIn [Token2 ,Token1]",result4) //Amount of Token2 you need to provide to get 99.5 Token1
         
         // await sleep(3000);

         const currentTimestamp = Math.floor(Date.now() / 1000);
         const UpdatedTimeStamp = currentTimestamp+70; 
         const tx = await router.swapExactTokensForTokens(
                  ethers.parseEther("10"),
                  0,
                  ["0xB7976ED79bc038Ed30F0a4eB1c75a3dE7499d9aF","0xb1795c14Dd756f016712aaE23503f93DC70ABAeF"],
                  "0x2ccbd69B77B4E8223582773f1487C26Ad72E9FcF",
                  UpdatedTimeStamp,{
                           gasPrice: ethers.parseUnits('10', 'gwei'), // Set a higher gas price
                           gasLimit: 5000000
                  }
         )

           console.log("Swap Transaction Hash",tx.hash);
         // const amountETH = await router.getAmountsOut(ethers.parseEther("0.00995"),["0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd","0xF0B4Ba6202324D97358aF4970d591FFF65a576cF"]);
         // console.log(amountETH);

         await sleep(3000);
         // await router.swapExactETHForTokens(
         //  0,
         //  ["0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd","0xF0B4Ba6202324D97358aF4970d591FFF65a576cF"],
         //  "0x20b9087917cF1510b2E68EF5786311C3CC9cb467",
         //  UpdatedTimeStamp,{
         //    gasPrice: ethers.parseUnits('10', 'gwei'), // Set a higher gas price
         //    gasLimit: 5000000,
         //    value: ethers.parseEther("0.01")  
         //  }
         // )

         console.log("Swap Done");


}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});