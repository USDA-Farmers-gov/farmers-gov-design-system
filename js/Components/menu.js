window.addEventListener('load', function(){

    let megamenuButtons = document.querySelectorAll('.accordion-button.nav-link');
    if(megamenuButtons) {
        [...megamenuButtons].map( elm => {

            let submenu = elm.nextElementSibling;

            elm.addEventListener('click', (evt) => {
                evt.preventDefault();
                let elmExpanded = elm.getAttribute('aria-expanded');
                let submenuHidden = submenu.getAttribute('aria-hidden');
                elm.classList.toggle('submenu-item-active');

                if (elmExpanded == 'false') {
                    elm.setAttribute('aria-expanded', 'true');
                    submenu.setAttribute('aria-hidden','false');
                } else {
                    elm.setAttribute('aria-expanded', 'false');
                    submenu.setAttribute('aria-hidden','true');
                }
            })
        })
    }

    let submenuItems = document.querySelectorAll('.nav-submenu > .has-submenu');
    if(submenuItems) {
        [...submenuItems].map( elm => {
            elm.addEventListener('click', (evt) => {
                evt.preventDefault();
                [...submenuItems].map( elm2 => {
                    elm2.classList.remove('submenu-item-active');
                })
                elm.classList.toggle('submenu-item-active');
            })
        })
    }

    let govBannerButtons = document.querySelectorAll('button.usa-accordion-button.usa-banner-button');
    if (govBannerButtons) {
        [...govBannerButtons].map( item => {
            item.addEventListener('click', (evt) => {

                let ariaVal = item.getAttribute('aria-expanded');
                let banner = item.parentElement.parentElement.nextElementSibling.querySelector('div[id^="gov-banner"]');
                let newVal = ariaVal === 'true' ? 'false': 'true';
                let hideContainer = newVal === 'false' ? 'true': 'false';

                item.setAttribute('aria-expanded', newVal);
                banner.setAttribute('aria-hidden', hideContainer);
            })
        })
    }
})
