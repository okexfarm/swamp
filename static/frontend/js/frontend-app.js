let FrontendApp = (function() {
    const FILTER_VALUE_ALL = -1;
    const FILTER_PLATFORM = 'FILTER_PLATFORM';
    const FILTER_POOL_TYPE = 'FILTER_POOL_TYPE';
    const FILTER_ASSET = 'FILTER_ASSET';
    const FILTER_ZERO_BALANCES = 'FILTER_ZERO_BALANCES';
    const SORT_STORAGE_KEY = 'SORT_KEY';
    const SORT_KEY_DEFAULT = 'default';
    const SORT_KEY_NAME = 'name';
    const SORT_KEY_BALANCE = 'balance';
    const SORT_KEY_DEPOSITED = 'deposited';
    const SORT_KEY_APY = 'apy';
    const SORT_KEY_DAILY = 'daily';
    const SORT_KEY_TVL = 'tvl';
    const SORT_VALUE_DEFAULT = SORT_KEY_NAME;
    const REFRESH_SLEEP_PER_CARD = 2000;
    const REFRESH_SLEEP_STATS_STRIPE = 10000;
    const E = 0.0000001;
    let r = {
            accountBalanceInitialized: false,
            accountBalanceTippyInstance: null,
            harvestableAmount: 0,
            harvestableVaults: null,
            initFilteringSorting: function() {
                let cardsContainer = $('.pools'),
                    cards = cardsContainer.find('.pool-card'),
                    hideZeroBalancesToggle = $('.checkbox-container.hide-zero-balance input'),
                    searchInput = $('.input-container.search input'),
                    dropdownPlatform = $('.dropdown-wrapper.platform'),
                    dropdownPoolType = $('.dropdown-wrapper.pool-type'),
                    dropdownAsset = $('.dropdown-wrapper.asset'),
                    dropdownSort = $('.dropdown-wrapper.sort');
                FrontendCommon.deleteLocalItem(FILTER_ZERO_BALANCES);
                FrontendCommon.deleteLocalItem(FILTER_PLATFORM);
                FrontendCommon.deleteLocalItem(FILTER_POOL_TYPE);
                FrontendCommon.deleteLocalItem(FILTER_ASSET);
                searchInput.keyup(function() {
                    filterCards(searchInput.val().trim());
                    sortCards();
                });
                hideZeroBalancesToggle.change(function() {
                    FrontendCommon.setLocalItem(FILTER_ZERO_BALANCES, this.checked);
                    filterCards();
                    sortCards();
                });
                dropdownPlatform.bind('onItemSelected', function(ev, data) {
                    FrontendCommon.setLocalItem(FILTER_PLATFORM, data.value);
                    filterCards();
                    sortCards();
                });
                dropdownPoolType.bind('onItemSelected', function(ev, data) {
                    FrontendCommon.setLocalItem(FILTER_POOL_TYPE, data.value);
                    filterCards();
                    sortCards();
                });
                dropdownAsset.bind('onItemSelected', function(ev, data) {
                    FrontendCommon.setLocalItem(FILTER_ASSET, data.value);
                    filterCards();
                    sortCards();
                });
                dropdownSort.bind('onItemSelected', function(ev, data) {
                    FrontendCommon.setLocalItem(SORT_STORAGE_KEY, data.value);
                    filterCards();
                    sortCards();
                });
                let sortCards = function() {
                    let sortKey = FrontendCommon.getLocalItem(SORT_STORAGE_KEY, SORT_VALUE_DEFAULT);
                    cardsContainer.append(cards.sort(function(card0, card1) {
                        let $card0 = $(card0),
                            $card1 = $(card1);
                        if (sortKey === SORT_KEY_DEFAULT) {
                            return $card0.data('sort-value') - $card1.data('sort-value');
                        } else if (sortKey === SORT_KEY_NAME) {
                            return $card0.data('pool-title').localeCompare($card1.data('pool-title'));
                        } else if (sortKey === SORT_KEY_BALANCE) {
                            return parseFloat($card1.data('balance')) - parseFloat($card0.data('balance'));
                        } else if (sortKey === SORT_KEY_DEPOSITED) {
                            return parseFloat($card1.data('deposited')) - parseFloat($card0.data('deposited'));
                        } else if (sortKey === SORT_KEY_APY) {
                            return parseFloat($card1.data('apy')) - parseFloat($card0.data('apy'));
                        } else if (sortKey === SORT_KEY_DAILY) {
                            return parseFloat($card1.data('daily')) - parseFloat($card0.data('daily'));
                        } else if (sortKey === SORT_KEY_TVL) {
                            return parseFloat($card1.data('tvl')) - parseFloat($card0.data('tvl'));
                        }
                    }));
                };
                let filterCards = function(searchQuery = '') {
                    cards.each(function() {
                        let card = $(this),
                            cardPoolTitle = card.data('pool-title'),
                            cardPlatformId = card.data('platform'),
                            cardPoolTypeId = card.data('pool-type'),
                            cardCurrencyId = card.data('currencies'),
                            cardBalance = parseFloat(card.attr('data-balance')),
                            cardDeposited = parseFloat(card.attr('data-deposited'));
                        let filterPlatformId = FrontendCommon.getLocalItem(FILTER_PLATFORM, FILTER_VALUE_ALL),
                            filterPoolTypeId = FrontendCommon.getLocalItem(FILTER_POOL_TYPE, FILTER_VALUE_ALL),
                            filterCurrencyId = FrontendCommon.getLocalItem(FILTER_ASSET, FILTER_VALUE_ALL),
                            filterZeroBalances = FrontendCommon.getLocalItem(FILTER_ZERO_BALANCES, false);
                        if ((cardPlatformId === filterPlatformId || filterPlatformId === FILTER_VALUE_ALL) && (cardPoolTypeId === filterPoolTypeId || filterPoolTypeId === FILTER_VALUE_ALL) && (cardCurrencyId.includes(filterCurrencyId) || filterCurrencyId === FILTER_VALUE_ALL) && (cardPoolTitle.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === '') && (!filterZeroBalances || (filterZeroBalances && (cardBalance > E || cardDeposited > E)))) {
                            card.show();
                        } else {
                            card.hide();
                        }
                    })
                };
            },
            initAccountBalances: function() {
                let header = $('header'),
                    connectWalletBtn = header.find('.wallet .btn-wallet'),
                    accountBalancesInfo = header.find('.wallet .balance'),
                    kswapPriceTxt = header.find('.kswap-price .txt.price'),
                    kswapBalanceTxt = header.find('.wallet .kswap-balance'),
                    buyKswapTxt = header.find('.btn.buy-kswap'),
                    walletAddress = header.find('span.wallet-address');
                header.bind('updateBalances', function() {
                    let provider = Wallet.getProvider(),
                        accounts = Wallet.getAccounts();
                    if (accounts !== null && accounts.length >= 1) {
                        header.trigger('toggleWalletInfo', {
                            visibility: Wallet.isConnected()
                        });
                        if (Wallet.isConnected()) {
                            walletAddress.text(`${FrontendCommon.truncateSliceString(accounts[0],6,4)}`);
                        }
                        CryptoUtils.getFarmTokenBalance(accounts[0], provider, function(success, result) {
                            if (success) {
                                kswapBalanceTxt.removeClass('hidden');
                                let amount = parseFloat(result.formattedBalance);
                                kswapBalanceTxt.text(`${FrontendCommon.formatNumberHumanize(amount,CryptoUtils.NATIVE_TOKEN_DISPLAY_DECIMALS)} ${CryptoUtils.NATIVE_TOKEN_TICKER}`);
                            } else {
                                console.error('Cannot retrieve KSWAP balance.');
                            }
                        });
                        if (!r.accountBalanceInitialized) {
                            FrontendWidgets.generateWalletAvatar(accounts[0]);
                            r.accountBalanceInitialized = true;
                        }
                    }
                });
                header.bind('toggleWalletInfo', function(ev, data) {
                    if (data !== null && data.hasOwnProperty('visibility')) {
                        connectWalletBtn.toggle(data.visibility === false);
                        accountBalancesInfo.toggleClass('hidden', data.visibility === false);
                        kswapBalanceTxt.toggleClass('hidden', data.visibility === false);
                    }
                });
                header.bind('updateNativeTokenPrice', function() {
                    kswapPriceTxt.text(`$${FrontendCommon.getLocalItem('NATIVE_TOKEN_PRICE','$0.00')}`);
                    let box = $('.app .content'),
                        url = box.data('api-prices-url'),
                        currencyNativeId = box.data('currency-native-id'),
                        popupKswap = $('#popup-buy-kswap'),
                        popupKswapPrice = popupKswap.find('.kswap-price');
                    $.ajax({
                        url: url,
                        type: 'GET',
                        dataType: 'json',
                        success: function(data) {
                            if (data.status === 'ok' && currencyNativeId in data.list) {
                                let tokenPrice = parseFloat(data.list[currencyNativeId]),
                                    formattedPrice = FrontendCommon.formatNumberHumanize(tokenPrice, 2);
                                kswapPriceTxt.text(`$${formattedPrice}`);
                                popupKswap.attr('data-kswap-price', tokenPrice);
                                popupKswapPrice.text(`$${formattedPrice}`);
                                FrontendCommon.setLocalItem('NATIVE_TOKEN_PRICE', formattedPrice);
                            }
                        }
                    });
                });
                buyKswapTxt.click(function() {
                    r.showDialogKswap();
                });
                tippy(accountBalancesInfo[0], {
                    content: 'Open account',
                    theme: 'swampy',
                });
                accountBalancesInfo.click(_ => {
                    r.showDialogAccount();
                });
            },
            initPoolCards: function() {
                let cards = $('.pool-card'),
                    depositInputContainer = cards.find('.transaction.deposit .input-container'),
                    depositInput = depositInputContainer.find('input'),
                    withdrawInputContainer = cards.find('.transaction.withdraw .input-container'),
                    withdrawInput = withdrawInputContainer.find('input');
                depositInputContainer.find('.max').click(function() {
                    let btn = $(this),
                        walletBalance = btn.closest('.pool-card').attr('data-balance'),
                        input = btn.siblings('input');
                    input.val(walletBalance);
                });
                withdrawInputContainer.find('.max').click(function() {
                    let btn = $(this),
                        withdrawBalance = btn.closest('.pool-card').attr('data-deposited'),
                        input = btn.siblings('input');
                    input.val(withdrawBalance);
                });
                cards.each(function(i, _) {
                    let card = $(this),
                        depositBtn = card.find('.transaction.deposit .btn.deposit'),
                        depositInputContainer = card.find('.transaction.deposit .input-container'),
                        depositInput = depositInputContainer.find('input'),
                        withdrawBtn = card.find('.transaction.withdraw .btn.withdraw'),
                        withdrawInputContainer = card.find('.transaction.withdraw .input-container'),
                        withdrawInput = withdrawInputContainer.find('input'),
                        harvestBtn = card.find('.transaction.harvest .btn.harvest'),
                        expandBtn = card.find('.btn.expand');
                    card.data('sort-value', i);
                    depositBtn.click(function() {
                        let pid = card.data('pid'),
                            tokenContract = depositBtn.data('currency-contract');
                        ga('send', {
                            hitType: 'event',
                            eventCategory: 'Button',
                            eventAction: 'deposit',
                        });
                        depositBtn.addClass('loading');
                        Wallet.deposit(pid, depositInput.val(), tokenContract, (result, _) => {
                            depositBtn.removeClass('loading');
                            depositInput.val(0);
                            if (result) {
                                FrontendWidgets.toggleTopNotification(true, 'Deposit has been successfully confirmed.', 5000);
                                r.refreshPoolCardMain(card);
                                r.refreshPoolCardDetails(card);
                            }
                        });
                    });
                    withdrawBtn.click(function() {
                        let pid = card.data('pid');
                        withdrawBtn.addClass('loading');
                        Wallet.withdraw(pid, withdrawInput.val(), (result, _) => {
                            withdrawBtn.removeClass('loading');
                            withdrawInput.val(0);
                            if (result) {
                                FrontendWidgets.toggleTopNotification(true, 'Withdrawal has been successfully confirmed.', 5000);
                                r.refreshPoolCardMain(card);
                                r.refreshPoolCardDetails(card);
                            }
                        });
                    });
                    harvestBtn.click(function() {
                        let pid = card.data('pid');
                        harvestBtn.addClass('loading');
                        Wallet.harvest(pid, function(result, _) {
                            harvestBtn.removeClass('loading');
                            if (result) {
                                FrontendWidgets.toggleTopNotification(true, 'Harvest has been successfully confirmed.', 5000);
                                r.refreshPoolCardMain(card);
                                r.refreshPoolCardDetails(card);
                            }
                        });
                    });
                    card.find('.transactions .transaction.deposit .swap a').click(function() {
                        if (card.data('is-lp')) {
                            r.showDialogLPToken(card);
                        } else {
                            r.showDialogSingleToken(card);
                        }
                    });
                    expandBtn.click(function() {
                        card.trigger('toggleExpand');
                    });
                    card.bind('toggleExpand', function(ev, data) {
                        let details = card.find('.details'),
                            isExpanded = card.hasClass('expanded');
                        if (data !== undefined && data.hasOwnProperty('forceExpand') && data.forceExpand === true && isExpanded) {
                            return;
                        }
                        isExpanded = !isExpanded;
                        card.toggleClass('expanded', isExpanded);
                        details.slideToggle(150);
                        if (isExpanded) {
                            r.refreshPoolCardDetails(card);
                        }
                        ev.stopPropagation();
                    });
                    FrontendCommon.initializeTippy(null, card.find($('.pool .tag.multiplier')), 'The multiplier represents the amount of KSWAP rewards each vaults gets. ' +
                        'Larger the multiplier, more KSWAP rewards the vault gets.', );
                    FrontendCommon.initializeTippy(null, card.find($('.info .pond-apy .tooltip')), 'Auto-compounded yield you receive from native farm');
                    FrontendCommon.initializeTippy(null, card.find($('.info .kswap-apy .tooltip')), 'Bonus reward given to kswap.net stakers');
                    card.bind('refreshCardMain', function() {
                        r.refreshPoolCardMain(card);
                    });
                });
            },
            initRefreshData: function() {
                const refreshCardsExpanded = async _ => {
                    let cards = $('.pool-card.expanded');
                    await FrontendCommon.sleep(REFRESH_SLEEP_PER_CARD * 4);
                    while (true) {
                        cards = $('.pool-card.expanded');
                        if (cards.length === 0) {
                            await FrontendCommon.sleep(REFRESH_SLEEP_PER_CARD);
                        }
                        for (let i = 0; i < cards.length; i++) {
                            let card = cards.eq(i);
                            if (FrontendCommon.isElementVisibleOnScreen(card[0])) {
                                r.refreshPoolCardDetails(card, false);
                                await FrontendCommon.sleep(REFRESH_SLEEP_PER_CARD);
                            }
                        }
                        await FrontendCommon.sleep(REFRESH_SLEEP_PER_CARD);
                    }
                };
                const refreshCards = async _ => {
                    let cards = $('.pool-card:not(.expanded)');
                    await FrontendCommon.sleep(REFRESH_SLEEP_PER_CARD * 4);
                    while (true) {
                        cards = $('.pool-card:not(.expanded)');
                        if (cards.length === 0) {
                            await FrontendCommon.sleep(REFRESH_SLEEP_PER_CARD);
                        }
                        for (let i = 0; i < cards.length; i++) {
                            let card = cards.eq(i);
                            if (FrontendCommon.isElementVisibleOnScreen(card[0])) {
                                r.refreshPoolCardDetails(card, false);
                                await FrontendCommon.sleep(REFRESH_SLEEP_PER_CARD / 2);
                                r.refreshPoolCardMain(cards.eq(i));
                                await FrontendCommon.sleep(REFRESH_SLEEP_PER_CARD / 2);
                            }
                        }
                        await FrontendCommon.sleep(REFRESH_SLEEP_PER_CARD);
                    }
                };
                const refreshStatsStripe = async (loop = true) => {
                    let cards = $('.pool-card'),
                        statsStripeBox = $('.stats-stripe'),
                        harvestAllPopup = $('#popup-harvest-all');
                    let ignoreUpdate = false,
                        totalDepositValue = 0,
                        totalPendingAmount = 0,
                        vaults = [],
                        card = null,
                        pid = 0,
                        depositedValue = 0,
                        pendingAmount = 0;
                    while (loop) {
                        if (cards.length === 0) {
                            await FrontendCommon.sleep(REFRESH_SLEEP_STATS_STRIPE);
                            continue;
                        }
                        ignoreUpdate = false;
                        totalDepositValue = 0;
                        totalPendingAmount = 0;
                        while (vaults.length > 0) {
                            vaults.pop();
                        }
                        if (Wallet.isConnected()) {
                            for (let i = 0; i < cards.length; i++) {
                                card = cards.eq(i);
                                pid = card.data('pid');
                                depositedValue = CryptoUtils.getCurrencyPriceUSD(card.data('currency-id')) * parseFloat(card.attr('data-deposited'));
                                if (card.data('updated') == false) {
                                    ignoreUpdate = true;
                                    break;
                                }
                                if (depositedValue > 0) {
                                    totalDepositValue += depositedValue;
                                }
                                pendingAmount = depositedValue > 0 ? parseFloat(await CryptoUtils.getHarvestPendingAsync(pid, Wallet.getAccounts()[0])) : 0;
                                if (pendingAmount > E) {
                                    vaults.push({
                                        pid: card.data('pid'),
                                        is_lp: card.data('is-lp'),
                                        title: card.data('pool-title'),
                                        pendingAmount: pendingAmount,
                                        token0_ticker: card.data('token0-ticker'),
                                        token1_ticker: card.data('token1-ticker'),
                                        include: true,
                                    });
                                }
                                totalPendingAmount += pendingAmount;
                            }
                        } else {
                            ignoreUpdate = true;
                        }
                        if (!ignoreUpdate) {
                            vaults = vaults.sort((a, b) => {
                                return b.pendingAmount - a.pendingAmount;
                            });
                            r.harvestableAmount = totalPendingAmount;
                            r.harvestableVaults = vaults.slice();
                            if (harvestAllPopup.data('is-harvesting') == false) {
                                harvestAllPopup.data('harvestable-amount', r.harvestableAmount);
                                harvestAllPopup.data('harvestable-vaults', r.harvestableVaults.slice());
                                harvestAllPopup.trigger('updateValues');
                                if (FrontendCommon.getElementData(harvestAllPopup, 'popup-visible', false)) {
                                    harvestAllPopup.trigger('updateTable');
                                }
                            }
                            statsStripeBox.trigger('toggleStripeLoading', {
                                loading: false,
                            });
                            statsStripeBox.trigger('updateDepositValue', {
                                depositValue: totalDepositValue
                            });
                            statsStripeBox.trigger('updatePendingValue', {
                                pendingAmount: totalPendingAmount
                            });
                            await FrontendCommon.sleep(REFRESH_SLEEP_STATS_STRIPE);
                        } else {
                            await FrontendCommon.sleep(250);
                        }
                    }
                };
                refreshCardsExpanded();
                refreshCards();
                refreshStatsStripe();
            },
            initStatsStripe: function() {
                let box = $('.stats-stripe'),
                    harvestAllPopup = $('#popup-harvest-all'),
                    visibilityBtn = box.find('.btn.show-hide'),
                    harvestAllBtn = box.find('.btn.harvest-all'),
                    nativeCurrencyId = $('.content').data('currency-native-id'),
                    depositValueTxt = box.find('.txt.total-deposit'),
                    pendingContainer = box.find('.txt.kswap-pending'),
                    pendingAmountTxt = box.find('.txt.kswap-pending span.amount'),
                    pendingAmountCountUp = box.data('pending-amount-countup'),
                    pendingValueTxt = box.find('.txt.kswap-pending span.value'),
                    pendingValueCountUp = box.data('pending-value-countup');
                visibilityBtn.click(_ => {
                    let statStripOptions = FrontendCommon.getLocalItem('STATS_STRIP_VISIBLE', true);
                    box.trigger('toggleVisibility', {
                        visible: !statStripOptions,
                    });
                });
                harvestAllBtn.click(_ => {
                    if (!harvestAllBtn.hasClass('disabled')) {
                        harvestAllPopup.data('harvestable-amount', r.harvestableAmount);
                        harvestAllPopup.data('harvestable-vaults', r.harvestableVaults.slice());
                        r.showPopupHarvestAll();
                    }
                });
                box.bind('toggleStripeLoading', function(_, data) {
                    if ('loading' in data) {
                        depositValueTxt.toggleClass('loading', data.loading);
                        pendingContainer.toggleClass('loading', data.loading);
                    }
                });
                box.bind('toggleVisibility', function(_, data) {
                    if ('visible' in data) {
                        FrontendCommon.setLocalItem('STATS_STRIP_VISIBLE', data.visible);
                        box.toggleClass('visible', data.visible);
                    }
                });
                box.bind('updateDepositValue', function(_, data) {
                    if ('depositValue' in data) {
                        if ('loading' in data && data.loading) {
                            depositValueTxt.html('&nbsp;');
                        } else {
                            depositValueTxt.text('$' + FrontendCommon.formatNumberHumanize(data.depositValue, 2));
                        }
                    }
                });
                box.bind('updatePendingValue', function(_, data) {
                    if ('loading' in data && data.loading) {
                        let amountMeasurements = FrontendCommon.getTextSize('0', '16px');
                        pendingAmountTxt.text('');
                        pendingValueTxt.text('');
                        pendingAmountTxt.css('width', amountMeasurements.width);
                        pendingValueTxt.css('width', amountMeasurements.width);
                        harvestAllBtn.removeClass('primary');
                        harvestAllBtn.addClass('disabled');
                        harvestAllBtn.text('Harvest All');
                        return;
                    }
                    if ('pendingAmount' in data) {
                        const amountDecimals = 4,
                            valueDecimals = 2,
                            animationDuration = 2.0;
                        let value = data.pendingAmount * CryptoUtils.getCurrencyPriceUSD(nativeCurrencyId),
                            amountCharacterAmount = FrontendCommon.formatNumberHumanize(data.pendingAmount, amountDecimals).toString().length,
                            valueCharacterAmount = FrontendCommon.formatNumberHumanize(value, valueDecimals).toString().length + 3;
                        let amountMeasurements = FrontendCommon.getTextSize('0'.repeat(amountCharacterAmount), '16px'),
                            valueMeasurements = FrontendCommon.getTextSize('0'.repeat(valueCharacterAmount), '16px');
                        pendingContainer.css('width', 'fit-content');
                        pendingAmountTxt.css('width', amountMeasurements.width * 0.98 + 'px');
                        pendingValueTxt.css('width', valueMeasurements.width + 'px');
                        if (pendingAmountCountUp === undefined) {
                            pendingAmountCountUp = new window.countup(pendingAmountTxt[0], data.pendingAmount, {
                                decimalPlaces: amountDecimals,
                                duration: animationDuration,
                            });
                            pendingAmountCountUp.start();
                            box.data('pending-value-countup', pendingAmountCountUp);
                        } else {
                            pendingAmountCountUp.update(data.pendingAmount);
                        }
                        if (pendingValueCountUp === undefined) {
                            pendingValueCountUp = new window.countup(pendingValueTxt[0], value, {
                                duration: 2,
                                decimalPlaces: valueDecimals,
                                formattingFn: (num) => {
                                    return '($' + FrontendCommon.formatNumberHumanize(num, valueDecimals) + ')';
                                }
                            });
                            pendingValueCountUp.start();
                            box.data('pending-value-countup', pendingValueCountUp);
                        } else {
                            pendingValueCountUp.update(value);
                        }
                        harvestAllBtn.toggleClass('primary', value > 0);
                        harvestAllBtn.toggleClass('disabled', value === 0);
                        harvestAllBtn.text(value > 0 ? 'Harvest All' : 'Nothing to Harvest :(');
                    }
                });
                box.trigger('toggleVisibility', {
                    visible: FrontendCommon.getLocalItem('STATS_STRIP_VISIBLE', true),
                });
            },
            refreshPoolCardMain: function(card) {
                let info = card.find('.info'),
                    btnGet = card.find('.info .btn.get'),
                    mainBalanceTxt = info.find('.key-value.balance .val'),
                    mainDepositTxt = info.find('.key-value.deposited .val'),
                    detailsBalanceTxt = card.find('.transaction.deposit .amount .val'),
                    detailsWithdrawTxt = card.find('.transaction.withdraw .amount .val'),
                    dataCurrencyContract = card.data('currency-contract'),
                    dataCurrencyTicker = card.data('currency-ticker'),
                    dataCurrencyId = card.data('currency-id'),
                    dataPoolId = card.data('pid'),
                    tippyBalanceInstance = card.data('tippy-balance-instance') || null,
                    tippyDepositInstance = card.data('tippy-deposit-instance') || null;
                let resolveDepositAndGetButton = function(balanceAmount) {
                    btnGet.text(balanceAmount === 0 ? `Get ${dataCurrencyTicker}` : 'Deposit');
                    btnGet.removeClass('loading');
                    btnGet.toggleClass('outlined', balanceAmount === 0);
                    btnGet.toggleClass('secondary', balanceAmount > 0);
                    btnGet.off('click');
                    btnGet.on('click', function() {
                        if (balanceAmount === 0) {
                            if (card.data('is-lp')) {
                                r.showDialogLPToken(card);
                            } else {
                                r.showDialogSingleToken(card);
                            }
                        } else {
                            card.trigger('toggleExpand', {
                                forceExpand: true,
                            });
                        }
                    });
                };
                if (!Wallet.isConnected()) {
                    mainBalanceTxt.text('0');
                    detailsBalanceTxt.text('0');
                    mainDepositTxt.text('0');
                    detailsWithdrawTxt.text('0');
                    card.attr('data-balance', 0);
                    card.attr('data-deposited', 0);
                    resolveDepositAndGetButton(0);
                    return;
                }
                CryptoUtils.getTokenBalance(Wallet.getAccounts()[0], dataCurrencyContract, Wallet.getProvider(), (result, data) => {
                    if (result) {
                        let parsedAmount = data.formattedBalance,
                            floatAmount = parseFloat(parsedAmount),
                            dollarValue = floatAmount * CryptoUtils.getCurrencyPriceUSD(dataCurrencyId),
                            displayDecimals = detailsBalanceTxt.data('display-decimals'),
                            formattedNumber = floatAmount === 0 ? '0' : FrontendCommon.formatNumberHumanize(floatAmount, 4);
                        mainBalanceTxt.text(`${formattedNumber}`);
                        card.attr('data-balance', parsedAmount);
                        if (dollarValue >= 0) {
                            detailsBalanceTxt.html(FrontendCommon.formatStringToNumber(parsedAmount, displayDecimals) +
                                ' <span class="estimate">($' + FrontendCommon.formatNumberHumanize(dollarValue, 2) + ')</span>');
                        } else {
                            detailsBalanceTxt.html(FrontendCommon.formatStringToNumber(parsedAmount, displayDecimals));
                        }
                        if (floatAmount > 0) {
                            if (tippyBalanceInstance === null) {
                                tippyBalanceInstance = tippy(mainBalanceTxt[0], {
                                    content: `${data.formattedBalance}`,
                                    placement: 'bottom',
                                    theme: 'swampy',
                                });
                                card.data('tippy-balance-instance', tippyBalanceInstance);
                            } else {
                                tippyBalanceInstance.setContent(`${data.formattedBalance}`);
                            }
                        } else {
                            if (tippyBalanceInstance !== null) {
                                tippyBalanceInstance.setContent(`${data.formattedBalance}`);
                            }
                        }
                        resolveDepositAndGetButton(floatAmount);
                    }
                });
                CryptoUtils.getStakedTokens(dataPoolId, Wallet.getAccounts()[0], (result, data) => {
                    if (result) {
                        let parsedAmount = data.formattedBalance,
                            floatAmount = parseFloat(parsedAmount),
                            dollarValue = floatAmount * CryptoUtils.getCurrencyPriceUSD(dataCurrencyId),
                            displayDecimals = detailsWithdrawTxt.data('display-decimals'),
                            formattedNumber = floatAmount === 0 ? '0' : FrontendCommon.formatNumberHumanize(floatAmount, 4);
                        mainDepositTxt.text(formattedNumber);
                        card.attr('data-deposited', parsedAmount);
                        if (dollarValue >= 0) {
                            detailsWithdrawTxt.html(FrontendCommon.formatStringToNumber(parsedAmount, displayDecimals) +
                                ' <span class="estimate">($' + FrontendCommon.formatNumberHumanize(dollarValue, 2) + ')</span>');
                        } else {
                            detailsWithdrawTxt.html(FrontendCommon.formatStringToNumber(parsedAmount, displayDecimals));
                        }
                        if (floatAmount > 0) {
                            if (tippyDepositInstance === null) {
                                tippyDepositInstance = tippy(mainDepositTxt[0], {
                                    content: `${data.formattedBalance}`,
                                    placement: 'bottom',
                                    theme: 'swampy',
                                });
                                card.data('tippy-deposit-instance', tippyDepositInstance);
                            } else {
                                tippyDepositInstance.setContent(`${data.formattedBalance}`);
                            }
                        } else {
                            if (tippyDepositInstance !== null) {
                                tippyDepositInstance.setContent(`${data.formattedBalance}`);
                            }
                        }
                        card.data('updated', true);
                    }
                });
            },
            refreshPoolCardDetails: function(card, animateButtons = true) {
                if (!Wallet.isConnected()) {
                    return;
                }
                let depositBtn = card.find('.btn.deposit'),
                    withdrawBtn = card.find('.btn.withdraw'),
                    harvestBtn = card.find('.btn.harvest'),
                    harvestAmountTxt = card.find('.transactions .transaction.harvest .val span.amount'),
                    harvestValueTxt = card.find('.transactions .transaction.harvest .val span.value'),
                    dataCurrencyTicker = card.data('currency-ticker'),
                    dataPoolId = card.data('pid'),
                    nativeCurrencyId = $('.content').data('currency-native-id'),
                    tippyInstantiated = card.data('tippy-init') || false,
                    amountCountUpInstance = card.data('countup-amount-instance') || null,
                    valueCountUpInstance = card.data('countup-value-instance') || null;
                if (amountCountUpInstance === null && valueCountUpInstance === null) {
                    amountCountUpInstance = new window.countup(harvestAmountTxt[0], 0, {
                        duration: 2,
                        decimalPlaces: 5,
                    });
                    valueCountUpInstance = new window.countup(harvestValueTxt[0], 0, {
                        duration: 2,
                        decimalPlaces: 2,
                        formattingFn: (num) => {
                            return '($' + FrontendCommon.formatNumberHumanize(num, 2) + ')';
                        },
                    });
                    amountCountUpInstance.start();
                    valueCountUpInstance.start();
                    card.data('countup-amount-instance', amountCountUpInstance);
                    card.data('countup-value-instance', valueCountUpInstance);
                }
                CryptoUtils.getHarvestPending(dataPoolId, Wallet.getAccounts()[0], (result, data) => {
                    if (result) {
                        card.attr('data-pending', data.pending);
                        let value = data.pending * CryptoUtils.getCurrencyPriceUSD(nativeCurrencyId),
                            amountCharacterAmount = FrontendCommon.formatNumberHumanize(data.pending, 5).toString().length,
                            valueCharacterAmount = FrontendCommon.formatNumberHumanize(value, 2).toString().length,
                            amountMeasurements = FrontendCommon.getTextSize('0'.repeat(amountCharacterAmount), '20px'),
                            valueMeasurements = FrontendCommon.getTextSize('0'.repeat(valueCharacterAmount), '20px');
                        harvestAmountTxt.css('width', amountMeasurements.width + 'px');
                        harvestValueTxt.css('width', valueMeasurements.width + 'px');
                        amountCountUpInstance.update(data.pending);
                        valueCountUpInstance.update(value);
                    }
                });
                if (!tippyInstantiated) {
                    tippy(harvestBtn[0], {
                        content: `Harvest all pending KSWAPs`,
                        placement: 'bottom',
                        theme: 'swampy',
                    });
                    tippy(withdrawBtn[0], {
                        content: `Withdraw from Vault. Pending KSWAPs will be harvested.`,
                        placement: 'bottom',
                        theme: 'swampy',
                    });
                    tippy(depositBtn[0], {
                        content: `Deposit your ${dataCurrencyTicker.toUpperCase()} and start earning. Pending KSWAPs will be harvested.`,
                        placement: 'bottom',
                        theme: 'swampy',
                    });
                    card.data('tippy-init', true);
                }
            },
            showDialogLPToken: function(card) {
                let ticker0 = card.data('token0-ticker').toUpperCase(),
                    token0isgas = card.data('token0-is-gas') == true,
                    ticker1 = card.data('token1-ticker').toUpperCase(),
                    token1isgas = card.data('token1-is-gas') == true,
                    contract0 = card.data('token0-contract'),
                    contract1 = card.data('token1-contract'),
                    popup = FrontendWidgets.showPopup('#popup-buy-lp-token', `Get ${ticker0} / ${ticker1}`),
                    staticSymbols = popup.data('static-symbols'),
                    balance0txt = popup.find('.token0 .balance'),
                    balance1txt = popup.find('.token1 .balance'),
                    urlSwapSingle = card.data('platform-swap-single-url'),
                    urlSwapLP = card.data('platform-swap-lp-url'),
                    urlSwapLPWithGas = card.data('platform-swap-lp-with-gas-url'),
                    balance0 = 0,
                    balance1 = 0;
                popup.find('.btn.add-lp').removeClass(['secondary', 'primary']);
                popup.find('.token0 img').attr('src', `${staticSymbols}/${ticker0.toLowerCase()}.svg`);
                popup.find('.token1 img').attr('src', `${staticSymbols}/${ticker1.toLowerCase()}.svg`);
                balance0txt.text(`0 ${ticker0}`);
                balance1txt.text(`0 ${ticker1}`);
                if (token0isgas) {
                    popup.find('.token0 a').attr('href', popup.data('url-buy-bnb'));
                    popup.find('.token1 a').attr('href', `${urlSwapSingle}${contract1}`);
                    popup.find('.btn.add-lp').attr('href', `${urlSwapLPWithGas}${contract1}`);
                } else if (token1isgas) {
                    popup.find('.token0 a').attr('href', `${urlSwapSingle}${contract0}`);
                    popup.find('.token1 a').attr('href', popup.data('url-buy-bnb'));
                    popup.find('.btn.add-lp').attr('href', `${urlSwapLPWithGas}${contract0}`);
                } else {
                    popup.find('.token0 a').attr('href', `${urlSwapSingle}${contract0}`);
                    popup.find('.token1 a').attr('href', `${urlSwapSingle}${contract1}`);
                    popup.find('.btn.add-lp').attr('href', `${urlSwapLP}${contract0}/${contract1}`);
                }
                let checkPositiveBalance = _ => {
                    let btn = popup.find('.btn.add-lp');
                    btn.toggleClass('primary', balance0 > 0 && balance1 > 0);
                    btn.toggleClass('secondary', !(balance0 > 0 && balance1 > 0));
                };
                let balance0callback = (result, data) => {
                    if (result) {
                        balance0 = parseFloat(data.formattedBalance).toFixed(2);
                        balance0txt.text(balance0 + ' ' + ticker0);
                        checkPositiveBalance();
                    }
                };
                let balance1callback = (result, data) => {
                    if (result) {
                        balance1 = parseFloat(data.formattedBalance).toFixed(2);
                        balance1txt.text(balance1 + ' ' + ticker1);
                        checkPositiveBalance();
                    }
                };
                if (token0isgas) {
                    Wallet.gasBalance(balance0callback);
                } else {
                    Wallet.balance(contract0, balance0callback);
                }
                if (token1isgas) {
                    Wallet.gasBalance(balance1callback);
                } else {
                    Wallet.balance(contract1, balance1callback);
                }
            },
            showDialogSingleToken: function(card) {
                let ticker0 = card.data('token0-ticker').toUpperCase(),
                    contract0 = card.data('token0-contract'),
                    swapUrl = card.data('platform-swap-single-url'),
                    popup = FrontendWidgets.showPopup('#popup-buy-single-token', `Buy ${ticker0}`),
                    staticSymbols = popup.data('static-symbols'),
                    balanceTxt = popup.find('.balance');
                popup.find('.content img').attr('src', `${staticSymbols}/${ticker0.toLowerCase()}.svg`);
                popup.find('.btn.buy').attr('href', `${swapUrl}${contract0}`);
                balanceTxt.text(`0 ${ticker0}`);
                Wallet.balance(contract0, (result, data) => {
                    if (result) {
                        balanceTxt.text(`${parseFloat(data.formattedBalance).toFixed(2)} ${ticker0}`);
                    }
                });
            },
            showDialogKswap: function() {
                let popup = FrontendWidgets.showPopup('#popup-buy-kswap', 'Your KSWAP'),
                    nativeTokenContract = popup.data('native-contract'),
                    nativeVaultPid = popup.data('native-pool-pid'),
                    kswapMainBalanceTxt = popup.find('.content .balance'),
                    kswapBalanceTxt = popup.find('.kswap-balance'),
                    kswapBalanceVaultTxt = popup.find('.kswap-balance-vault'),
                    kswapPriceTxt = popup.find('.kswap-price'),
                    kswapSupplyTxt = popup.find('.kswap-supply'),
                    kswapMarketCapTxt = popup.find('.kswap-market-cap'),
                    kswapPrice = parseFloat(popup.attr('data-kswap-price')),
                    addressCopyBtn = popup.find('.kswap-contract img.copy');
                addressCopyBtn.off('click');
                addressCopyBtn.click(function() {
                    FrontendCommon.copyToClipboard(nativeTokenContract);
                    FrontendWidgets.toggleTopNotification(true, 'Contract address copied to clipboard.', 3000);
                });
                Wallet.balance(nativeTokenContract, (result, data) => {
                    if (result) {
                        swampMainBalanceTxt.text(`${parseFloat(data.formattedBalance).toFixed(2)}`);
                        swampBalanceTxt.text(`${parseFloat(data.formattedBalance).toFixed(2)} SWAMP`);
                    }
                });
                CryptoUtils.getBEP20TotalSupply(nativeTokenContract, (result, data) => {
                    if (result) {
                        let supply = parseInt(data.formattedSupply),
                            marketCap = supply * kswapPrice
                        kswapupplyTxt.text(`${FrontendCommon.formatNumberHumanize(supply,0)}`);
                    }
                });
                Wallet.balanceInVault(nativeVaultPid, (result, data) => {
                    if (result) {
                        kswapBalanceVaultTxt.text(`${parseFloat(data.formattedBalance).toFixed(2)} KSWAP`);
                    }
                });
            },
            showDialogAccount: function() {
                let popup = FrontendWidgets.showPopup('#popup-account', 'Account'),
                    copyBtn = popup.find('.copy'),
                    disconnectBtn = popup.find('.btn.disconnect');
                if (Wallet.isConnected()) {
                    popup.find('.address .txt').text(FrontendCommon.truncateSliceString(Wallet.getAccounts()[0], 6, 4));
                    popup.data('address', Wallet.getAccounts()[0]);
                } else {
                    popup.data('address', null);
                }
                copyBtn.off('click');
                copyBtn.on('click', _ => {
                    if (popup.data('address') !== null) {
                        FrontendCommon.copyToClipboard(popup.data('address'));
                        FrontendWidgets.toggleTopNotification(true, 'Address copied to clipboard', 4000);
                    }
                });
                disconnectBtn.off('click');
                disconnectBtn.on('click', async _ => {
                    await Wallet.disconnect();
                    r.accountBalanceInitialized = false;
                    FrontendWidgets.toggleTopNotification(true, 'Wallet has been disconnected.', 4000);
                    FrontendWidgets.closeOpenPopup();
                    FrontendApp.refreshWalletInfo();
                    FrontendApp.refreshAllCards();
                });
            },
            showPopupHarvestAll: function() {
                let popup = FrontendWidgets.showPopup('#popup-harvest-all', 'Harvest All'),
                    urlSymbols = popup.data('url-symbols'),
                    currencyNativeId = popup.data('currency-native-id') || $('.content').data('currency-native-id'),
                    harvestableVaults = popup.data('harvestable-vaults') || [],
                    amountTxt = popup.find('span.kswap'),
                    valueTxt = popup.find('span.value'),
                    vaultsNumberTxt = popup.find('.head .vaults'),
                    resetBtn = popup.find('div.reset'),
                    harvestBtn = popup.find('a.btn.harvest-all');
                if (harvestableVaults.length === 0) {} else {}
                let getIncludedVaultCount = function() {
                    if (harvestableVaults === null || harvestableVaults.length === 0) {
                        return 0;
                    }
                    let harvestedVaults = getHarvestedVaults();
                    return harvestableVaults.reduce((acc, curr) => {
                        return acc + (curr.include && !(curr.pid in harvestedVaults) ? 1 : 0);
                    }, 0);
                };
                let getHarvestingVaults = _ => FrontendCommon.getElementData(popup, 'harvesting-vaults', []);
                let getHarvestedVaults = _ => FrontendCommon.getElementData(popup, 'harvested-vaults', []);
                let addHarvestingVault = (pid) => {
                    let harvestingVaults = getHarvestingVaults();
                    harvestingVaults.push(pid);
                    popup.data('harvesting-vaults', harvestingVaults);
                };
                let removeHarvestingVault = function(pid) {
                    let harvestingVaults = getHarvestingVaults();
                    harvestingVaults = harvestingVaults.filter(item => item !== pid);
                    popup.data('harvesting-vaults', harvestingVaults);
                };
                let addHarvestedVaults = function(pid) {
                    let harvestedVaults = getHarvestedVaults();
                    harvestedVaults.push(pid);
                    popup.data('harvested-vaults', harvestedVaults);
                };
                popup.data('harvesting-vaults', []);
                popup.data('harvested-vaults', []);
                popup.off('updateValues');
                popup.bind('updateValues', function() {
                    let amount = 0,
                        vaults = popup.data('harvestable-vaults'),
                        includedCount = getIncludedVaultCount();
                    for (let i = 0; i < harvestableVaults.length; i++) {
                        let data = vaults.find(vault => vault.pid === harvestableVaults[i].pid);
                        if (typeof data !== 'undefined') {
                            harvestableVaults[i].pendingAmount = data.pendingAmount;
                        }
                    }
                    amount = harvestableVaults.reduce((acc, curr) => {
                        return acc + (curr.include ? curr.pendingAmount : 0);
                    }, 0);
                    amountTxt.text(FrontendCommon.formatNumberHumanize(amount, 4) + ' SWAMP');
                    valueTxt.text('($' + FrontendCommon.formatNumberHumanize(CryptoUtils.getCurrencyPriceUSD(currencyNativeId) * amount, 2) + ')');
                    vaultsNumberTxt.text(includedCount + '/' + vaults.length + ' vaults');
                });
                popup.off('populateTable');
                popup.bind('populateTable', function() {
                    let table = popup.find('.vault-list'),
                        template = table.find('.itm.template');
                    table.find('.itm:not(.template)').remove();
                    for (let i = 0; i < harvestableVaults.length; i++) {
                        let element = template.clone(),
                            vaultData = harvestableVaults[i];
                        element.data('pid', vaultData.pid);
                        element.find('.icon-1').attr('src', urlSymbols + '/' + vaultData.token0_ticker + '.svg');
                        if (vaultData.is_lp) {
                            element.find('.icon-2').attr('src', urlSymbols + '/' + vaultData.token1_ticker + '.svg');
                        } else {
                            element.find('.icon-2').css('visibility', 'hidden');
                        }
                        element.find('.content .ttl').text(vaultData.title);
                        element.find('.content .pending').text(FrontendCommon.formatNumberHumanize(vaultData.pendingAmount, 6) + ' KSWAP');
                        element.find('.actions .btn.cancel').click(function() {
                            let vaultCount = table.find('.itm:not(.template)').length;
                            vaultData.include = false;
                            if (vaultCount > 3) {
                                element.remove();
                            } else {
                                element.css('min-height', '0');
                                element.css('height', '70px');
                                FrontendCommon.slideFadeUp(element, 300, _ => {
                                    element.remove();
                                    table.toggleClass('empty', table.find('.itm:not(.template)').length === 0);
                                });
                            }
                            popup.trigger('updateValues');
                            popup.trigger('resolveHarvestButton');
                        });
                        element.removeClass('template');
                        element.appendTo(table);
                    }
                    table.toggleClass('empty', table.find('.itm:not(.template)').length === 0);
                });
                popup.off('resolveHarvestButton');
                popup.on('resolveHarvestButton', function() {
                    harvestBtn.toggleClass('disabled', getIncludedVaultCount() === 0);
                    harvestBtn.toggleClass('loading', popup.data('is-harvesting') == true);
                });
                popup.off('resetTable');
                popup.bind('resetTable', function() {
                    if (getIncludedVaultCount() === harvestableVaults.length || popup.data('is-harvesting') == true) {
                        return;
                    }
                    for (let i = 0; i < harvestableVaults.length; i++) {
                        harvestableVaults[i].include = true;
                    }
                    popup.trigger('resolveHarvestButton');
                    popup.trigger('updateValues');
                    popup.trigger('populateTable');
                });
                popup.off('updateTable');
                popup.bind('updateTable', function() {
                    let tableItms = popup.find('.vault-list .itm:not(.template)'),
                        harvestableVaults = popup.data('harvestable-vaults'),
                        harvestingVaults = getHarvestingVaults(),
                        harvestedVaults = getHarvestedVaults();
                    for (let i = 0; i < tableItms.length; i++) {
                        let itm = tableItms.eq(i),
                            pid = itm.data('pid'),
                            data = harvestableVaults.filter(vault => vault.pid === pid)[0];
                        if (typeof data !== 'undefined') {
                            itm.find('.content .pending').text(FrontendCommon.formatNumberHumanize(data.pendingAmount, 6) + ' KSWAP');
                        }
                        itm.toggleClass('loading', harvestingVaults.includes(itm.data('pid')));
                        if (harvestedVaults.includes(itm.data('pid'))) {
                            itm.css('min-height', '0');
                            itm.css('height', '70px');
                            FrontendCommon.slideFadeUp(itm, 200, _ => {
                                itm.remove();
                            });
                            popup.trigger('updateValues');
                            popup.trigger('resolveHarvestButton');
                        }
                    };
                });
                resetBtn.off('click');
                resetBtn.click(_ => {
                    if (popup.data('is-harvesting') != true) {
                        popup.trigger('resetTable');
                    }
                });
                harvestBtn.off('click');
                harvestBtn.click(async function() {
                    if (popup.data('is-harvesting') == true || $(this).hasClass('disabled')) {
                        return;
                    }
                    let harvestQueue = [];
                    for (let i = 0; i < harvestableVaults.length; i++) {
                        if (harvestableVaults[i].include) {
                            harvestQueue.push(harvestableVaults[i]);
                            addHarvestingVault(harvestableVaults[i].pid);
                        }
                    }
                    popup.data('is-harvesting', true);
                    popup.trigger('updateTable');
                    popup.trigger('resolveHarvestButton');
                    await Wallet.harvestAll(harvestQueue.map(q => q.pid), (result, data) => {
                        if (result) {
                            if (data.status === 'broadcasted') {} else if (data.status === 'tx_done') {
                                removeHarvestingVault(data.pid);
                                addHarvestedVaults(data.pid);
                            } else if (data.status === 'done') {
                                popup.data('is-harvesting', false);
                                FrontendWidgets.toggleTopNotification(true, 'Harvest all has completed.', 4000);
                                FrontendWidgets.closeOpenPopup();
                                FrontendApp.resetStatsStripe(true);
                                FrontendApp.refreshAllCards();
                                FrontendApp.refreshWalletInfo();
                            }
                        } else {
                            if (data.status === 'canceled') {
                                popup.data('is-harvesting', false);
                                FrontendWidgets.toggleTopNotification(true, 'Transaction(s) canceled.', 4000);
                                FrontendWidgets.closeOpenPopup();
                            }
                        }
                        popup.trigger('updateTable');
                        popup.trigger('updateValues');
                        popup.trigger('resolveHarvestButton');
                    });
                });
                popup.data('popup-close-listener', _ => {
                    for (let i = 0; i < harvestableVaults.length; i++) {
                        harvestableVaults[i].include = true;
                    }
                    FrontendCommon.setElementData(popup, 'harvestable-vaults', undefined);
                });
                popup.trigger('resolveHarvestButton');
                popup.trigger('updateValues');
                popup.trigger('populateTable');
                popup.trigger('updateTable');
            },
        },
        u = {
            refreshWalletInfo: function() {
                let header = $('header');
                if (Wallet.isConnected()) {
                    header.trigger('updateBalances');
                } else {
                    header.trigger('toggleWalletInfo', {
                        visibility: false
                    });
                }
            },
            refreshAllCards: function() {
                let cards = $('.pool-card');
                cards.each(function() {
                    let card = $(this);
                    r.refreshPoolCardMain(card);
                    r.refreshPoolCardDetails(card);
                });
            },
            resetStatsStripe: function(loading = false) {
                let statsStripeBox = $('.stats-stripe');
                statsStripeBox.trigger('updateDepositValue', {
                    depositValue: 0,
                    loading: loading,
                });
                statsStripeBox.trigger('updatePendingValue', {
                    pendingAmount: 0,
                    loading: loading,
                });
                statsStripeBox.trigger('toggleStripeLoading', {
                    loading: loading,
                });
            },
            startRefreshingData: function() {
                r.initRefreshData();
            },
            initialize: async function() {
                r.initFilteringSorting();
                r.initPoolCards();
                r.initStatsStripe();
                r.initAccountBalances();
            }
        };
    return u;
}());
(async function() {
    await FrontendApp.initialize();
    await Wallet.initialize();
    FrontendApp.startRefreshingData();
})();
