
import './index.css';
import { FormValidator, settings } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit';
import { Api } from '../components/Api.js';
import { UserInfo } from '../components/UserInfo.js';
import { postLoading } from '../utils/utils.js';
import {
  gallery, cardSelector, formEdit, formAdd, formAvatarEdit, buttonEdit, buttonAvatarEdit,
   nameInput, jobInput, avatarInput, buttonAdd  
} from '../utils/data.js';

const api = new Api({
  address: `https://mesto.nomoreparties.co`,
   token: `f797dee9-663e-4fb3-a082-41f0cffe7621`,
   groupID: `cohort-22`});

   let person;

   Promise.all([
     api.getPersonInfo(),
     api.getInitialCards()
   ])
     .then((result) => {
         const [ownerInfo, cards] = result;
         user.setId(ownerInfo.id);
         user.setUserInfo(ownerInfo.name, ownerInfo.about);
         user.setUserAvatar(ownerInfo.avatar);
         person = user.getUserInfo();
         cardList.renderItems(cards);
         console.log(person)
     })
     .catch((error) => {
         console.log(error);
     });
   

   
     const cardList = new Section({
       renderer: (item) => {cardList.addItem(createCard({
         ...item,
         id: item._id,
         userID: item.owner._id,
         likesCount: item.likes.length}))
         }
     }, gallery);
   
     const submitPopup = new PopupWithSubmit({
       popupSelector: `#delete`,
       handleFormSubmit: function(){}});
       submitPopup.setEventListeners();
   
     const createCard = (data) => {
       const card = new Card({
         data,
         handleDeleteButtonClick: (id) => {
           submitPopup.setSubmitAction(() => {
             postLoading(true, `#delete`);
             api.removeCard(card.getId())
             .then(result => {
                 card.deleteCard();
                 submitPopup.close();
             })
             .catch(error => console.log(error));
                   postLoading(false, `#delete`);
       });
       submitPopup.open();
         },
   
           handleCardClick: (card) => {
           popupImage.open(data.link, data.name);
         },

         handleLikeButtonClick: (id) => {
           if (!card.buttonCheckLike()) {
               api.likeCard(card.getId())
                   .then(() => {
                       card.addLike();
                   })
                   .catch(error => console.log(error))
           } else {
               api.deleteLikeCard(card.getId())
                   .then(() => {
                       card.removeLike();
                   })
                   .catch(error => console.log(error))
           }
       },
     
         }, cardSelector
       
     );
     const newCard = card.generateCard();
     card.checkUser(person);
     return newCard;
   }
   
   const popupAddCard = new PopupWithForm(`#add`,
       function submitForm(data) {
         postLoading(true, `#add`);
           api.addCard({...data})
               .then(result => {
                   cardList.addItem(createCard({
                       ...data,
                       id: result._id,
                       userID: result.owner._id,
                       likesCount: result.likes.length}));
                       popupAddCard.close();
               })
               .catch(error => console.log(error))
               .finally(() => {
                 postLoading(false, `#add`);
               })
   });
   popupAddCard.setEventListeners();
   
   buttonAdd.addEventListener('click', () => {
     popupAddCard.open();
     addCardFormValidator.resetErrors();
   });
   
   const popupImage = new PopupWithImage(`#image`); 
   const user = new UserInfo({
    profileNameSelector: '.profile__name',
    profileJobSelector: '.profile__profession',
    profileAvatarSelector: '.profile__image'
   });
   
   
   const popupEditProfile = new PopupWithForm(`#edit`,
       function submitForm() {
         postLoading(true, `#edit`);
         let {name, about} = user.getUserInfo();
         name = nameInput.value;
         about = person.about;
           api.patchPersonInfo({name, about})
               .then(() => {
                user.setUserInfo(nameInput.value, jobInput.value);
                   popupEditProfile.close();
               })
               .catch(error => console.log(error))
               .finally(() => {
                 postLoading(false, `#edit`);
               })
   });
   popupEditProfile.setEventListeners();
   
   
   buttonEdit.addEventListener('click', () => {
     popupEditProfile.open();
     const {name, about} = user.getUserInfo(person);
     nameInput.value = name;
     jobInput.value = about;
     editProfileFormValidator.resetErrors();
   });
   
   
   const popupChangeAvatar = new PopupWithForm(`#profile`,
       function submitForm() {
         postLoading(true, `#profile`);
           let {avatar} = user.getUserInfo();
           avatar = avatarInput.value;
           api.patchAvatar(avatar)
               .then(() => {
                user.setUserAvatar(avatar);
                   popupChangeAvatar.close();
               })
               .catch(error => console.log(error))
               .finally(() => {
                 postLoading(false, `#profile`);
               })
   });
   popupChangeAvatar.setEventListeners();
   
   buttonAvatarEdit.addEventListener('click', () => {
     popupChangeAvatar.open();
     editAvatarFormValidator.resetErrors();
   });
   
   
   const addCardFormValidator = new FormValidator(settings, formAdd);
   addCardFormValidator.enableValidation();
   
   const editProfileFormValidator = new FormValidator(settings, formEdit);
   editProfileFormValidator.enableValidation();
   
   const editAvatarFormValidator = new FormValidator(settings, formAvatarEdit);
   editAvatarFormValidator.enableValidation();