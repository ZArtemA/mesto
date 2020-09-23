let page = document.querySelector('.page');
let menu = page.querySelector('.popup');
let edit = page.querySelector('.profile__btn-edit');
let close = page.querySelector('.popup__btn-close');
let formElement = page.querySelector('.popup__textplace');
let nameInput = page.querySelector('.popup__name');
let jobInput = page.querySelector('.popup__profession');
let name = page.querySelector('.profile__name');
let profession = page.querySelector('.profile__profession');

function togglePopup() {
        if (!menu.classList.contains('popup_opened')) {
            nameInput.value = name.textContent;
            jobInput.value = profession.textContent;
        }
    menu.classList.toggle('popup_opened')
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    profession.textContent = jobInput.value;
    togglePopup();
}

edit.addEventListener('click', togglePopup);
close.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);