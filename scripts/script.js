const page = document.querySelector('.page');
const popups = page.querySelectorAll('.popup');
const popupEdit = page.querySelector('#edit');
const popupAdd = page.querySelector('#add');
const imageBig = page.querySelector('#image');
const closeEdit = popupEdit.querySelector('.popup__btn-close');
const closeAdd = popupAdd.querySelector('.popup__btn-close');
const closeImage = imageBig.querySelector('.popup__btn-close');
const buttonEdit = page.querySelector('.profile__btn-edit');
const buttonSaveCard = popupAdd.querySelector('.popup__btn-save');
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
const imageTitle = imageBig.querySelector('.popup__text');
const imageLink = imageBig.querySelector('.popup__image-big');
const escape = 'Escape';
const cardTemplate = document.querySelector('#card').content;
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
function renderCards(massive){
    massive.forEach(card => addToGallery(card.name, card.link));
}
renderCards(initialCards);
function getCard(name, link){
    const cardElement = cardTemplate.cloneNode(true);
    const image = cardElement.querySelector('.cards__image');
    image.src = link;
    image.alt = name;
    cardElement.querySelector('.cards__title').textContent = name;
    cardElement.querySelector('.cards__btn-like').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('cards__btn-like_active');
    })
    cardElement.querySelector('.cards__btn-delete').addEventListener('click', function (evt) {
        const eventTarget = evt.target;
        eventTarget.closest('.cards__title-image').remove();
        })
        image.addEventListener('click', function() {
        if (!imageBig.classList.contains('popup_opened')) {
            imageLink.src = link;
            imageLink.alt = name;
            imageTitle.textContent = name;
        }
        openPopup(imageBig);
});
    return cardElement;
}
function addToGallery(name, link){
    const newCard = getCard(name, link);
    gallery.prepend(newCard);
}

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
}
function handlerFormSubmit (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    profession.textContent = jobInput.value;
    closePopup(popupEdit);
}
function handlerCardSubmit (evt) {
    evt.preventDefault();
    addToGallery(cardnameInput.value, cardInput.value);
    closePopup(popupAdd);
}
const closeTargetPopup = (event) => {
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
  popup.addEventListener('click', closeTargetPopup);
});
closeEdit.addEventListener(`click`, () =>
    closePopup(popupEdit)
);
closeAdd.addEventListener(`click`, () =>
    closePopup(popupAdd)
);
closeImage.addEventListener(`click`, () =>
    closePopup(imageBig)
);