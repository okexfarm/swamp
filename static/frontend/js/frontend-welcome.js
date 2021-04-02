let FrontendWelcome = (function() {
    let r = {
            initializePage: function() {
                let socialLinks = $('.welcome .social a');
                tippy(socialLinks[0], {
                    content: 'Check Github repository',
                    placement: 'bottom',
                    theme: 'swampy',
                    delay: 200,
                });
                tippy(socialLinks[1], {
                    content: 'Follow us on Twitter',
                    placement: 'bottom',
                    theme: 'swampy',
                    delay: 200,
                });
                tippy(socialLinks[2], {
                    content: 'Join our Telegram group',
                    placement: 'bottom',
                    theme: 'swampy',
                    delay: 200,
                });
                tippy(socialLinks[3], {
                    content: 'Check our Medium page',
                    placement: 'bottom',
                    theme: 'swampy',
                    delay: 200,
                });
                tippy(socialLinks[4], {
                    content: 'Join our Discord server',
                    placement: 'bottom',
                    theme: 'swampy',
                    delay: 200,
                });
                tippy(socialLinks[5], {
                    content: 'Read our Gitbook documentation',
                    placement: 'bottom',
                    theme: 'swampy',
                    delay: 200,
                });
            },
        },
        u = {
            initialize: function() {
                r.initializePage();
            }
        };
    return u;
}());
FrontendWelcome.initialize();