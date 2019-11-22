window.addEventListener('load', function(){

  document.addEventListener('click', event => {

    if ( document.body.classList.contains('mobile-menu-active') ) {
      event.preventDefault();
      event.stopPropagation();
    }

    const helper = (element, className) => {
      if (!!element) {
        if (element.classList.contains(className)) {
          return element;
        } else {
          return helper(element.parentElement, className);
        }
      }
    }

    if (document.querySelector('.mobile-menu-button') == event.target) {
      let mobileNav = document.querySelector('.mobile-primary-nav');
      let navBar = document.querySelector('.primary-nav');
      let navContainer = document.querySelector('.nav-container');
      let navBarClone = navBar.cloneNode(true);
      let mobileNavHeader = document.createElement('div');
      let closeSpan = document.createElement('span');
      let backButton = document.createElement('div');
      let menuSlider = document.createElement('div');

      backButton.innerText = 'Back';
      backButton.classList.add('mobile-menu-back');
      menuSlider.classList.add('menus-silder-container');
      closeSpan.classList.add('mobile-menu-close');
      mobileNavHeader.classList.add('mobile-nav-header');
      mobileNavHeader.appendChild(closeSpan);
      mobileNavHeader.appendChild(backButton);
      backButton.style.display = "none";
      document.body.classList.toggle('mobile-menu-active');
      mobileNav.style.display = "flex";
      navContainer.appendChild(mobileNavHeader);
      menuSlider.appendChild(navBarClone);
      navContainer.appendChild(menuSlider);
    }

    const mobileNavContainerClicked = helper(event.target, "nav-container");
    const mobileNavItemClicked = helper(event.target, "nav-link");
    const mobileNavContainer = document.querySelector('.menus-silder-container');
    const submenuHasSubmenu = helper(event.target, "has-submenu");


    if (mobileNavItemClicked) {
      event.preventDefault();
      event.stopPropagation();

      if (mobileNavItemClicked.classList.contains('accordion-button')) {
        let mobileSubmenu = mobileNavItemClicked.parentElement.querySelector('.nav-submenu').cloneNode(true);
        let emptyNavDiv = document.createElement('div');
        emptyNavDiv.appendChild(mobileSubmenu);
        mobileNavContainer.appendChild(emptyNavDiv);
        mobileNavContainer.classList.toggle('level-2');
        document.querySelector('.mobile-nav-header > .mobile-menu-back').style.display = "flex";
      }

    }

    if ( event.target.classList.contains('mobile-primary-nav') || event.target.classList.contains('mobile-menu-close') ){
      document.body.classList.toggle('mobile-menu-active');
      document.querySelector('.mobile-primary-nav').style.display = "none";
      document.querySelector('.nav-container').innerHTML = "";
    }

    if ( event.target.classList.contains('mobile-menu-back') ) {
      let lowestLevel = mobileNavContainer.lastChild;

      if (mobileNavContainer.classList.contains('level-3')) {
        mobileNavContainer.classList.remove('level-3')
      } else {
        mobileNavContainer.classList.remove('level-2')
        document.querySelector('.mobile-menu-back').style.display = "none";
      }

      setTimeout( () => {
        mobileNavContainer.removeChild(lowestLevel);
      }, 300)
    }


    if (submenuHasSubmenu) {
      let subSubmenu = submenuHasSubmenu.querySelector('.nav-submenu-submenu').cloneNode(true);
      let emptyNavDiv = document.createElement('div');
      emptyNavDiv.appendChild(subSubmenu);
      mobileNavContainer.appendChild(emptyNavDiv);
      mobileNavContainer.classList.toggle('level-3');
    }


  })

})
