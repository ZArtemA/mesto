import { escape } from './data.js';
export class Card {
    constructor(data) {
      this._name = data.name;
      this._link = data.link;
      this._imageBig = document.querySelector('#image');
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

      _handleOpenPopup() {
        this._imageBig.querySelector('.popup__image-big').src = this._link;
        this._imageBig.querySelector('.popup__image-big').alt = this._name;
        this._imageBig.querySelector('.popup__text').textContent = this._name;
        this._imageBig.classList.add('popup_opened');
        this._imageBig.addEventListener('click', this._handleCloseByOverlay);
        document.addEventListener('keydown', this._handleCloseByEsc);
        this._imageBig.querySelector('.popup__btn-close-image').addEventListener('click', () =>{
          this._handleClosePopup();
        });
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
      this._element.querySelector('.card__image').addEventListener('click', () =>{
        this._handleOpenPopup();
      });
            this._element.querySelector('.card__btn-delete').addEventListener('click', () =>{
        this._deleteCard();
      });
      this._element.querySelector('.card__btn-like').addEventListener('click', () =>{
        this._toggleLike();
      });
    }
};