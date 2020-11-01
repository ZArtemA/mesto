
const errorMessages = {
    passError: 'Вы пропустили это поле.',
    missUrlError: 'Введите адрес сайта.'
}

function showError(formElement, input) {
    if (input.validity.valueMissing) {
        input.setCustomValidity(errorMessages.passError);
    }
    else if (!formElement.querySelector('input.popup__link').validity.valid) {
        input.setCustomValidity(errorMessages.missUrlError);
    }
    const errorElement = formElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    input.classList.add('popup__input_invalid');
}

function hideError(formElement, input) {
    const errorElement = formElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = '';
    input.classList.remove('popup__input_invalid');
}

function checkInputValidity(formElement, input) {
    input.setCustomValidity('');

    if (input.checkValidity()) {
        hideError(formElement, input);
    } else {
        showError(formElement, input);
    }
}

function toggleButtonState(formElement, buttonElement) {
    if (formElement.checkValidity()) {
        buttonElement.classList.remove('popup__btn-save_invalid');
        buttonElement.disabled = false;
    } else {
        buttonElement.classList.add('popup__btn-save_invalid');
        buttonElement.disabled = true;
    }
}

function setEventListeners(formElement) {
    const inputElements = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__btn-save');

    inputElements.forEach((input) => {
        input.addEventListener('input', (evt) => {
            checkInputValidity(formElement, evt.target);
            toggleButtonState(formElement, buttonElement);
        });
    });
    toggleButtonState(formElement, buttonElement);
}

function enableValidation({ formSelector }) {
    const formElements = Array.from(document.querySelectorAll(formSelector));
    formElements.forEach(form => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(form);
    });
}

enableValidation({
    formSelector: '.popup__textplace'
});