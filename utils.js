// === Вспомогательные функции ===

// Синхронизация ползунка и числового поля
function syncSliders(slider, input) {
  slider.addEventListener('input', () => {
    input.value = slider.value;
    debouncedApplyFilter();
  });
  input.addEventListener('input', () => {
    slider.value = input.value;
    debouncedApplyFilter();
  });
}

// Показать элемент
function showElement(el) {
  el.style.display = '';
}

// Скрыть элемент
function hideElement(el) {
  el.style.display = 'none';
}

// Ограничение значения в пределах
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// Задержка выполнения функции (debounce)
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

// Перевести цвет из HEX в RGB
function hexToRGB(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}

// Вычислить расстояние между двумя цветами (если нужно)
function colorDistance(r1, g1, b1, r2, g2, b2) {
  const dr = r1 - r2;
  const dg = g1 - g2;
  const db = b1 - b2;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}