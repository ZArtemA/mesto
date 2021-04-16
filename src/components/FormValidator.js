const settings = {
    formSelector: '.popup__textplace',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn-save',
    inactiveButtonClass: 'popup__btn-save_invalid',
    inputErrorClass: 'popup__input_invalid',
    errorMessage: 'popup__input-error',
    inputSelectorLink: 'popup__link'
  };
  
  const errorMessages = {
    passError: 'Вы пропустили это поле.',
    missUrlError: 'Введите адрес сайта.'
  };
  
  class FormValidator{
    constructor(settings, form){
      this._settings = settings;
      this._form = form;
      this._inputList = Array.from(form.querySelectorAll(settings.inputSelector));
      this._input = this._form.querySelector(this._settings.inputSelector);
      this._button = this._form.querySelector(this._settings.submitButtonSelector);
    }
  
    _showInputError(input){
      const link = this._form.querySelector(`.${this._settings.inputSelectorLink}`);
      if (input.validity.valueMissing) {
        input.setCustomValidity(errorMessages.passError);
      }
      else if (link != null && !link.validity.valid) {
        link.setCustomValidity(errorMessages.missUrlError);
    };
  
      const errorElement = this._form.querySelector(`#${input.id}-error`);
      input.classList.add(`${this._settings.inputErrorClass}`);
      errorElement.textContent = input.validationMessage;
      errorElement.classList.add(this._settings.errorClass);
    };
  
    _hideInputError(input){
      const errorElement = this._form.querySelector(`#${input.id}-error`);
      input.classList.remove(`${this._settings.inputErrorClass}`);
      errorElement.classList.remove(this._settings.errorClass);
      errorElement.textContent = '';
        };
  
    _validateInput(input){
      input.setCustomValidity('');
      if (!input.validity.valid){
        this._showInputError(input);
      } else {
        this._hideInputError(input);
      }
    };
  
    _toggleButtonState(){
      if (this._form.checkValidity()){
        this._button.classList.remove(this._settings.inactiveButtonClass);
        this._button.disabled = false;
      } else {
        this._button.classList.add(this._settings.inactiveButtonClass);
        this._button.disabled = true;
      }
    };
  
    enableValidation(){
      this._inputList.forEach((input) => {
        input.addEventListener('input',() =>{
        this._validateInput(input);
        this._toggleButtonState();
        });
      });
      this._toggleButtonState();
    };

    resetErrors(){
      this._inputList.forEach((input) => {
          this._hideInputError(input);
          this._button.classList.add(this._settings.inactiveButtonClass);
          this._button.disabled = true;
      });

  };
  }
  export { FormValidator, settings };