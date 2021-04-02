jQuery.ajaxSetup({
    headers: {
        "cache-control": "no-cache"
    }
});
jQuery(document).ajaxSend(function(event, xhr, settings) {
    function getCookie(name) {
        let cookieValue = null,
            cookies = [],
            i = 0,
            j = 0,
            cookie = {};
        if (document.cookie && document.cookie !== '') {
            cookies = document.cookie.split(';');
            for (j = cookies.length; i < j; i += 1) {
                cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    function sameOrigin(url) {
        let host = document.location.host,
            protocol = document.location.protocol,
            sr_origin = '//' + host,
            origin = protocol + sr_origin;
        return (url === origin || url.slice(0, origin.length + 1) === origin + '/') || (url === sr_origin || url.slice(0, sr_origin.length + 1) === sr_origin + '/') || !(/^(\/\/|http:|https:).*/.test(url));
    }

    function safeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    }
});
let FrontendCommon = (function() {
    let r = {},
        u = {
            setLocalItem: function(key, value) {
                localStorage.setItem(key, JSON.stringify(value));
            },
            getLocalItem: function(key, defaultValue = null) {
                if (localStorage.hasOwnProperty(key)) {
                    return JSON.parse(localStorage.getItem(key));
                }
                return defaultValue;
            },
            deleteLocalItem: function(key) {
                if (localStorage.hasOwnProperty(key)) {
                    localStorage.removeItem(key);
                    return true;
                }
                return false;
            },
            getElementData: function(element, key, defaultValue) {
                let data = element.data(key);
                if (typeof data === 'undefined') {
                    element.data(key, defaultValue);
                    return defaultValue;
                }
                return data;
            },
            setElementData: function(element, key, value) {
                element.data(key, value);
            },
            pageRedirect: function(url) {
                window.location = url;
            },
            pageReload: function() {
                window.location.href = window.location.href.split('#')[0];
            },
            pageOpenInNewTab: function(url) {
                window.open(url);
            },
            dateTimestampToLocal: function(timestamp) {
                return new Date(Math.round(timestamp * 1000));
            },
            dateAddDays: function(date, days) {
                date.setDate(date.getDate() + days);
                return date;
            },
            timeAddLeadingZero: function(time) {
                return (time < 10 ? '0' : '') + time;
            },
            formatTime: function(date) {
                let hours = date.getHours(),
                    minutes = FrontendCommon.timeAddLeadingZero(date.getMinutes()),
                    seconds = FrontendCommon.timeAddLeadingZero(date.getSeconds()),
                    formattedTime = hours + ':' + minutes + ':' + seconds;
                return formattedTime;
            },
            formatDate: function(date) {
                let day = date.getDate(),
                    month = date.getMonth() + 1,
                    year = date.getFullYear(),
                    formattedDate = day + '-' + month + '-' + year;
                return formattedDate
            },
            formatDateTime: function(date) {
                return FrontendCommon.formatDate(date) + ' ' + FrontendCommon.formatTime(date);
            },
            formatStringToNumber: function(text, decimals) {
                return parseFloat(text).toFixed(decimals);
            },
            formatNumberHumanize: function(num, decimals) {
                num = num.toFixed(decimals);
                if (decimals == 0) {
                    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                } else {
                    num = num.split('.');
                    return num[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '.' + num[1];
                }
            },
            sleep: function(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            },
            truncateSliceString: function(str, firstPartSize, secondPartSize, middlePart = '...') {
                return `${str.slice(0,firstPartSize)}${middlePart}${str.slice(str.length-secondPartSize)}`;
            },
            initializeTippy: function(instance, element, text, placement = 'bottom') {
                if (instance === null) {
                    return tippy(element[0], {
                        content: `${text}`,
                        placement: placement,
                        theme: 'swampy',
                    });
                }
                return instance;
            },
            isElementVisibleOnScreen: function(element) {
                let rect = element.getBoundingClientRect();
                return (rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth));
            },
            getTextSize: function(text, fontSize, font = 'Poppins') {
                let textEl = $('<div>' + text + '</div>');
                textEl.css('display', 'inline-block');
                textEl.css('position', 'absolute');
                textEl.css('font-size', fontSize);
                textEl.css('font-family', font);
                textEl.text(text);
                $('body').append(textEl);
                let measurements = {
                    width: textEl.width(),
                    height: textEl.height(),
                };
                textEl.remove();
                return measurements;
            },
            slideFadeUp: function(el, ms, complete = _ => {}) {
                const fade = {
                    opacity: 0,
                    transition: 'opacity ' + ms + 'ms',
                };
                el.css(fade).delay(50).slideUp(ms, complete);
            },
            copyToClipboard: function(text) {
                let $temp = $('<input>');
                $('body').append($temp);
                $temp.val(text).select();
                document.execCommand('copy');
                $temp.remove();
            },
            initialize: function() {},
        };
    return u;
}());
let FrontendWidgets = (function() {
    const STICKY_HEADER_TRIGGER = 250;
    const STICKY_HEADER_MOBILE_TRIGGER = 10;
    const NOTICE_VALIDATE_DURATION = 24 * 60 * 60 * 1000;
    const MOBILE_MENU_RWD_TRIGGER = 1700;
    let r = {
            popupVisible: null,
            initializeNotice: function() {
                let notice = $('.notice.notice-1'),
                    notice2 = $('.notice.notice-2'),
                    lastTimeVisible = FrontendCommon.getLocalItem('NOTICE_LAST_VISIBLE', Date.now() - NOTICE_VALIDATE_DURATION),
                    lastTimeVisible2 = FrontendCommon.getLocalItem('NOTICE_LAST_VISIBLE_2', Date.now() - NOTICE_VALIDATE_DURATION);
                if (notice.length) {
                    notice.find('img.close').click(function() {
                        notice.hide();
                        FrontendCommon.setLocalItem('NOTICE_LAST_VISIBLE', Date.now());
                    });
                    if ((Date.now() - lastTimeVisible) >= NOTICE_VALIDATE_DURATION) {
                        notice.removeClass('hidden');
                    }
                }
                if (notice2.length) {
                    notice2.find('img.close').click(function() {
                        notice2.hide();
                        FrontendCommon.setLocalItem('NOTICE_LAST_VISIBLE_2', Date.now());
                    });
                    if ((Date.now() - lastTimeVisible2) >= NOTICE_VALIDATE_DURATION) {
                        notice2.removeClass('hidden');
                    }
                }
            },
            initializeHeader: function() {
                let header = $('header');
                let isMobile = function() {
                    return $(window).width() <= MOBILE_MENU_RWD_TRIGGER;
                };
                header.toggleClass('sticky', isMobile() ? window.pageYOffset >= STICKY_HEADER_MOBILE_TRIGGER : window.pageYOffset >= STICKY_HEADER_TRIGGER);
                $(window).scroll(function() {
                    if ((isMobile() && window.pageYOffset >= STICKY_HEADER_MOBILE_TRIGGER) || (!isMobile() && window.pageYOffset >= STICKY_HEADER_TRIGGER)) {
                        header.addClass('sticky');
                    } else if (window.pageYOffset === 0) {
                        header.removeClass('sticky');
                    }
                });
            },
            initializeMobileMenu: function() {
                let header = $('header'),
                    menu = header.find('.mobile-menu'),
                    hamburger = $('header .hamburger');
                hamburger.click(function() {
                    menu.toggleClass('visible');
                });
                if ($(window).width() < MOBILE_MENU_RWD_TRIGGER) {
                    header.addClass('mobile');
                }
                $(window).on('resize', function() {
                    if ($(window).width() >= MOBILE_MENU_RWD_TRIGGER && menu.hasClass('visible')) {
                        header.removeClass('mobile');
                        menu.removeClass('visible');
                    }
                });
            },
            initializeNumericInputs: function() {
                let inputContainers = $('.input-container.number');
                inputContainers.each(function() {
                    let input = $(this).find('input'),
                        humanize = input.data('humanize') == true,
                        decimalPlaces = parseInt(input.data('decimal-places'));
                    input.on('input', function() {
                        let value = input.val();
                        if (humanize) {
                            value = value.replace(/,$/, '.').replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        } else {
                            value = value.replace(',', '.');
                        }
                        if (value.indexOf('.') !== -1) {
                            let splitOnDot = value.split('.'),
                                firstPart = splitOnDot[0].replace(/[^0-9\.,]/g, ''),
                                secondPart = splitOnDot[1].replace(/[^0-9\.]/g, '');
                            if (decimalPlaces === 0) {
                                input.val(firstPart);
                            } else {
                                input.val(firstPart.replace(/^$/, '0') + '.' + secondPart.slice(0, decimalPlaces));
                            }
                        } else {
                            input.val(value.replace(/[^0-9\.,]/g, ''));
                        }
                    });
                    input.focusout(function() {
                        if (input.val() === '') {
                            input.val(0);
                        }
                    });
                });
            },
            initializeDropdowns: function() {
                let dropdowns = $('.dropdown-wrapper'),
                    items = dropdowns.find('.itm');
                $(document).click(function(event) {
                    let target = $(event.target),
                        dropdowns = $('.dropdown-wrapper');
                    if (!target.closest('.dropdown-wrapper').length && dropdowns.hasClass('opened')) {
                        dropdowns.removeClass('opened');
                    }
                });
                dropdowns.click(function(ev) {
                    let dropdown = $(this);
                    $('.dropdown-wrapper.opened').not(dropdown).removeClass('opened');
                    dropdown.toggleClass('opened');
                    ev.stopPropagation();
                });
                items.click(function(ev) {
                    let item = $(this),
                        dropdown = item.parent().parent();
                    dropdown.attr('data-value', item.data('value'));
                    dropdown.attr('data-name', item.data('name'));
                    dropdown.trigger('onItemSelected', {
                        value: item.data('value'),
                        name: item.data('name'),
                    });
                    dropdown.removeClass('opened');
                    ev.stopPropagation();
                });
            },
            initTopNotification: function() {
                let box = $('header'),
                    notification = box.find('.top-notification'),
                    notificationText = box.find('span.txt'),
                    btnClose = box.find('.btn-close');
                btnClose.click(_ => {
                    box.trigger('toggleTopNotification', {
                        visibility: false
                    });
                });
                box.bind('toggleTopNotification', function(ev, data) {
                    if (data !== null && data.hasOwnProperty('visibility')) {
                        notification.toggleClass('visible', data.visibility === true);
                        notification.toggleClass('hidden', data.visibility === false);
                        if (data.hasOwnProperty('text')) {
                            notificationText.text(data.text);
                        }
                    }
                });
                box.bind('hideTopNotification', function() {
                    box.trigger('toggleTopNotification', {
                        visibility: false
                    });
                });
            },
            initPopups: function() {
                let container = $('.popup-container');
                container.find('img.close').click(function() {
                    container.trigger('togglePopup', {
                        visible: false,
                    });
                    container.trigger('closePopup');
                });
                container.bind('togglePopup', function(ev, data) {
                    if (data !== undefined && data.hasOwnProperty('visible')) {
                        container.toggleClass('visible', data.visible);
                    }
                });
                container.bind('closePopup', _ => {
                    if (r.popupVisible !== null) {
                        FrontendCommon.getElementData(r.popupVisible, 'popup-close-listener', _ => {})();
                        r.popupVisible.data('popup-visible', false);
                        r.popupVisible.hide();
                        r.popupVisible = null;
                    }
                    container.trigger('togglePopup', {
                        visible: false,
                    });
                });
            },
            initCertikLabel: function() {
                let certikContainer = $('.certik-container'),
                    $window = $(window),
                    $footer = $('footer');
                if (certikContainer.length === 0) {
                    return;
                }
                let resolveVisibility = function(screenWidth, force = false) {
                    if (certikContainer.offset().top + certikContainer.height() > $footer.position().top) {
                        certikContainer.removeClass('visible');
                    } else {
                        certikContainer.addClass('visible');
                    }
                };
                $window.on('resize', function() {
                    resolveVisibility($window.width());
                });
                $window.on('scroll', function() {
                    resolveVisibility($window.width());
                });
                resolveVisibility($window.width(), 0, true);
            },
            generateAvatar: function(seed) {
                return window.createIcon({
                    seed: seed,
                    size: 6,
                    scale: 5,
                    color: '#080E12',
                    bgcolor: '#CCF66C',
                });
            },
        },
        u = {
            showPopup: function(id, title) {
                let popup = $(id);
                $('.popup-container').trigger('togglePopup', {
                    visible: true,
                });
                popup.find('.header .ttl').text(title);
                popup.data('popup-visible', true);
                r.popupVisible = popup;
                r.popupVisible.show();
                return r.popupVisible;
            },
            closeOpenPopup: function() {
                $('.popup-container').trigger('closePopup');
            },
            toggleTopNotification: function(visibility, text, cleanNotificationsTimeout = 0) {
                let header = $('header');
                header.trigger('toggleTopNotification', {
                    visibility: visibility,
                    text: text,
                });
                if (cleanNotificationsTimeout !== 0) {
                    setTimeout(_ => {
                        header.trigger('toggleTopNotification', {
                            visibility: false,
                        });
                    }, cleanNotificationsTimeout);
                }
            },
            generateWalletAvatar: function(walletAddress) {
                let iconParentSite = $('header .wallet-info .icon'),
                    iconParentDialog = $('#popup-account .icon');
                for (let i = 0; i < iconParentSite.length; i++) {
                    iconParentSite.eq(i).empty();
                    iconParentSite.eq(i).append(r.generateAvatar(walletAddress));
                }
                for (let i = 0; i < iconParentDialog.length; i++) {
                    iconParentDialog.eq(i).empty();
                    iconParentDialog.eq(i).append(r.generateAvatar(walletAddress));
                }
            },
            initialize: function() {
                r.initializeHeader();
                r.initializeMobileMenu();
                r.initializeNumericInputs();
                r.initializeDropdowns();
                r.initTopNotification();
                r.initPopups();
                r.initializeNotice();
                r.initCertikLabel();
            },
        };
    return u;
})();
FrontendCommon.initialize();
FrontendWidgets.initialize();