import { escape } from '../utils/data.js';
export class Popup {
    constructor(popupSelector) {
      this._popupSelector = popupSelector;
      this.close = this.close.bind(this);
      this.open = this.open.bind(this);
    }

    open(){
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        this._popupSelector.addEventListener('click', this._handleCloseByOverlay);
    }

     close(){ 
        this._popupSelector.classList.remove('popup_opened');
        this._popupSelector.removeEventListener('click', this._handleCloseByOverlay);
        document.removeEventListener('keydown', this._handleEscClose);
    } 
    _handleCloseByOverlay = (event) => {
        if (event.target === event.currentTarget){
            this.close();
        }
      }

    _handleEscClose = (event) => {
              if (event.key === escape){
                  this.close(); 
             } 
      }
      

    setEventListeners() {
      this._popupSelector.querySelector('.popup__btn-close').addEventListener('click', this.close);
      };
  
  }