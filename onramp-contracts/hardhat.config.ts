import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "dotenv/config";

// Determine if we are on testnet or mainnet
const env = process.env.NETWORK || "testnet";
if (env !== "testnet" && env !== "mainnet") {
  throw new Error(`❌ Invalid NETWORK value: ${env}. Must be 'testnet' or 'mainnet'.`);
}

// Load only the necessary Axelar chain data
const axelarConfigPath = `${__dirname}/node_modules/@axelar-network/axelar-chains-config/info/${env}.json`;
const axelarConfigPath2 = `${__dirname}/deploy/testnet.json`;
const chains = require(axelarConfigPath);
const chains2 = require(axelarConfigPath2);
console.log("Chain2 is ", chains2);
/**
 * Fetch Axelar contract addresses for a given chain.
 * Only loads the requested chain to avoid unnecessary errors.
 */

const getAxelarAddressesFlow = (chainName: string) => {
  const chainData = chains2.chains[chainName];
  console.log("Chain name is", chainName);
    console.log("Chain data is", chainData);
  if (!chainData) {
    throw new Error(`❌ Chain '${chainName}' not found in config.`);
  }
  return {
    axelarGateway: chainData.contracts.AxelarGateway.address ,
    axelarGasService: chainData.contracts.AxelarGasService.address,
    //axelarGateway: 0xe432150cce91c13a887f7D836923d5597adD8E31,
    //axelarGasService: 0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6,
  };
};


const getAxelarAddresses = (chainName: string) => {
  const chainData = chains.chains[chainName];
  if (!chainData) {
    throw new Error(`❌ Chain '${chainName}' not found in Axelar ${env} config.`);
  }
  return {
    axelarGateway: chainData.contracts.AxelarGateway.address ,
    axelarGasService: chainData.contracts.AxelarGasService.address,
  };
};
 

/**
 * Define testnet and mainnet chains separately.
 * Load only the relevant chains based on `env`.
 */
const networks: Record<string, any> = {};

if (env === "testnet") {
  networks.filecoin = {
    url: "https://api.calibration.node.glif.io/rpc/v1",
    accounts: [process.env.DEPLOYER_PRIVATE_KEY || ""],
    axelar: getAxelarAddresses("filecoin"),
  };
  networks["linea-sepolia"] = {
    url: "https://rpc.sepolia.linea.build",
    chainId: 59141,
    accounts: [process.env.DEPLOYER_PRIVATE_KEY || ""],
    axelar: getAxelarAddresses("linea-sepolia"),
    isSourceChain: true,
  };
  networks["arbitrum-sepolia"] = {
    url: "https://goerli-rollup.arbitrum.io/rpc",
    chainId: 421613,
    accounts: [process.env.DEPLOYER_PRIVATE_KEY || ""],
    axelar: getAxelarAddresses("arbitrum-sepolia"),
    isSourceChain: true,
  };
  networks.avalanche = {
    url: "https://api.avax-test.network/ext/bc/C/rpc",
    chainId: 43113,
    accounts: [process.env.DEPLOYER_PRIVATE_KEY || ""],
    axelar: getAxelarAddresses("avalanche"),
    isSourceChain: true,
  };
    networks.flow = {
    url: "https://testnet.evm.nodes.onflow.org",
    chainId: 545,
    accounts: [process.env.DEPLOYER_PRIVATE_KEY || ""],
    axelar: getAxelarAddressesFlow("flow"),
    isSourceChain: true,
  };
}

if (env === "mainnet") {
  networks.filecoin = {
    url: "https://api.node.glif.io",
    accounts: [process.env.DEPLOYER_PRIVATE_KEY || ""],
    axelar: getAxelarAddresses("filecoin"),
  };
  networks.linea = {
    url: "https://rpc.linea.build",
    chainId: 59144,
    accounts: [process.env.DEPLOYER_PRIVATE_KEY || ""],
    axelar: getAxelarAddresses("linea"),
    isSourceChain: true,
  };
  networks.arbitrum = {
    url: "https://arb1.arbitrum.io/rpc",
    chainId: 42161,
    accounts: [process.env.DEPLOYER_PRIVATE_KEY || ""],
    axelar: getAxelarAddresses("arbitrum"),
    isSourceChain: true,
  };
  networks.avalanche = {
    url: "https://api.avax.network/ext/bc/C/rpc",
    chainId: 43114,
    accounts: [process.env.DEPLOYER_PRIVATE_KEY || ""],
    axelar: getAxelarAddresses("avalanche"),
    isSourceChain: true,
  };

}

/**
 * Hardhat configuration with selected networks.
 */
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.21",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  defaultNetwork: "hardhat",
  networks, // Use only relevant testnet or mainnet chains
  etherscan: {
    apiKey: {
      avalanche: "avalanche", // apiKey is not required, just set a placeholder
    },
    customChains: [
      {
        network: "avalanche",
        chainId: 43113,
        urls: {
          apiURL: "https://api.routescan.io/v2/network/testnet/evm/43113/etherscan",
          browserURL: "https://testnet.snowtrace.io/address"
        }
      }
    ]
  },
};

export default config;


