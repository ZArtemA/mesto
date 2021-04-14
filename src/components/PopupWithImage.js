import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
  
    open(link, name){
        super.open();
        this._popupSelector.querySelector('.popup__image-big').src = link;
        this._popupSelector.querySelector('.popup__image-big').alt = name;
        this._popupSelector.querySelector('.popup__text').textContent = name;
    }
  }