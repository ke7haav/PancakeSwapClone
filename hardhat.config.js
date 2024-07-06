require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.5.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      // Add more compiler versions as needed
    ],
  },

  networks: {
    bscTestNet: {
      url: `https://bsc-prebsc-dataseed.bnbchain.org`,
      accounts: [process.env.PVT_KEY3]
    }
  },
  etherscan: {
    apiKey: process.env.BSCSCAN_API_KEY 
  },
  sourcify: {
    enabled: true
  }
};
