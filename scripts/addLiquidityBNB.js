const {ethers, upgrades} = require('hardhat');
const hre = require("hardhat");
// const { time } = require("@nomicfoundation/hardhat-network-helpers");


async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main(){

         const Token1Factory = await ethers.getContractFactory("Token1");
        //  const Token2Factory = await ethers.getContractFactory("Token2");

         const token1 = Token1Factory.attach("0xF0B4Ba6202324D97358aF4970d591FFF65a576cF");
        //  const token2 = Token2Factory.attach("0x01d183c903901FdCbB6CC352e7f3aDaF6b643218");

         await token1.mint("0x25E103D477025F9A8270328d84397B2cEE32D0BF",ethers.parseEther("1000"), {
                  gasPrice: ethers.parseUnits('10', 'gwei'), // Set a higher gas price
                  gasLimit: 5000000 // Adjust the gas limit as needed
                });
         await sleep(3000);
         await token1.approve("0x8A887ab2873F777A250Bb77699d2C7474ebd4632",ethers.parseEther("1000"), {
                  gasPrice: ethers.parseUnits('10', 'gwei'), // Set a higher gas price
                  gasLimit: 5000000 // Adjust the gas limit as needed
                });
         await sleep(3000);

        //  await token2.mint("0x25E103D477025F9A8270328d84397B2cEE32D0BF",ethers.parseEther("1000"), {
        //           gasPrice: ethers.parseUnits('10', 'gwei'), // Set a higher gas price
        //           gasLimit: 5000000 // Adjust the gas limit as needed
        //         });
        //  await sleep(3000);
        //  await token2.approve("0x35b23c81C0fb00eB097D0cc445198830a9Be26c4",ethers.parseEther("1000"), {
        //           gasPrice: ethers.parseUnits('10', 'gwei'), // Set a higher gas price
        //           gasLimit: 5000000 // Adjust the gas limit as needed
        //         });
        //  await sleep(3000);

         const RouterFactory = await ethers.getContractFactory("Custom_Router");
         const router = RouterFactory.attach(
           "0x8A887ab2873F777A250Bb77699d2C7474ebd4632"
         );
         

         const currentTimestamp = Math.floor(Date.now() / 1000);
         const UpdatedTimeStamp = currentTimestamp+70;
        //  await router.addLiquidity(
        //           "0xF0B4Ba6202324D97358aF4970d591FFF65a576cF",
        //           "0x01d183c903901FdCbB6CC352e7f3aDaF6b643218",
        //           ethers.parseEther("1000"),
        //           ethers.parseEther("1000"),
        //           0,
        //           0,
        //           "0x25E103D477025F9A8270328d84397B2cEE32D0BF",
        //           UpdatedTimeStamp, {
        //                    gasPrice: ethers.parseUnits('10', 'gwei'), // Set a higher gas price
        //                    gasLimit: 5000000 // Adjust the gas limit as needed
        //                  }
        //  );

        await router.addLiquidityETH(
          "0xF0B4Ba6202324D97358aF4970d591FFF65a576cF",
          ethers.parseEther("1000"),
          0,
          ethers.parseEther("0.03"),
          "0x25E103D477025F9A8270328d84397B2cEE32D0BF",
          UpdatedTimeStamp,{
                      gasPrice: ethers.parseUnits('10', 'gwei'),
                      gasLimit: 5000000,
                      value: ethers.parseEther("0.03")  
                      }
        )
         
         console.log("Done");


}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});