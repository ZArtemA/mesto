
import './pages/index.css';
import { FormValidator, settings } from './scripts/FormValidator.js';
import { Card } from './scripts/Card.js';
import { initialCards, escape } from './scripts/data.js';
import { Section } from './components/Section.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo.js';
const PopupEnlargeImage = new PopupWithImage('#image');


const gallery = document.querySelector('.cards__gallery');
const page = document.querySelector('.page');
const popupEdit = page.querySelector('#edit');
const popupAdd = page.querySelector('#add');
const buttonEdit = page.querySelector('.profile__btn-edit');
const buttonSaveCard = popupAdd.querySelector('.popup__btn-save');
const buttonSaveEdit = popupEdit.querySelector('.popup__btn-save');

const nameInput = page.querySelector('#popup-name');
const jobInput = page.querySelector('#popup-profession');
const name = page.querySelector('.profile__name');
const profession = page.querySelector('.profile__profession');
const buttonAdd = page.querySelector('.profile__btn-add');


const formsList = page.querySelectorAll('form');

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, () => {
      PopupEnlargeImage.open(item.link, item.name);
      PopupEnlargeImage.setEventListeners()},
    '#image'
    ).generateCard();
    cardList.addItem(card);
  }

}, gallery);

cardList.renderItems();

const user = new UserInfo({
  userName: name,
  userInfo: profession});

const newUserInfo = new PopupWithForm(
  '#edit',
  (data) => {
  const item = {
    name: data.nameInput,
    info: data.jobInput
  };
  user.setUserInfo(data.name, data.info);
  }
);

buttonEdit.addEventListener('click', () => {
  newUserInfo.open();
  buttonSaveEdit.disabled = true;
  buttonSaveEdit.classList.add('popup__btn-save_invalid');
  newUserInfo.setEventListeners();

  const {returnName, returnInfo} = user.getUserInfo();
  nameInput.value = returnName;
  jobInput.value = returnInfo;
});

const cardAdd = new PopupWithForm(
  '#add',
  (data) => {
    const item = {
      name: data.cardnameInput,
      link: data.cardInput
    };

      const card = new Card(data, () => {
      PopupEnlargeImage.open(data.link, data.name);
      PopupEnlargeImage.setEventListeners()},
    '#image'
    ).generateCard();
    cardList.addItem(card);
  }
);


buttonAdd.addEventListener('click', () => {
  cardAdd.open();
  buttonSaveEdit.disabled = true;
  buttonSaveEdit.classList.add('popup__btn-save_invalid');
  cardAdd.setEventListeners();
});


formsList.forEach((item) =>{
  const newForm = new FormValidator(settings, item);
  newForm.enableValidation();
});