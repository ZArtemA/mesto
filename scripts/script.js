let page = document.querySelector('.page');
let menu = page.querySelector('.popup');
let edit = page.querySelector('.profile__btn-edit');
let close = page.querySelector('.popup__btn-close');
let save = page.querySelector('.popup__btn-save');


function openClose() {
    menu.classList.toggle('popup_opened');
}

let formElement = page.querySelector('.popup__textplace');

function formSubmitHandler (evt) {
    evt.preventDefault();

    let nameInput = page.querySelector('.popup__name');
    let jobInput = page.querySelector('.popup__profession');

    let newname = nameInput.value;
    let newprofession = jobInput.value;

    let name = page.querySelector('.profile__name');
    let profession = page.querySelector('.profile__profession');

    name.textContent = newname;
    profession.textContent = newprofession;

}

edit.addEventListener('click', openClose);
close.addEventListener('click', openClose);
save.addEventListener('click', openClose);
formElement.addEventListener('submit', formSubmitHandler);
