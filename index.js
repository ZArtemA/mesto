
import { FormValidator, settings } from './scripts/FormValidator.js';
import { Card } from './scripts/Card.js';
import { initialCards, escape } from './scripts/data.js';

const page = document.querySelector('.page');
const popups = page.querySelectorAll('.popup');
const popupEdit = page.querySelector('#edit');
const popupAdd = page.querySelector('#add');
const closeEdit = popupEdit.querySelector('.popup__btn-close');
const closeAdd = popupAdd.querySelector('.popup__btn-close');
const buttonEdit = page.querySelector('.profile__btn-edit');
const buttonSaveCard = popupAdd.querySelector('.popup__btn-save');
const buttonSaveEdit = popupEdit.querySelector('.popup__btn-save');
const formEdit = page.querySelector('#formedit');
const nameInput = page.querySelector('#popup-name');
const jobInput = page.querySelector('#popup-profession');
const name = page.querySelector('.profile__name');
const profession = page.querySelector('.profile__profession');
const buttonAdd = page.querySelector('.profile__btn-add');
const cardnameInput = page.querySelector('#popup-image');
const cardInput = page.querySelector('#popup-link');
const gallery = page.querySelector('.cards__gallery');
const formAdd = page.querySelector('#formadd');
const formsList = page.querySelectorAll('form');

  
  initialCards.forEach((item) => {
    addToGallery(item);
});

function addToGallery(item) {
    const card = new Card(item);
    const cardElement = card.generateCard();
    gallery.prepend(cardElement);
}

formsList.forEach((item) =>{
  const newForm = new FormValidator(settings, item);
  newForm.enableValidation();
});

function closePopup(popupElement) { 
    popupElement.classList.remove('popup_opened');
    page.removeEventListener('keydown', closeByEsc);
} 
function openPopup(popupElement){
    popupElement.classList.add('popup_opened');
    page.addEventListener('keydown', closeByEsc);
}
function openPopupAdd() {
    openPopup(popupAdd);
    cardnameInput.value = '';
    cardInput.value = '';
    buttonSaveCard.disabled = true;
    buttonSaveCard.classList.add('popup__btn-save_invalid');
}
function openPopupEdit() {
    nameInput.value = name.textContent;
    jobInput.value = profession.textContent;
    openPopup(popupEdit);
    buttonSaveEdit.disabled = true;
    buttonSaveEdit.classList.add('popup__btn-save_invalid');
}
function handlerFormSubmit (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    profession.textContent = jobInput.value;
    closePopup(popupEdit);
}
function handlerCardSubmit (evt) {
    evt.preventDefault();
    const newCard ={name: cardnameInput.value, link: cardInput.value}
    addToGallery(newCard);
    closePopup(popupAdd);
}
const closeByOverlay = (event) => {
  const target = page.querySelector('.popup_opened');
  if (event.target === event.currentTarget){
    closePopup(target);
  }
}
const closeByEsc = (event) => {
  const target = page.querySelector('.popup_opened');
        if (event.key === escape){
            closePopup(target); 
       } 
}
buttonEdit.addEventListener('click', openPopupEdit);
buttonAdd.addEventListener('click', openPopupAdd);
formEdit.addEventListener('submit', handlerFormSubmit);
formAdd.addEventListener('submit', handlerCardSubmit);
popups.forEach((popup) => {
  popup.addEventListener('click', closeByOverlay);
});
closeEdit.addEventListener(`click`, () =>
    closePopup(popupEdit)
);
closeAdd.addEventListener(`click`, () =>
    closePopup(popupAdd)
);