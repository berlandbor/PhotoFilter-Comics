function setupEventHandlers() {
  // Загрузка изображения
  upload.addEventListener('change', handleUpload);

  // Открытие/закрытие боковой панели
  toggleSidebar.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
  });

  // Сброс страницы
  resetBtn.addEventListener('click', () => {
    window.location.reload();
  });

  // Скачивание изображения
  downloadBtn.addEventListener('click', handleDownload);

  // Связка ползунков и числовых полей
  linkSliderToInput(poster, posterInput);
  linkSliderToInput(saturation, saturationInput);
  linkSliderToInput(imageAlpha, imageAlphaVal);
  linkSliderToInput(edgeThreshold, edgeInput);
  linkSliderToInput(edgeAlpha, alphaVal);
  linkSliderToInput(zoomSlider, zoomVal);

  // Цвет фона
  bgColor.addEventListener('input', debouncedApplyFilter);

  // Цвет контура
  edgeColor.addEventListener('input', debouncedApplyFilter);

  // Фильтрация по выбранным цветам (три цвета)
  selectedColor1.addEventListener('input', debouncedApplyFilter);
  linkSliderToInput(colorTolerance1, colorToleranceVal1);
  linkSliderToInput(colorPosterization1, colorPosterizationVal1);
  linkSliderToInput(colorSaturation1, colorSaturationVal1);

  selectedColor2.addEventListener('input', debouncedApplyFilter);
  linkSliderToInput(colorTolerance2, colorToleranceVal2);
  linkSliderToInput(colorPosterization2, colorPosterizationVal2);
  linkSliderToInput(colorSaturation2, colorSaturationVal2);

  selectedColor3.addEventListener('input', debouncedApplyFilter);
  linkSliderToInput(colorTolerance3, colorToleranceVal3);
  linkSliderToInput(colorPosterization3, colorPosterizationVal3);
  linkSliderToInput(colorSaturation3, colorSaturationVal3);
  
  zoomSlider.addEventListener('input', () => {
  const zoom = parseFloat(zoomSlider.value);
  canvas.style.transform = `scale(${zoom})`;
  zoomVal.value = zoom;
});

zoomVal.addEventListener('input', () => {
  const zoom = parseFloat(zoomVal.value);
  canvas.style.transform = `scale(${zoom})`;
  zoomSlider.value = zoom;
});

  // Переключение контуров
  showEdgesCheckbox.addEventListener('change', debouncedApplyFilter);
  onlyEdges.addEventListener('change', () => {
    if (onlyEdges.checked) {
      showElement(bgPicker);
    } else {
      hideElement(bgPicker);
    }
    debouncedApplyFilter();
  });

globalColorStrength.addEventListener('input', () => {
  globalColorStrengthVal.textContent = globalColorStrength.value;
  debouncedApplyFilter();
});

contrast.addEventListener('input', () => {
  contrastVal.textContent = contrast.value;
  debouncedApplyFilter();
});

colorize.addEventListener('input', () => {
  colorizeVal.textContent = colorize.value;
  debouncedApplyFilter();
});

brightness.addEventListener('input', () => {
  brightnessVal.textContent = brightness.value;
  debouncedApplyFilter();
});

vignette.addEventListener('input', () => {
  vignetteVal.textContent = vignette.value;
  debouncedApplyFilter();
});

vignetteColor.addEventListener('input', () => {
  debouncedApplyFilter();
});

vignetteRadius.addEventListener('input', () => {
  vignetteRadiusVal.textContent = vignetteRadius.value + '%';
  debouncedApplyFilter();
});

frameWidth.addEventListener('input', () => {
  frameWidthVal.textContent = frameWidth.value;
  debouncedApplyFilter();
});

signatureSize.addEventListener('input', () => {
  signatureSizeVal.textContent = signatureSize.value;
  debouncedApplyFilter();
});

signatureText.addEventListener('input', debouncedApplyFilter);
signatureColor.addEventListener('input', debouncedApplyFilter);
frameColor.addEventListener('input', debouncedApplyFilter);

applyCrop.addEventListener('click', () => {
  performCrop();
  applyFilter();
});

}

// Связка ползунок <-> числовое поле
function linkSliderToInput(slider, input) {
  slider.addEventListener('input', () => {
    input.value = slider.value;
    debouncedApplyFilter();
  });
  input.addEventListener('input', () => {
    slider.value = input.value;
    debouncedApplyFilter();
  });
}

// Загрузка изображения
function handleUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const img = new Image();
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.clearRect(0, 0, img.width, img.height);
    ctx.drawImage(img, 0, 0);
    originalImageData = ctx.getImageData(0, 0, img.width, img.height); // сохраняем ImageData
    applyFilter();
  };
  img.src = URL.createObjectURL(file);
}

// Скачивание изображения
function handleDownload() {
  const link = document.createElement('a');
  link.download = 'filtered_image.png';
  link.href = canvas.toDataURL();
  link.click();
}