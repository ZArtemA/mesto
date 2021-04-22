import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popupSelector.querySelector('.popup__image-big');
        this.setEventListeners();
    }

    open(link, name) {
        super.open();
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupSelector.querySelector('.popup__text').textContent = name;
    }
}