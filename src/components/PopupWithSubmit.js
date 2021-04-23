import { Popup } from './Popup.js';
export class PopupWithSubmit extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleSubmitCallback = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__textplace');
    this._submitFunction = this._submitFunction.bind(this);
    this.setEventListeners();
  }

  setSubmitAction(submitAction) {
    this._handleSubmitCallback = submitAction;
    return this._handleSubmitCallback
  }

  _submitFunction(evt) {
    evt.preventDefault();
    this._handleSubmitCallback();
  };


  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitFunction);
  }
  close() {
    super.close();
  }
}