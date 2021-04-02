let Providers = {
    METAMASK: {
        name: 'Metamask',
        description: 'Metamask',
        tag: 'injected',
    },
    BINANCE_WALLET: {
        name: 'Binance',
        description: 'Binance Chain Wallet',
        tag: 'custom-binance',
    },
    WALLET_CONNECT: {
        name: 'Wallet Connect',
        description: 'Wallet Connect for Binance Smart Chain',
        tag: 'custom-wc',
    },
};
let Wallet = (function() {
    const Web3Modal = window.Web3Modal.default;
    const WalletConnectProvider = window.WalletConnectProvider.default;
    const Fortmatic = window.Fortmatic;
    let web3Modal = null;
    let provider = null;
    let modalProvider = null;
    let accounts = null;
    let usingWalletConnect = false;
    let r = {
            loadWalletSelfCached: async function() {
                await FrontendCommon.sleep(1000);
                try {
                    modalProvider = await web3Modal.connect();
                    provider = new ethers.providers.Web3Provider(modalProvider);
                    accounts = await provider.listAccounts();
                    modalProvider.on('accountsChanged', function(_) {});
                } catch (exception) {
                    provider = null;
                    accounts = [];
                }
                FrontendApp.refreshWalletInfo();
                FrontendApp.refreshAllCards();
                FrontendApp.resetStatsStripe(true);
            },
            initializeProviderModal: async function() {
                const providerOptions = {};
                providerOptions[Providers.BINANCE_WALLET.tag] = {
                    display: {
                        logo: $('.app .content').data('binance-icon-url'),
                        name: Providers.BINANCE_WALLET.name,
                        description: Providers.BINANCE_WALLET.description,
                    },
                    package: WalletConnectProvider,
                    connector: async (_, data) => {
                        let provider = window.BinanceChain;
                        await provider.enable();
                        return provider;
                    },
                };
                providerOptions[Providers.WALLET_CONNECT.tag] = {
                    display: {
                        logo: $('.app .content').data('walletconnect-icon-url'),
                        name: Providers.WALLET_CONNECT.name,
                        description: Providers.WALLET_CONNECT.description,
                    },
                    package: new WalletConnectProvider({
                        chainId: 56,
                        rpc: {
                            56: 'https://bsc-dataseed.binance.org/',
                        },
                    }),
                    connector: async (providerInstance, data) => {
                        setTimeout(function() {
                            $('.walletconnect-modal__header').click(function() {
                                Wallet.disconnect();
                            });
                        }, 500);
                        await providerInstance.enable();
                        usingWalletConnect = true;
                        return providerInstance;
                    },
                };
                web3Modal = new Web3Modal({
                    cacheProvider: true,
                    providerOptions,
                    network: 56,
                    disableInjectedProvider: false,
                    theme: {
                        background: '#1D2F3B',
                        main: '#FFFFFF',
                        secondary: '#CCF66C',
                        border: '#3C4E5A',
                        hover: '#3C4E5A',
                    }
                });
                $('header .wallet .btn-wallet').click(async function(ev) {
                    ev.preventDefault();
                    await Wallet.connect();
                });
            },
            getCachedProvider: function() {
                return FrontendCommon.getLocalItem('WEB3_CONNECT_CACHED_PROVIDER', null);
            },
            onProviderConnection: function(provider, name) {
                provider.on('connect', function() {});
                provider.on('disconnect', function() {});
            },
        },
        u = {
            harvestAll: async function(pids, callback) {
                if (!this.isConnected()) {
                    return false;
                }
                if (r.getCachedProvider() === Providers.BINANCE_WALLET.tag) {
                    await CryptoUtils.harvestMultipleWaitForTx(pids, Wallet.getAccounts()[0], this.getProvider(), callback);
                } else {
                    await CryptoUtils.harvestMultiple(pids, Wallet.getAccounts()[0], this.getProvider(), callback);
                }
            },
            harvest: function(pid, callback) {
                if (!this.isConnected()) {
                    callback(false, {});
                    return;
                }
                CryptoUtils.harvest(pid, this.getProvider(), callback);
            },
            withdraw: function(pid, amount, callback) {
                if (!this.isConnected()) {
                    callback(false, {});
                    return;
                }
                CryptoUtils.withdraw(pid, amount, this.getProvider(), callback);
            },
            deposit: function(pid, amount, tokenContract, callback) {
                if (!this.isConnected) {
                    callback(false, {
                        error: 'Wallet is not connected.',
                    });
                    return;
                }
                CryptoUtils.getAllowance(Wallet.getAccounts()[0], tokenContract, (result, data) => {
                    if (result) {
                        if (data.allowance === 0) {
                            CryptoUtils.approve(tokenContract, CryptoUtils.getUint256Max(), this.getProvider(), (result, data) => {
                                if (result) {
                                    CryptoUtils.deposit(pid, amount, this.getProvider(), callback);
                                } else {
                                    callback(false, {
                                        error: 'Allowance was not approved',
                                    });
                                }
                            });
                        } else {
                            CryptoUtils.deposit(pid, amount, this.getProvider(), callback);
                        }
                    } else {
                        callback(false, {
                            error: 'Allowance network error',
                        });
                    }
                });
            },
            gasBalance: function(callback) {
                if (!this.isConnected()) {
                    callback(false, {
                        error: 'Wallet is not connected',
                    });
                    return;
                }
                CryptoUtils.getGasBalance(Wallet.getAccounts()[0], this.getProvider(), callback);
            },
            balance: function(tokenContract, callback) {
                if (!this.isConnected()) {
                    callback(false, {
                        error: 'Wallet is not connected',
                    });
                    return;
                }
                CryptoUtils.getTokenBalance(Wallet.getAccounts()[0], tokenContract, this.getProvider(), callback);
            },
            balanceInVault: function(pid, callback) {
                if (!this.isConnected()) {
                    callback(false, {
                        error: 'Wallet is not connected',
                    });
                    return;
                }
                CryptoUtils.getStakedTokens(pid, Wallet.getAccounts()[0], callback);
            },
            connect: async function() {
                await r.loadWalletSelfCached();
            },
            disconnect: async function() {
                provider = null;
                accounts = null;
                FrontendApp.resetStatsStripe(false);
                await web3Modal.clearCachedProvider();
            },
            getProvider: function() {
                return provider;
            },
            getAccounts: function() {
                return accounts;
            },
            isConnected: function() {
                return provider !== null && accounts !== null && accounts.length > 0;
            },
            initialize: async function() {
                await r.initializeProviderModal();
                await this.connect();
            },
        };
    return u;
})();