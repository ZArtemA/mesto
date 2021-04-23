import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image-big');
        this._popupInput = this._popup.querySelector('.popup__text')
        this.setEventListeners();
    }

    open(link, name) {
        super.open();
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupInput.textContent = name;
    }
}