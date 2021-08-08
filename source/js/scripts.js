const menuNav = document.querySelector('.header__navigation-list');
const toggle = document.querySelector('.header__toggle');
const header = document.querySelector('.header__menu');


toggle.addEventListener('click', function() {
  if (toggle.classList.contains('header__toggle--for-open')) {
    toggle.classList.remove('header__toggle--for-open');
    toggle.classList.add('header__toggle--for-close');
    menuNav.classList.remove('header__navigation-list');
    menuNav.classList.add('header__navigation-list-no-js');
    header.classList.add('header__menu-no-js');
  } else {
    toggle.classList.add('header__toggle--for-open');
    toggle.classList.remove('header__toggle--for-close');
    menuNav.classList.remove('header__navigation-list-no-js');
    menuNav.classList.add('header__navigation-list');
    header.classList.remove('header__menu-no-js');
  }
});
