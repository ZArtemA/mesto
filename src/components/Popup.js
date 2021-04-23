import { escape } from '../utils/data.js';
export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._popup.removeEventListener('click', this._handleCloseByOverlay);
    document.removeEventListener('keydown', this._handleEscClose);
  }
  _handleCloseByOverlay = (event) => {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  _handleEscClose = (event) => {
    if (event.key === escape) {
      this.close();
    }
  }


  setEventListeners() {
    this._popup.querySelector('.popup__btn-close').addEventListener('click', this.close);
    this._popup.addEventListener('click', this._handleCloseByOverlay);
  };

}