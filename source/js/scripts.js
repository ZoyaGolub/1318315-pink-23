const header = document.querySelector('.header__menu');
const toggleOpen = document.querySelector('.header__toggle-open');
const toggleClose = document.querySelector('.header__toggle-close');
const menuNav = document.querySelector('.header__navigation-list');

const popupRequest = document.querySelector('.form__button-send--popup');
const popupError = document.querySelector('.popup--error');
const popupSucces = document.querySelector('.popup--succes');
const popupErrorClose = document.querySelector('.popup__error-button');
const popupSuccesClose = document.querySelector('.popup__succes-button');
const popupForm = document.querySelector('.form');
const popupSurname = document.querySelector('.form__surname');
const popupName = document.querySelector('.form__name-name');
const popupPatronymic = document.querySelector('.form__patronymic');
const popupEmail = document.querySelector('.form__email');

let isStorageSupport = true;
let storage = '';

header.classList.remove('header__menu-no-js');
toggleOpen.classList.remove('header__toggle-open--none');
toggleOpen.classList.add('header__toggle-open--show');
toggleClose.classList.remove('header__toggle-close--show');
toggleClose.classList.add('header__toggle-close--none');
menuNav.classList.remove('header__navigation-list-no-js');

toggleOpen.addEventListener('click', function() {
  if (toggleOpen.classList.contains('header__toggle-open--show')) {
    header.classList.add('header__menu-no-js');
    toggleOpen.classList.remove('header__toggle-open--show');
    toggleOpen.classList.add('header__toggle-open--none');
    toggleClose.classList.remove('header__toggle-close--none');
    toggleClose.classList.add('header__toggle-close--show');
    menuNav.classList.remove('header__navigation-list');
    menuNav.classList.add('header__navigation-list-no-js');
  } else {
    header.classList.remove('header__menu-no-js');
    toggleClose.classList.remove('header__toggle-close--show');
    toggleClose.classList.add('header__toggle-close--none');
    toggleOpen.classList.remove('header__toggle-open--none');
    toggleOpen.classList.add('header__toggle-open--show');
    menuNav.classList.remove('header__navigation-list-no-js');
    menuNav.classList.add('header__navigation-list');
  }
});

toggleClose.addEventListener('click', function() {
  if (toggleClose.classList.contains('header__toggle-close--show')) {
    header.classList.remove('header__menu-no-js');
    toggleClose.classList.remove('header__toggle-close--show');
    toggleClose.classList.add('header__toggle-close--none');
    toggleOpen.classList.remove('header__toggle-open--none');
    toggleOpen.classList.add('header__toggle-open--show');
    menuNav.classList.remove('header__navigation-list-no-js');
    menuNav.classList.add('header__navigation-list');
  } else {
    header.classList.add('header__menu-no-js');
    toggleClose.classList.remove('header__toggle-close--none');
    toggleClose.classList.add('header__toggle-close--show');
    toggleOpen.classList.remove('header__toggle-open--show');
    toggleOpen.classList.add('header__toggle-open--none');
    menuNav.classList.remove('header__navigation-list');
    menuNav.classList.add('header__navigation-list-no-js');
  }
});

try {
  storage = localStorage.getItem('surname');
  storage = localStorage.getItem('name');
  storage = localStorage.getItem('email');
} catch (err) {
  isStorageSupport = false;
};

popupRequest.addEventListener('click', function() {
  if (storage) {
    popupSurname.value = storage;
    popupName.focus();
  } else {
    popupSurname.focus();
    if (storage) {
      popupName.value = storage;
      popupEmail.focus();
    } else {
      popupName.focus();
      if (storage) {
        popupEmail.value = storage;
        popupPatronymic.focus();
      } else {
        popupEmail.focus();
      }
    }
  }

  popupSurname.focus();
});

popupSuccesClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  popupSucces.classList.remove('popup--show');
  popupSucces.classList.add('popup--none');
});

popupErrorClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  popupError.classList.remove('popup--show');
  popupError.classList.add('popup--none');
});

popupForm.addEventListener('submit', function (evt) {
  if (!popupSurname.value || !popupName.value || !popupEmail.value) {
    evt.preventDefault();
    popupError.classList.remove('popup--none');
    popupError.classList.add('popup--show');
  } else {
    evt.preventDefault();
    popupSucces.classList.remove('popup--none');
    popupSucces.classList.add('popup--show');
  }
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    if (popupError.classList.contains('popup--show')) {
      evt.preventDefault();
      popupError.classList.remove('popup--show');
      popupError.classList.add('popup--none');
    }
  }
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    if (popupSucces.classList.contains('popup--show')) {
      evt.preventDefault();
      popupSucces.classList.remove('popup--show');
      popupSucces.classList.add('popup--none');
    }
  }
});
