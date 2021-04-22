export class Card {
  constructor({data, handleCardClick, handleDeleteButtonClick, handleLikeButtonClick}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._id = data.id;
    this._user = data.userID;
    this._likes = data.likesCount;
    this._cardSelector = cardSelector;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._cardName = this._element.querySelector('.card__title');
    this._likeBtn = this._element.querySelector('.card__btn-like');
    this._likeNumber = this._element.querySelector('.card__like-numbers');
    this._deleteBtn = this._element.querySelector('.card__btn-delete');
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteButtonClick;
    this._handleLikeClick = handleLikeButtonClick;
  }

  _getTemplate(){
    return this._cardSelector.content.querySelector('.card__title-image').cloneNode(true);
  }

  generateCard(){
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      this._cardImage.name = this._name;
      this._likeNumber.textContent = this._likes;
      this._cardName.textContent = this._name;
      this._setEventListeners();
      return this._element;
    }

    getId() {
      return this._id;
  }

  deleteCard(){
    this._element.remove();
  }

  buttonCheckLike() {
    return this._likeBtn.classList.contains('card__btn-like_active');
  }

  addLike(){
      this._likeNumber.textContent = this._likes + 1,
      this._likeBtn.classList.add('card__btn-like_active');
    }
    removeLike(){
      this._likeNumber.textContent = (this._likes + 1) - 1,
      this._likeBtn.classList.remove('card__btn-like_active');
    }

    checkUser (user) {
      if (this._user !== user.id) {
          this._deleteBtn.classList.add("card__btn-delete_hidden");
      } else {
          this._deleteBtn.classList.remove("card__btn-delete_hidden");
      }
  }

   _setEventListeners(){
    this._cardImage.addEventListener('click', this._handleCardClick);
    this._deleteBtn.addEventListener('click', () =>{this._handleDeleteClick(this);});
    this._likeBtn.addEventListener('click', () =>{this._handleLikeClick(this);});
  }
};