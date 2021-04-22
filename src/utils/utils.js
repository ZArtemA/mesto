
export function postLoading(isLoading, popupSelector) {
  const popup = popupSelector;
  const popupButton = popup.querySelector(".popup__btn-save");
  if (isLoading) {
    popupButton.textContent = "Загрузка...";
  } else {
    popupButton.textContent = popupButton.value;
  }
}