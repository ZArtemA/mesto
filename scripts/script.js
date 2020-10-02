const page = document.querySelector('.page');
const popup = page.querySelector('.popup');
const popupEdit = page.querySelector('#edit');
const popupAdd = page.querySelector('#add');
const imageBig = page.querySelector('#image');
const closeEdit = popupEdit.querySelector('.popup__btn-close');
const closeAdd = popupAdd.querySelector('.popup__btn-close');
const closeImage = imageBig.querySelector('.popup__btn-close');
const edit = page.querySelector('.profile__btn-edit');
const formEdit = page.querySelector('#formedit');
const nameInput = page.querySelector('.popup__name');
const jobInput = page.querySelector('.popup__profession');
const name = page.querySelector('.profile__name');
const profession = page.querySelector('.profile__profession');
const add = page.querySelector('.profile__btn-add');
const cardnameInput = page.querySelector('.popup__image');
const cardInput = page.querySelector('.popup__link');
const gallery = page.querySelector('.cards__gallery');
const formAdd = page.querySelector('#formadd');
const imageTitle = imageBig.querySelector('.popup__text');
const imageLink = imageBig.querySelector('.popup__image-big');
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
function addCard(name, link){
    const cardElement = cardTemplate.cloneNode(true);
    const image = cardElement.querySelector('.cards__image');
    image.src = link;
    cardElement.querySelector('.cards__title').textContent = name;
    cardElement.querySelector('.cards__btn-like').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('cards__btn-like_active');
    })
    cardElement.querySelector('.cards__btn-delete').addEventListener('click', function (evt) {
        const eventTarget = evt.target;
        eventTarget.parentElement.remove();
        })
        image.addEventListener('click', function() {
        if (!imageBig.classList.contains('popup_opened')) {
            imageLink.src = link;
            imageTitle.textContent = name;
        }
        togglePopup(imageBig);
});
    return cardElement;
}
function addToGallery(name, link){
    const newCard = addCard(name, link);
    gallery.prepend(newCard);
}
function togglePopup(popupElement){
    popupElement.classList.toggle('popup_opened')
}
function togglePopupEdit() {
        if (!popupEdit.classList.contains('popup_opened')) {
            nameInput.value = name.textContent;
            jobInput.value = profession.textContent;
        }
    togglePopup(popupEdit);
}
function togglePopupAdd() {
    togglePopup(popupAdd);
}
function toggleImageBig() {
    togglePopup(imageBig);
}
function handlerFormSubmit (evt) {
    evt.preventDefault();
    if(nameInput.value.length !==0 && jobInput.value.length !==0){
    name.textContent = nameInput.value;
    profession.textContent = jobInput.value;
    }
    togglePopup(popupEdit);
}
function handlerCardSubmit (evt) {
    evt.preventDefault();
    if(cardnameInput.value.length !==0 && cardInput.value.length !==0){
        addToGallery(cardnameInput.value, cardInput.value);
    }
    togglePopup(popupAdd);
}
edit.addEventListener('click', togglePopupEdit);
closeEdit.addEventListener('click', togglePopupEdit);
closeAdd.addEventListener('click', togglePopupAdd);
closeImage.addEventListener('click', toggleImageBig);
add.addEventListener('click', togglePopupAdd);
formEdit.addEventListener('submit', handlerFormSubmit);
formAdd.addEventListener('submit', handlerCardSubmit);