import { escape } from './data.js';
export class Card {
    constructor(data, handleCardClick, cardSelector) {
      this._name = data.name;
      this._link = data.link;
      this._imageBig = document.querySelector(cardSelector);
      this._handleCardClick = handleCardClick;
    }

    _getTemplate(){
      const cardElement = document.querySelector('.card').content.querySelector('.card__title-image').cloneNode(true);
      return cardElement;
    }

    generateCard(){
      this._element = this._getTemplate();
        this._element.querySelector('.card__image').src = this._link;
        this._element.querySelector('.card__title').textContent = this._name;
        this._setEventListeners();
        return this._element;
      }
      _handleClosePopup() {
        this._imageBig.classList.remove('popup_opened');
        this._imageBig.removeEventListener('click', this._handleCloseByOverlay);
        document.removeEventListener('keydown', this._handleCloseByEsc);
      }
      _deleteCard(){
        this._element.closest('.card__title-image').remove('.card__title-image');
      }
      _toggleLike(){
        this._element.querySelector('.card__btn-like').classList.toggle('card__btn-like_active');
      }
      _handleCloseByOverlay = (event) => {
        if (event.target === event.currentTarget){
          this._handleClosePopup();
        }
      }
      _handleCloseByEsc = (event) => {
        if (event.key === escape){
        this._handleClosePopup();
        }
      }

     _setEventListeners(){
       this._element.querySelector('.card__image').addEventListener('click', this._handleCardClick);
            this._element.querySelector('.card__btn-delete').addEventListener('click', () =>{
        this._deleteCard();
      });
      this._element.querySelector('.card__btn-like').addEventListener('click', () =>{
        this._toggleLike();
      });
    }
};