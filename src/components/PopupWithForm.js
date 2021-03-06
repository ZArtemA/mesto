import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__textplace');
    this._inputs = this._form.querySelectorAll('.popup__input');
    this._submitFunction = this._submitFunction.bind(this);
  }
  _getInputValues() {
    const data = {};
    this._inputs.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  };

  _submitFunction(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitFunction);
  }
  close() {
    super.close();
    this._form.reset();
  }
}