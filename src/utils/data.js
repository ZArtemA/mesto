const page = document.querySelector('.page');
export const escape = 'Escape';
export const gallery = document.querySelector('.cards__gallery');
export const cardSelector = document.querySelector('.card');
export const formEdit = document.querySelector(`#formedit`);
export const formAdd = document.querySelector(`#formadd`);
export const formAvatarEdit = document.querySelector(`#avataredit`);
export const buttonEdit = page.querySelector('.profile__btn-edit');
export const buttonAvatarEdit = page.querySelector('.profile__image-place');
export const nameInput = page.querySelector('#popup-name');
export const jobInput = page.querySelector('#popup-profession');
export const avatarInput = page.querySelector('#popup-avatar');
export const buttonAdd = page.querySelector('.profile__btn-add');


export const settings = {
    formSelector: '.popup__textplace',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn-save',
    inactiveButtonClass: 'popup__btn-save_invalid',
    inputErrorClass: 'popup__input_invalid',
    errorMessage: 'popup__input-error',
    inputSelectorLink: 'popup__link'
  };
  
  export const errorMessages = {
    passError: 'Вы пропустили это поле.',
    missUrlError: 'Введите адрес сайта.'
  };