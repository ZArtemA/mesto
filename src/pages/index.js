
import './index.css';
import { FormValidator, settings } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { initialCards, escape } from '../utils/data.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

const gallery = document.querySelector('.cards__gallery');
const page = document.querySelector('.page');
const cardSelector = document.querySelector('.card');
const imageSelector = document.querySelector(`#image`);
const popupEdit = document.querySelector(`#edit`);
const popupAdd = document.querySelector(`#add`);
const formEdit = document.querySelector(`#formedit`);
const formAdd = document.querySelector(`#formadd`);
const buttonEdit = page.querySelector('.profile__btn-edit');
const buttonSaveEdit = popupEdit.querySelector('.popup__btn-save');
const nameInput = page.querySelector('#popup-name');
const jobInput = page.querySelector('#popup-profession');
const name = page.querySelector('.profile__name');
const profession = page.querySelector('.profile__profession');
const buttonAdd = page.querySelector('.profile__btn-add');

const popupImage = new PopupWithImage(imageSelector);

popupImage.setEventListeners();

function createCard(item){
  const card = new Card(item, () => {
    popupImage.open(item.link, item.name)},
    cardSelector
  ).generateCard();
  cardList.addItem(card);
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {createCard(item)}
}, gallery);

cardList.renderItems();

const user = new UserInfo({
  userName: name,
  userInfo: profession});

const popupEditProfile = new PopupWithForm(
  popupEdit,
  (data) => {
  const item = {
    name: data.nameInput,
    info: data.jobInput
  };
  user.setUserInfo(data.name, data.info);
  }
);
popupEditProfile.setEventListeners();

buttonEdit.addEventListener('click', () => {
  popupEditProfile.open();
  buttonSaveEdit.disabled = true;
  buttonSaveEdit.classList.add('popup__btn-save_invalid');
  const {name, info} = user.getUserInfo();
  nameInput.value = name;
  jobInput.value = info;
  editProfileFormValidator.resetErrors();
});

const popupAddCard = new PopupWithForm(
  popupAdd,
  (data) => {
    const item = {
      name: data.cardnameInput,
      link: data.cardInput
    };

    createCard(data);
  }
);

popupAddCard.setEventListeners();

buttonAdd.addEventListener('click', () => {
  popupAddCard.open();
  buttonSaveEdit.disabled = true;
  buttonSaveEdit.classList.add('popup__btn-save_invalid');
  addCardFormValidator.resetErrors();
});


const addCardFormValidator = new FormValidator(settings, formAdd);
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(settings, formEdit);
editProfileFormValidator.enableValidation();