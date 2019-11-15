window.addEventListener('load', function(){

  let megamenuButtons = document.querySelectorAll('.accordion-button.nav-link');

  [...megamenuButtons].map( elm => {

    let submenu = elm.nextElementSibling;

    elm.addEventListener('click', (evt) => {
      evt.preventDefault();
      let elmExpanded = elm.getAttribute('aria-expanded');
      let submenuHidden = submenu.getAttribute('aria-hidden');
      elm.classList.toggle('submenu-item-active');

      if (elmExpanded == 'false') {
        elm.setAttribute('aria-expanded', 'true')
        submenu.setAttribute('aria-hidden','false')
      } else {
        elm.setAttribute('aria-expanded', 'false')
        submenu.setAttribute('aria-hidden','true')
      }
    })

  })

  let submenuItems = document.querySelectorAll('.nav-submenu > .has-submenu');

  [...submenuItems].map( elm => {
    let submenu_child = elm.querySelector('.nav-submenu-submenu');

    elm.addEventListener('click', (evt) => {
      evt.preventDefault();
      elm.classList.toggle('submenu-item-active');
    })
  })

})
