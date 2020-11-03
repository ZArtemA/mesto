const formValidation = {
    formSelector: 'popup__textplace',
    inputSelector: 'popup__input',
    submitButtonSelector: 'popup__btn-save',
    inactiveButtonClass: 'popup__btn-save_invalid',
    inputErrorClass: 'popup__input_invalid',
    errorMessage: 'popup__input-error',
    inputSelectorLink: 'popup__link'
};
const errorMessages = {
    passError: 'Вы пропустили это поле.',
    missUrlError: 'Введите адрес сайта.'
}

function showError(formElement, input, error, inputLink) {
    const link = formElement.querySelector(`.${inputLink}`);
    if (input.validity.valueMissing) {
        input.setCustomValidity(errorMessages.passError);
    }
    else if (link != null && !link.validity.valid) {
        link.setCustomValidity(errorMessages.missUrlError);
    }
    const errorElement = formElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    input.classList.add(`${error}`);
}

function hideError(formElement, input, error) {
    const errorElement = formElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = '';
    input.classList.remove(`${error}`);
}

function checkInputValidity(formElement, input, error, inputLink) {
    input.setCustomValidity('');

    if (input.checkValidity()) {
        hideError(formElement, input, error);
    } else {
        showError(formElement, input, error, inputLink);
    }
}

function toggleButtonState(formElement, buttonElement, buttonDisabled) {
    if (formElement.checkValidity()) {
        buttonElement.classList.remove(`${buttonDisabled}`);
        buttonElement.disabled = false;
    } else {
        buttonElement.classList.add(`${buttonDisabled}`);
        buttonElement.disabled = true;
    }
}
function resetErrors(formElement, settings){
    if (formElement.querySelectorAll(`.${settings.inputSelector}`).length!=0){ 
        const inputs = Array.from(formElement.querySelectorAll(`.${settings.inputSelector}`));
        inputs.forEach((target) => {
            target.classList.remove(`${settings.inputErrorClass}`);
            formElement.querySelector(`#${target.id}-error`).textContent = '';
        });
    }
}
const setEventListeners = (
    formElement,
    inputClass,
    submitClass,
    disabledClass,
    inputError,
    errorMessage,
    inputClassLink
) => {
    const inputElements = Array.from(formElement.querySelectorAll(`.${inputClass}`));
    const buttonElement = formElement.querySelector(`.${submitClass}`);
    inputElements.forEach((input) => {
        input.addEventListener('input', (evt) => {
            checkInputValidity(formElement, evt.target, inputError, inputClassLink);
            toggleButtonState(formElement, buttonElement, disabledClass);
        });
    });
    toggleButtonState(formElement, buttonElement, disabledClass);
};

function enableValidation(validationConfig) {
    const formElements = Array.from(document.querySelectorAll(`.${validationConfig.formSelector}`));

    formElements.forEach(form => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
    setEventListeners(
        form,
        validationConfig.inputSelector,
        validationConfig.submitButtonSelector,
        validationConfig.inactiveButtonClass,
        validationConfig.inputErrorClass,
        validationConfig.errorMessage,
        validationConfig.inputSelectorLink
        );
    });
}
enableValidation(formValidation);