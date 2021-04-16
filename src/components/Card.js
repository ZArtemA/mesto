export class Card {
    constructor(data, handleCardClick, cardSelector) {
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
      this._element = this._getTemplate();
      this._cardImage = this._element.querySelector('.card__image');
      this._cardName = this._element.querySelector('.card__title');
      this._handleCardClick = handleCardClick;
    }

    _getTemplate(){
      return this._cardSelector.content.querySelector('.card__title-image').cloneNode(true);
    }

    generateCard(){
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardName.textContent = this._name;
        this._setEventListeners();
        return this._element;
      }

      _deleteCard(){
        this._element.closest('.card__title-image').remove('.card__title-image');
      }
      _toggleLike(){
        this._element.querySelector('.card__btn-like').classList.toggle('card__btn-like_active');
      }

     _setEventListeners(){
      this._cardImage.addEventListener('click', this._handleCardClick);
            this._element.querySelector('.card__btn-delete').addEventListener('click', () =>{
        this._deleteCard();
      });
      this._element.querySelector('.card__btn-like').addEventListener('click', () =>{
        this._toggleLike();
      });
    }
};