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
      {
        version: "0.4.18",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
     
    ],
  },

  networks: {
    bscTestNet: {
      url: `https://data-seed-prebsc-1-s3.binance.org:8545/`,
      accounts: [process.env.PVT_KEY]
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/1b0d6b0a99704bbea5778b2de0938dd2`, 
      accounts: [process.env.PVT_KEY] 
    },
    amoy:{
    url: `https://polygon-amoy.infura.io/v3/1b0d6b0a99704bbea5778b2de0938dd2`,
    accounts: [process.env.PVT_KEY]
   }
  },
  etherscan: {
    apiKey: {
      bscTestnet: process.env.BSCSCAN_API_KEY, 
      sepolia: process.env.SEPOLIA_ETHERSCAN_API_KEY, 
      amoy:process.env.AMOY_API_KEY
    }
  },
  sourcify: {
    enabled: true
  }
};
