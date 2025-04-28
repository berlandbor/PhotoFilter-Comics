// === Создание отложенного вызова фильтрации (debounced) ===
const debouncedApplyFilter = debounce(applyFilter, 200);

// === Инициализация после загрузки страницы ===
window.addEventListener('DOMContentLoaded', () => {

  // Синхронизация ползунков и числовых полей
  syncSliders(poster, posterInput);
  syncSliders(saturation, saturationInput);
  syncSliders(imageAlpha, imageAlphaVal);
  syncSliders(edgeThreshold, edgeInput);
  syncSliders(edgeAlpha, alphaVal);
  syncSliders(zoomSlider, zoomVal);

  // Подключение всех событий
  setupEventHandlers();

  // Начальные состояния переключателей
  showEdgesCheckbox.checked = false;
  onlyEdges.checked = false;

  hideElement(bgPicker);
});