const BEP20_ABI = [{
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [{
        "name": "",
        "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "guy",
        "type": "address"
    }, {
        "name": "wad",
        "type": "uint256"
    }],
    "name": "approve",
    "outputs": [{
        "name": "",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "src",
        "type": "address"
    }, {
        "name": "dst",
        "type": "address"
    }, {
        "name": "wad",
        "type": "uint256"
    }],
    "name": "transferFrom",
    "outputs": [{
        "name": "",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "wad",
        "type": "uint256"
    }],
    "name": "withdraw",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{
        "name": "",
        "type": "uint8"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "",
        "type": "address"
    }],
    "name": "balanceOf",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{
        "name": "",
        "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "dst",
        "type": "address"
    }, {
        "name": "wad",
        "type": "uint256"
    }],
    "name": "transfer",
    "outputs": [{
        "name": "",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "deposit",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "",
        "type": "address"
    }, {
        "name": "",
        "type": "address"
    }],
    "name": "allowance",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "name": "src",
        "type": "address"
    }, {
        "indexed": true,
        "name": "guy",
        "type": "address"
    }, {
        "indexed": false,
        "name": "wad",
        "type": "uint256"
    }],
    "name": "Approval",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "name": "src",
        "type": "address"
    }, {
        "indexed": true,
        "name": "dst",
        "type": "address"
    }, {
        "indexed": false,
        "name": "wad",
        "type": "uint256"
    }],
    "name": "Transfer",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "name": "dst",
        "type": "address"
    }, {
        "indexed": false,
        "name": "wad",
        "type": "uint256"
    }],
    "name": "Deposit",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "name": "src",
        "type": "address"
    }, {
        "indexed": false,
        "name": "wad",
        "type": "uint256"
    }],
    "name": "Withdrawal",
    "type": "event"
}];
const PANCAKE_POOL_ABI = [{
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
    }],
    "name": "Approval",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount0",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount1",
        "type": "uint256"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
    }],
    "name": "Burn",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount0",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount1",
        "type": "uint256"
    }],
    "name": "Mint",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount0In",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount1In",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount0Out",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount1Out",
        "type": "uint256"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
    }],
    "name": "Swap",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "uint112",
        "name": "reserve0",
        "type": "uint112"
    }, {
        "indexed": false,
        "internalType": "uint112",
        "name": "reserve1",
        "type": "uint112"
    }],
    "name": "Sync",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
    }],
    "name": "Transfer",
    "type": "event"
}, {
    "constant": true,
    "inputs": [],
    "name": "DOMAIN_SEPARATOR",
    "outputs": [{
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "MINIMUM_LIQUIDITY",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "PERMIT_TYPEHASH",
    "outputs": [{
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "name": "allowance",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "internalType": "address",
        "name": "spender",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
    }],
    "name": "approve",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "name": "balanceOf",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "internalType": "address",
        "name": "to",
        "type": "address"
    }],
    "name": "burn",
    "outputs": [{
        "internalType": "uint256",
        "name": "amount0",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "amount1",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "factory",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getReserves",
    "outputs": [{
        "internalType": "uint112",
        "name": "_reserve0",
        "type": "uint112"
    }, {
        "internalType": "uint112",
        "name": "_reserve1",
        "type": "uint112"
    }, {
        "internalType": "uint32",
        "name": "_blockTimestampLast",
        "type": "uint32"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "internalType": "address",
        "name": "_token0",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "_token1",
        "type": "address"
    }],
    "name": "initialize",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "kLast",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "internalType": "address",
        "name": "to",
        "type": "address"
    }],
    "name": "mint",
    "outputs": [{
        "internalType": "uint256",
        "name": "liquidity",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [{
        "internalType": "string",
        "name": "",
        "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "name": "nonces",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "internalType": "address",
        "name": "owner",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "spender",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
    }, {
        "internalType": "uint8",
        "name": "v",
        "type": "uint8"
    }, {
        "internalType": "bytes32",
        "name": "r",
        "type": "bytes32"
    }, {
        "internalType": "bytes32",
        "name": "s",
        "type": "bytes32"
    }],
    "name": "permit",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "price0CumulativeLast",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "price1CumulativeLast",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "internalType": "address",
        "name": "to",
        "type": "address"
    }],
    "name": "skim",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "internalType": "uint256",
        "name": "amount0Out",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "amount1Out",
        "type": "uint256"
    }, {
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
    }],
    "name": "swap",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{
        "internalType": "string",
        "name": "",
        "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "sync",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "token0",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "token1",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
    }],
    "name": "transfer",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "internalType": "address",
        "name": "from",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
    }],
    "name": "transferFrom",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}];
const FARM_ABI = [{
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "name": "Deposit",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "name": "EmergencyWithdraw",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
    }],
    "name": "OwnershipTransferred",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "name": "Withdraw",
    "type": "event"
}, {
    "inputs": [],
    "name": "NATIVE",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "NATIVEMaxSupply",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "NATIVEPerBlock",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_allocPoint",
        "type": "uint256"
    }, {
        "internalType": "contract IERC20",
        "name": "_want",
        "type": "address"
    }, {
        "internalType": "bool",
        "name": "_withUpdate",
        "type": "bool"
    }, {
        "internalType": "address",
        "name": "_strat",
        "type": "address"
    }],
    "name": "add",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "_wantAmt",
        "type": "uint256"
    }],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
    }],
    "name": "emergencyWithdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_from",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "_to",
        "type": "uint256"
    }],
    "name": "getMultiplier",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "_token",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
    }],
    "name": "inCaseTokensGetStuck",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "massUpdatePools",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "owner",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "ownerNATIVEReward",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
    }, {
        "internalType": "address",
        "name": "_user",
        "type": "address"
    }],
    "name": "pendingNATIVE",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "name": "poolInfo",
    "outputs": [{
        "internalType": "contract IERC20",
        "name": "want",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "allocPoint",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "lastRewardBlock",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "accNATIVEPerShare",
        "type": "uint256"
    }, {
        "internalType": "address",
        "name": "strat",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "poolLength",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "_allocPoint",
        "type": "uint256"
    }, {
        "internalType": "bool",
        "name": "_withUpdate",
        "type": "bool"
    }],
    "name": "set",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
    }, {
        "internalType": "address",
        "name": "_user",
        "type": "address"
    }],
    "name": "stakedWantTokens",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "startBlock",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "totalAllocPoint",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
    }],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
    }],
    "name": "updatePool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }, {
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "name": "userInfo",
    "outputs": [{
        "internalType": "uint256",
        "name": "shares",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "rewardDebt",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "_wantAmt",
        "type": "uint256"
    }],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
    }],
    "name": "withdrawAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}]
let CryptoUtils = (function() {
    let r = {
            publicProvider: null,
            getPublicProvider: function() {
                if (r.publicProvider === null) {
                    r.publicProvider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
                }
                return r.publicProvider;
            },
            loadData: function() {
                let box = $('.app .content');
                CryptoUtils.PRICES_ALL = box.data('prices-all');
                CryptoUtils.BSC_NETWORKS = box.data('bsc-networks');
                CryptoUtils.BEP20_CONTRACTS = box.data('bep20-token-contracts');
                CryptoUtils.FARM_CONTRACT = box.data('farm-contract');
                CryptoUtils.NATIVE_TOKEN_TICKER = box.data('native-token-ticker');
                CryptoUtils.NATIVE_TOKEN_DISPLAY_DECIMALS = box.data('native-token-display-decimals');
                CryptoUtils.NATIVE_TOKEN_BEP20_CONTRACT = box.data('native-token-bep20-contract');
                CryptoUtils.PANCAKE_BNB_NATIVE_POOL_CONTRACT = box.data('pankcake-bnb-native-pool-contract');
                CryptoUtils.PANCAKE_BNB_STABLECOIN_POOL_CONTRACT = box.data('pancake-bnb-stablecoin-pool-contract');
                CryptoUtils.OVERRIDES.gasLimit = parseInt(box.data('gas-limit'));
            },
        },
        u = {
            PRICES_ALL: null,
            BSC_NETWORKS: null,
            BEP20_CONTRACTS: null,
            FARM_CONTRACT: null,
            NATIVE_TOKEN_TICKER: null,
            NATIVE_TOKEN_DISPLAY_DECIMALS: null,
            NATIVE_TOKEN_BEP20_CONTRACT: null,
            PANCAKE_BNB_NATIVE_POOL_CONTRACT: null,
            PANCAKE_BNB_STABLECOIN_POOL_CONTRACT: null,
            OVERRIDES: {
                gasLimit: 1000000,
            },
            CONTRACTS: {},
            getCachedContract: function(key, defaultValue) {
                if (key in this.CONTRACTS) {
                    return this.CONTRACTS[key];
                }
                this.CONTRACTS[key] = defaultValue;
                return defaultValue;
            },
            getUint256Max: function() {
                return ethers.constants.MaxUint256;
            },
            getCurrencyPriceUSD: function(currencyId) {
                if (this.PRICES_ALL !== null && this.PRICES_ALL.hasOwnProperty(currencyId)) {
                    return this.PRICES_ALL[currencyId] > 0 ? this.PRICES_ALL[currencyId] : -1;
                }
                return -1;
            },
            getGasBalance: function(walletAddress, provider, callback) {
                provider.getBalance(walletAddress).then(result => {
                    callback(true, {
                        balance: result,
                        formattedBalance: ethers.utils.formatEther(result),
                    });
                }).catch(error => {
                    callback(false, {
                        error: error,
                    });
                });
            },
            getGasPrice: function(provider, callback) {
                provider.getGasPrice().then(result => {
                    callback(true, {
                        gasPrice: result,
                        formattedGasPrice: ethers.utils.formatEther(result),
                    });
                }).catch(error => {
                    callback(false, {
                        error: error,
                    });
                });
            },
            getTokenBalance: function(walletAddress, contractAddress, provider, callback) {
                let contract = this.getCachedContract(walletAddress + contractAddress, new ethers.Contract(contractAddress, BEP20_ABI, provider));
                contract.balanceOf(walletAddress).then(result => {
                    callback(true, {
                        balance: result,
                        formattedBalance: ethers.utils.formatEther(result),
                    });
                }).catch(error => {
                    callback(false, {
                        error: error,
                    })
                });
            },
            getFarmTokenBalance: function(walletAddress, provider, callback) {
                this.getTokenBalance(walletAddress, this.NATIVE_TOKEN_BEP20_CONTRACT, provider, callback);
            },
            getNetworkInfo: function(provider, callback) {
                provider.getNetwork().then(result => {
                    callback(true, {
                        id: result.chainId,
                        name: CryptoUtils.BSC_NETWORKS[result.chainId],
                    });
                }).catch(error => {
                    callback(false, {
                        error: error,
                    });
                });
            },
            getNativeLastPrice: function(callback) {
                let pancakeNativeContract = this.getCachedContract(this.PANCAKE_BNB_STABLECOIN_POOL_CONTRACT + 'last', new ethers.Contract(this.PANCAKE_BNB_NATIVE_POOL_CONTRACT, PANCAKE_POOL_ABI, this.getPublicProvider())),
                    pancakeStableContract = this.getCachedContract(this.PANCAKE_BNB_STABLECOIN_POOL_CONTRACT + 'last', new ethers.Contract(this.PANCAKE_BNB_STABLECOIN_POOL_CONTRACT, PANCAKE_POOL_ABI, this.getPublicProvider()));
                const stableContractPromise = pancakeStableContract.getReserves();
                const nativeContractPromise = pancakeNativeContract.getReserves();
                Promise.all([stableContractPromise, nativeContractPromise]).then(reserves => {
                    let bnbPrice = parseFloat(ethers.utils.formatEther(reserves[0]._reserve1)) / parseFloat(ethers.utils.formatEther(reserves[0]._reserve0));
                    let tokenPrice = parseFloat(ethers.utils.formatEther(reserves[1]._reserve0)) / parseFloat(ethers.utils.formatEther(reserves[1]._reserve1));
                    callback(true, {
                        bnbPrice: bnbPrice,
                        tokenPrice: tokenPrice * bnbPrice,
                    });
                }).catch(error => {
                    callback(false, {
                        error: error,
                    });
                });
            },
            getAllowance: function(walletAddress, tokenContract, callback) {
                let contract = this.getCachedContract(walletAddress + tokenContract, new ethers.Contract(tokenContract, BEP20_ABI, this.getPublicProvider()));
                contract.allowance(walletAddress, CryptoUtils.FARM_CONTRACT).then(result => {
                    callback(true, {
                        allowance: parseFloat(ethers.utils.formatEther(result)),
                    });
                }).catch(error => {
                    callback(false, {
                        error: error,
                    });
                });
            },
            getHarvestPending: function(pid, address, callback) {
                let contract = this.getCachedContract(CryptoUtils.FARM_CONTRACT, new ethers.Contract(CryptoUtils.FARM_CONTRACT, FARM_ABI, this.getPublicProvider()));
                contract.pendingNATIVE(pid, address).then(result => {
                    callback(true, {
                        pending: parseFloat(ethers.utils.formatEther(result)),
                    });
                }).catch(error => {
                    callback(false, {
                        error: error,
                    });
                });
            },
            getHarvestPendingAsync: async function(pid, address) {
                let contract = this.getCachedContract(CryptoUtils.FARM_CONTRACT, new ethers.Contract(CryptoUtils.FARM_CONTRACT, FARM_ABI, this.getPublicProvider()));
                try {
                    return ethers.utils.formatEther(await contract.pendingNATIVE(pid, address));
                } catch (e) {
                    return 0.0;
                }
            },
            getStakedTokens: function(pid, address, callback) {
                let contract = this.getCachedContract(CryptoUtils.FARM_CONTRACT, new ethers.Contract(CryptoUtils.FARM_CONTRACT, FARM_ABI, this.getPublicProvider()));
                contract.stakedWantTokens(pid, address).then(result => {
                    callback(true, {
                        balance: result,
                        formattedBalance: ethers.utils.formatEther(result),
                    });
                }).catch(error => {
                    callback(false, {
                        error: error,
                    });
                });
            },
            getBEP20TotalSupply: function(tokenContract, callback) {
                let contract = this.getCachedContract(tokenContract, new ethers.Contract(tokenContract, BEP20_ABI, this.getPublicProvider()));
                contract.totalSupply().then(result => {
                    callback(true, {
                        supply: result,
                        formattedSupply: ethers.utils.formatEther(result),
                    });
                }).catch(error => {
                    callback(false, {
                        error: error,
                    });
                });
            },
            approve: function(tokenContract, amountHex, signedProvider, callback) {
                let contract = this.getCachedContract(tokenContract + 'signed', new ethers.Contract(tokenContract, BEP20_ABI, signedProvider)),
                    contractWithSigner = contract.connect(signedProvider.getSigner());
                contractWithSigner.approve(CryptoUtils.FARM_CONTRACT, amountHex, this.OVERRIDES).then(result => {
                    let hash = result.hash;
                    signedProvider.waitForTransaction(hash, 1).then(result => {
                        callback(true, {
                            hash: hash,
                        });
                    });
                }).catch(error => {
                    callback(false, {
                        error: error,
                    });
                });
            },
            deposit: function(pid, amount, signedProvider, callback) {
                let contract = this.getCachedContract(CryptoUtils.FARM_CONTRACT + 'signed', new ethers.Contract(CryptoUtils.FARM_CONTRACT, FARM_ABI, signedProvider)),
                    contractWithSigner = contract.connect(signedProvider.getSigner());
                contractWithSigner.deposit(pid, ethers.utils.parseEther(amount), this.OVERRIDES).then(result => {
                    let hash = result.hash;
                    signedProvider.waitForTransaction(hash, 1).then(result => {
                        callback(true, {
                            hash: hash,
                        });
                    });
                }).catch(error => {
                    callback(false, {
                        error: error,
                    });
                });
            },
            withdraw: function(pid, amount, signedProvider, callback) {
                let contract = this.getCachedContract(CryptoUtils.FARM_CONTRACT + 'signed', new ethers.Contract(CryptoUtils.FARM_CONTRACT, FARM_ABI, signedProvider)),
                    contractWithSigner = contract.connect(signedProvider.getSigner());
                amount = amount === ethers.constants.MaxUint256 ? ethers.constants.MaxUint256 : ethers.utils.parseEther(amount);
                contractWithSigner.withdraw(pid, amount, this.OVERRIDES).then(result => {
                    let hash = result.hash;
                    signedProvider.waitForTransaction(hash, 1).then(result => {
                        callback(true, {
                            hash: hash,
                        });
                    }).catch(error => {
                        callback(false, {
                            hash: hash,
                        });
                    });
                }).catch(error => {
                    callback(false, {
                        error: error,
                    });
                });
            },
            withdrawAll: function(pid, signedProvider, callback) {
                this.withdraw(pid, ethers.constants.MaxUint256, signedProvider, callback);
            },
            harvestMultipleWaitForTx: async function(pids, amount, signedProvider, callback) {
                let contract = this.getCachedContract(CryptoUtils.FARM_CONTRACT + 'signed', new ethers.Contract(CryptoUtils.FARM_CONTRACT, FARM_ABI, signedProvider)),
                    contractWithSigner = contract.connect(signedProvider.getSigner());
                for (let i = 0; i < pids.length; i++) {
                    try {
                        let tx = await contractWithSigner.withdraw(pids[i], '0', this.OVERRIDES);
                        callback(true, {
                            status: 'broadcasted',
                            pid: pids[i],
                        });
                        await tx.wait(1);
                        callback(true, {
                            status: 'tx_done',
                            pid: pids[i],
                        });
                    } catch (e) {
                        callback(false, {
                            status: 'canceled',
                            pid: pids[i],
                        });
                        return;
                    }
                }
                await FrontendCommon.sleep(500);
                callback(true, {
                    status: 'done',
                });
            },
            harvestMultiple: async function(pids, account, signedProvider, callback) {
                let contract = this.getCachedContract(CryptoUtils.FARM_CONTRACT + 'signed', new ethers.Contract(CryptoUtils.FARM_CONTRACT, FARM_ABI, signedProvider)),
                    originalNonce = await signedProvider.getTransactionCount(account),
                    contractWithSigner = contract.connect(signedProvider.getSigner()),
                    txs = [];
                for (let i = 0; i < pids.length; i++) {
                    let overrides = {
                        gasLimit: this.OVERRIDES.gasLimit,
                        nonce: originalNonce,
                    };
                    try {
                        let tx = await contractWithSigner.withdraw(pids[i], '0', overrides);
                        txs.push({
                            pid: pids[i],
                            tx: tx,
                        });
                        originalNonce += 1;
                        callback(true, {
                            status: 'broadcasted',
                            pid: pids[i],
                        });
                    } catch (e) {
                        callback(false, {
                            status: 'canceled',
                            pid: pids[i],
                        });
                        return;
                    }
                }
                for (let i = 0; i < pids.length; i++) {
                    await txs[i].tx.wait(1);
                    callback(true, {
                        status: 'tx_done',
                        pid: txs[i].pid,
                    });
                    await FrontendCommon.sleep(500);
                }
                callback(true, {
                    status: 'done',
                });
            },
            harvest: function(pid, signedProvider, callback) {
                this.withdraw(pid, '0', signedProvider, callback);
            },
            getPublicProvider: function() {
                return r.getPublicProvider();
            },
            initialize: function() {
                r.loadData();
            }
        };
    return u;
}());
CryptoUtils.initialize();