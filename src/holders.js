const vorpal = require("vorpal")();
const Web3 = require("web3");

const { environment } = require("../config/env");

const provider = `https://mainnet.infura.io/${environment.apiKey}`;

const wssProvider = `wss://mainnet.infura.io/ws`;

const web3 = new Web3(new Web3.providers.HttpProvider(provider));

const web3Wss = new Web3(new Web3.providers.WebsocketProvider(wssProvider));

const EOS_CONTRACT_ABI = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "bytes32" }],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "stop",
    outputs: [],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "guy", type: "address" },
      { name: "wad", type: "uint256" }
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "owner_", type: "address" }],
    name: "setOwner",
    outputs: [],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "src", type: "address" },
      { name: "dst", type: "address" },
      { name: "wad", type: "uint256" }
    ],
    name: "transferFrom",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "dst", type: "address" },
      { name: "wad", type: "uint128" }
    ],
    name: "push",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "name_", type: "bytes32" }],
    name: "setName",
    outputs: [],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "wad", type: "uint128" }],
    name: "mint",
    outputs: [],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "src", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "stopped",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "authority_", type: "address" }],
    name: "setAuthority",
    outputs: [],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "src", type: "address" },
      { name: "wad", type: "uint128" }
    ],
    name: "pull",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "wad", type: "uint128" }],
    name: "burn",
    outputs: [],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "bytes32" }],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "dst", type: "address" },
      { name: "wad", type: "uint256" }
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "start",
    outputs: [],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "authority",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { name: "src", type: "address" },
      { name: "guy", type: "address" }
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    type: "function"
  },
  {
    inputs: [{ name: "symbol_", type: "bytes32" }],
    payable: false,
    type: "constructor"
  },
  {
    anonymous: true,
    inputs: [
      { indexed: true, name: "sig", type: "bytes4" },
      { indexed: true, name: "guy", type: "address" },
      { indexed: true, name: "foo", type: "bytes32" },
      { indexed: true, name: "bar", type: "bytes32" },
      { indexed: false, name: "wad", type: "uint256" },
      { indexed: false, name: "fax", type: "bytes" }
    ],
    name: "LogNote",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, name: "authority", type: "address" }],
    name: "LogSetAuthority",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, name: "owner", type: "address" }],
    name: "LogSetOwner",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "from", type: "address" },
      { indexed: true, name: "to", type: "address" },
      { indexed: false, name: "value", type: "uint256" }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "owner", type: "address" },
      { indexed: true, name: "spender", type: "address" },
      { indexed: false, name: "value", type: "uint256" }
    ],
    name: "Approval",
    type: "event"
  }
];

const EOS_CONTRACT_ADDRESS = "0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0";

const EOS_CONTRACT_FROM_BLOCK = 5142727;
const EOS_CONTRACT_TO_BLOCK = 5142728;

const setupContract = () => {
  return new web3.eth.Contract(EOS_CONTRACT_ABI, EOS_CONTRACT_ADDRESS);
};

const setupContractWss = () => {
  return new web3Wss.eth.Contract(EOS_CONTRACT_ABI, EOS_CONTRACT_ADDRESS);
};

const getTransfers = (useWss, _fromBlock, _toBlock) => {
  let eos = useWss ? setupContractWss() : setupContract();
  let fromBlock =
    typeof _fromBlock === "undefined" ? EOS_CONTRACT_FROM_BLOCK : _fromBlock;
  let toBlock =
    typeof _toBlock === "undefined" ? EOS_CONTRACT_TO_BLOCK : _toBlock;
  console.log("fromBlock", fromBlock);
  console.log("toBlock", toBlock);
  eos.getPastEvents(
    "Transfer",
    {
      fromBlock: fromBlock,
      toBlock: toBlock
    },
    async (error, logs) => {
      if (error) {
        console.log(error);
      }
      let holders = [];
      for (let i = 0; i < logs.length; i++) {
        const element = logs[i];
        let eventInfo = element.returnValues;
        let addLine = {
          from: eventInfo.from,
          to: eventInfo.to,
          value: eventInfo.value
        };
        holders.push(addLine);
        // console.log(
        //   `From: ${eventInfo.from} - To: ${eventInfo.to} - Value: ${
        //     eventInfo.value
        //   }`
        // );
      }
      console.log("Holders ", holders);
    }
  );
};

vorpal
  .command("getHolders", "Get EOS Holders")
  .option("-f, --fromBlock <fromBlock>", "From Block")
  .option("-t, --toBlock <toBlock>", "From Block")
  .action(function(args, callback) {
    getTransfers(false, args.options.fromBlock, args.options.toBlock);
    callback();
  });

vorpal.command("test", "Tests Web3").action(function(args, callback) {
  getTransfers(false);
  callback();
});

vorpal.command("testWss", "Tests Web3Wss").action(function(args, callback) {
  getTransfers(true);
  callback();
});

vorpal.delimiter("holders$").show();
