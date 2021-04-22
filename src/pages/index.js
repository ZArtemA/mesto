
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
  gallery, page, cardSelector, imageSelector, popupEdit, popupAvatar, popupAdd, formEdit,
  formAdd, cardDelete, formAvatarEdit, buttonEdit, buttonAvatarEdit, nameInput, jobInput,
  name, profession, avatar, buttonAdd  
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
   
         person = user.getUserInfo(ownerInfo);
         user.setUserInfo(person.name, person.about);
         user.setUserAvatar(person.image);
         cardList.renderItems(cards);
         console.log(person);
     })
     .catch((err) => {
         console.log(person);
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
       popupSelector: cardDelete,
       handleFormSubmit: () => {
   
       api.removeCard(card.getId())
       .then(result => {
           card.deleteCard();
       })
       .catch(err => console.log(error));
   }});
   
     const createCard = (data) => {
       const card = new Card({
         data,
         handleDeleteButtonClick: (id) => {
           submitPopup.setSubmitAction(() => {
             postLoading(true, cardDelete);
             api.removeCard(card.getId())
             .then(result => {
                 card.deleteCard();
             })
             .catch(err => console.log(error));
                   postLoading(false, cardDelete);
   
       });
       submitPopup.setEventListeners();
       submitPopup.open();
       console.log(submitPopup._submitFunction);
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
                   .catch(err => console.log(error))
           } else {
               api.deleteLikeCard(card.getId())
                   .then(() => {
                       card.removeLike();
                   })
                   .catch(err => console.log(error))
           }
       },
     
         }, cardSelector
       
     );
     const newCard = card.generateCard();
     card.checkUser(person);
     return newCard;
   }
   
   const popupAddCard = new PopupWithForm(popupAdd,
       function submitForm(data) {
         postLoading(true, popupAdd);
           api.addCard({...data})
               .then(result => {
                   cardList.addItem(createCard({
                       ...data,
                       id: result._id,
                       userID: result.owner._id,
                       likesCount: result.likes.length}));
                       popupAddCard.close();
               })
               .catch(err => console.log(error))
               .finally(() => {
                 postLoading(false, popupAdd);
               })
   });
   
   buttonAdd.addEventListener('click', () => {
     popupAddCard.open();
     popupAddCard.setEventListeners();
     addCardFormValidator.resetErrors();
   });
   
   const popupImage = new PopupWithImage(imageSelector);
   
   popupImage.setEventListeners();
   
   const user = new UserInfo({
     userName: name,
     userInfo: profession,
     userAvatar: avatar
   });
   console.log(user);
   
   
   const popupEditProfile = new PopupWithForm(popupEdit,
       function submitForm(data) {
         postLoading(true, popupEdit);
         data.about = data.info;
         const {name, about} = user.getUserInfo(data);
         person.name = name;
         person.about = about;
           api.patchPersonInfo({name, about})
               .then(() => {
                   user.setUserInfo(name, about);
                   popupEditProfile.close();
               })
               .catch(err => console.log(error))
               .finally(() => {
                 postLoading(false, popupEdit);
               })
   });
   
   
   buttonEdit.addEventListener('click', () => {
     popupEditProfile.open();
     popupEditProfile.setEventListeners();
     const {name, about} = user.getUserInfo(person);
     nameInput.value = name;
     jobInput.value = about;
     editProfileFormValidator.resetErrors();
   });
   
   
   const popupChangeAvatar = new PopupWithForm(popupAvatar,
       function submitForm(data) {
         postLoading(true, popupAvatar);
         data.avatar = data.link;
           const {image} = user.getUserInfo(data);
           person.image = image;
           api.patchAvatar(image)
               .then(() => {
                   user.setUserAvatar(image);
                   popupChangeAvatar.close();
               })
               .catch(err => console.log(data))
               .finally(() => {
                 postLoading(false, popupAvatar);
               })
   });
   
   buttonAvatarEdit.addEventListener('click', () => {
     popupChangeAvatar.open();
     popupChangeAvatar.setEventListeners();
     editAvatarFormValidator.resetErrors();
     console.log(person);
   });
   
   
   const addCardFormValidator = new FormValidator(settings, formAdd);
   addCardFormValidator.enableValidation();
   
   const editProfileFormValidator = new FormValidator(settings, formEdit);
   editProfileFormValidator.enableValidation();
   
   const editAvatarFormValidator = new FormValidator(settings, formAvatarEdit);
   editAvatarFormValidator.enableValidation();