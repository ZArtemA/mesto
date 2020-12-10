import { escape } from './data.js';
export class Card {
    constructor(data, templateSelector) {
      this._name = data.name;
      this._link = data.link;
      this._template = document.querySelector(templateSelector).content.querySelector('.cards__title-image');
      this._imageBig = document.querySelector('#image');
    }

    generateCard(){
      this._element = this._template.cloneNode(true);
        this._element.querySelector('.cards__image').src = this._link;
        this._element.querySelector('.cards__title').textContent = this._name;
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
        this._element.closest('.cards__title-image').remove('.cards__title-image');
      }
      _toggleLike(){
        this._element.querySelector('.cards__btn-like').classList.toggle('cards__btn-like_active');
      }
      _handleCloseByOverlay = (event) => {
        if (event.target === event.currentTarget){
          this._handleClosePopup();
          console.log(this);
        }
      }
      _handleCloseByEsc = (event) => {
        if (event.key === escape){
        this._handleClosePopup();
        this._handleClosePopup();

        }
      }
  
      _setEventListeners(){
      this._element.querySelector('.cards__image').addEventListener('click', () =>{
        this._handleOpenPopup();
      });
            this._element.querySelector('.cards__btn-delete').addEventListener('click', () =>{
        this._deleteCard();
      });
      this._element.querySelector('.cards__btn-like').addEventListener('click', () =>{
        this._toggleLike();
      });
    }
};