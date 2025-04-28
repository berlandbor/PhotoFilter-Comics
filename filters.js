// === Глобальные переменные ===
let originalImageData = null;
let originalWidth = 0;
let originalHeight = 0;

function performCrop() {
  if (!originalImageData) return;

  const left = parseInt(cropMarginLeft.value);
  const right = parseInt(cropMarginRight.value);
  const top = parseInt(cropMarginTop.value);
  const bottom = parseInt(cropMarginBottom.value);

  const srcWidth = originalImageData.width;
  const srcHeight = originalImageData.height;

  const newWidth = srcWidth - left - right;
  const newHeight = srcHeight - top - bottom;

  if (newWidth <= 0 || newHeight <= 0) {
    alert('Размеры обрезки недопустимы!');
    return;
  }

  const croppedData = ctx.createImageData(newWidth, newHeight);
  const src = originalImageData.data;
  const dst = croppedData.data;

  for (let y = 0; y < newHeight; y++) {
    for (let x = 0; x < newWidth; x++) {
      const srcIndex = ((y + top) * srcWidth + (x + left)) * 4;
      const dstIndex = (y * newWidth + x) * 4;

      dst[dstIndex] = src[srcIndex];
      dst[dstIndex + 1] = src[srcIndex + 1];
      dst[dstIndex + 2] = src[srcIndex + 2];
      dst[dstIndex + 3] = src[srcIndex + 3];
    }
  }

  originalImageData = croppedData;
}

// === Применение фильтра ===
function applyFilter() {
  if (!originalImageData) return;

  const width = originalImageData.width;
  const height = originalImageData.height;

  // Устанавливаем фиксированный размер канваса
  canvas.width = width;
  canvas.height = height;

  ctx.clearRect(0, 0, width, height);

  // Копируем оригинальные данные
  const workingImageData = new ImageData(new Uint8ClampedArray(originalImageData.data), width, height);
  const src = workingImageData.data;

  // === Базовые параметры ===
  const posterValue = parseInt(poster.value);
  const saturationValue = parseFloat(saturation.value);
  const alphaValue = parseInt(imageAlpha.value);

  // === Базовая постеризация, насыщенность, прозрачность ===
  for (let i = 0; i < src.length; i += 4) {
    const avg = (src[i] + src[i + 1] + src[i + 2]) / 3;

    src[i] = Math.floor((avg + (src[i] - avg) * saturationValue) / posterValue) * posterValue;
    src[i + 1] = Math.floor((avg + (src[i + 1] - avg) * saturationValue) / posterValue) * posterValue;
    src[i + 2] = Math.floor((avg + (src[i + 2] - avg) * saturationValue) / posterValue) * posterValue;
    src[i + 3] = alphaValue;
  }

  // === Фильтрация по выбранным цветам ===
  const colorFilters = [
    {
      color: hexToRGB(selectedColor1.value),
      tolerance: parseInt(colorTolerance1.value),
      poster: parseInt(colorPosterization1.value),
      saturation: parseFloat(colorSaturation1.value)
    },
    {
      color: hexToRGB(selectedColor2.value),
      tolerance: parseInt(colorTolerance2.value),
      poster: parseInt(colorPosterization2.value),
      saturation: parseFloat(colorSaturation2.value)
    },
    {
      color: hexToRGB(selectedColor3.value),
      tolerance: parseInt(colorTolerance3.value),
      poster: parseInt(colorPosterization3.value),
      saturation: parseFloat(colorSaturation3.value)
    }
  ];

  for (let i = 0; i < src.length; i += 4) {
    const r = src[i];
    const g = src[i + 1];
    const b = src[i + 2];

    for (const filter of colorFilters) {
      const dist = Math.sqrt(
        (r - filter.color.r) ** 2 +
        (g - filter.color.g) ** 2 +
        (b - filter.color.b) ** 2
      );

      if (dist < filter.tolerance) {
        const avg = (r + g + b) / 3;
        src[i] = Math.floor((avg + (r - avg) * filter.saturation) / filter.poster) * filter.poster;
        src[i + 1] = Math.floor((avg + (g - avg) * filter.saturation) / filter.poster) * filter.poster;
        src[i + 2] = Math.floor((avg + (b - avg) * filter.saturation) / filter.poster) * filter.poster;
        break;
      }
    }
  }
  // === Применение контрастности ===
const contrastValue = parseInt(contrast.value) / 100; // от -1 до +1
if (contrastValue !== 0) {
  const factor = (1 + contrastValue) / (1 - contrastValue);
  for (let i = 0; i < src.length; i += 4) {
    src[i] = clamp(factor * (src[i] - 128) + 128);
    src[i + 1] = clamp(factor * (src[i + 1] - 128) + 128);
    src[i + 2] = clamp(factor * (src[i + 2] - 128) + 128);
  }
}
  // === Управление яркостью ===
const brightnessValue = parseInt(brightness.value);
if (brightnessValue !== 0) {
  for (let i = 0; i < src.length; i += 4) {
    src[i] = clamp(src[i] + brightnessValue);
    src[i + 1] = clamp(src[i + 1] + brightnessValue);
    src[i + 2] = clamp(src[i + 2] + brightnessValue);
  }
}
  // === Управление глобальным цветовым каналом ===
const selectedRGB = hexToRGB(globalColor.value);
const strength = parseInt(globalColorStrength.value) / 100; // от -1 до +1

if (strength !== 0) {
  for (let i = 0; i < src.length; i += 4) {
    const r = src[i];
    const g = src[i + 1];
    const b = src[i + 2];

    const distance = Math.sqrt(
      (r - selectedRGB.r) ** 2 +
      (g - selectedRGB.g) ** 2 +
      (b - selectedRGB.b) ** 2
    );

    const maxDistance = Math.sqrt(255 * 255 * 3);
    const similarity = 1 - distance / maxDistance; // 1 = цвет очень похож, 0 = совсем не похож

    if (similarity > 0.2) { // усиливаем только достаточно похожие
      src[i] = clamp(src[i] + (selectedRGB.r - r) * strength * similarity);
      src[i + 1] = clamp(src[i + 1] + (selectedRGB.g - g) * strength * similarity);
      src[i + 2] = clamp(src[i + 2] + (selectedRGB.b - b) * strength * similarity);
    }
  }
}

// Функция ограничителя 0-255
function clamp(value) {
  return Math.max(0, Math.min(255, value));
}

// === Управление цветностью (чёрно-белое ↔ цветное) ===
const colorizeFactor = parseInt(colorize.value) / 100; // от 0 (ч/б) до 1 (цвет)
if (colorizeFactor !== 1) {
  for (let i = 0; i < src.length; i += 4) {
    const avg = (src[i] + src[i + 1] + src[i + 2]) / 3;
    src[i] = clamp(avg + (src[i] - avg) * colorizeFactor);
    src[i + 1] = clamp(avg + (src[i + 1] - avg) * colorizeFactor);
    src[i + 2] = clamp(avg + (src[i + 2] - avg) * colorizeFactor);
  }
}
// === Применение цветной виньетки с правильным радиусом ===
const vignetteStrength = parseInt(vignette.value) / 100; // сила затемнения от 0 до 1
const vignetteStart = parseInt(vignetteRadius.value) / 100; // начало виньетки от 0 до 1
if (vignetteStrength > 0) {
  const vignetteRGB = hexToRGB(vignetteColor.value);
  const centerX = width / 2;
  const centerY = height / 2;
  const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const dx = x - centerX;
      const dy = y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Расчёт коэффициента виньетки
      let vignetteFactor = (distance / maxDistance - vignetteStart) / (1 - vignetteStart);
      vignetteFactor = clamp01(vignetteFactor); // ограничиваем от 0 до 1
      vignetteFactor *= vignetteStrength; // учитываем выбранную силу виньетки

      const i = (y * width + x) * 4;

      // Применяем цвет виньетки
      src[i] = clamp(src[i] * (1 - vignetteFactor) + vignetteRGB.r * vignetteFactor);
      src[i + 1] = clamp(src[i + 1] * (1 - vignetteFactor) + vignetteRGB.g * vignetteFactor);
      src[i + 2] = clamp(src[i + 2] * (1 - vignetteFactor) + vignetteRGB.b * vignetteFactor);
    }
  }
}

// Дополнительные функции ограничений
function clamp(value) {
  return Math.max(0, Math.min(255, value));
}

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

// Дополнительная функция
function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}


// === Основное изображение ===
ctx.putImageData(workingImageData, 0, 0);

// === Контуры, если нужно ===
if (showEdgesCheckbox.checked || onlyEdges.checked) {
  applyEdges(workingImageData);
}

// === Масштабирование (не влияет на отрисовку) ===
const zoom = parseFloat(zoomSlider.value);
canvas.style.transform = `scale(${zoom})`;

// === После основного изображения рисуем рамку ===
// === Рисуем рамку с отступом от краёв ===
const frameThickness = parseInt(frameWidth.value);
const frameMargin = 20; // Отступ рамки внутрь изображения, можно менять

if (frameThickness > 0) {
  ctx.strokeStyle = frameColor.value;
  ctx.lineWidth = frameThickness;

  ctx.strokeRect(
    frameMargin + frameThickness / 2,
    frameMargin + frameThickness / 2,
    canvas.width - 2 * frameMargin - frameThickness,
    canvas.height - 2 * frameMargin - frameThickness
  );
}

// === Потом рисуем автограф ===
const signature = signatureText.value.trim();
if (signature.length > 0) {
  ctx.fillStyle = signatureColor.value;
  ctx.font = `${parseInt(signatureSize.value)}px sans-serif`;
  ctx.textBaseline = 'bottom';
  ctx.textAlign = 'right';
  ctx.fillText(signature, canvas.width - 10, canvas.height - 10);
}
}

// === Применение контуров ===
function applyEdges(sourceImageData) {
  const width = sourceImageData.width;
  const height = sourceImageData.height;
  const src = sourceImageData.data;

  const gray = new Float32Array(width * height);
  for (let i = 0; i < src.length; i += 4) {
    gray[i / 4] = 0.3 * src[i] + 0.59 * src[i + 1] + 0.11 * src[i + 2];
  }

  const thres = parseInt(edgeThreshold.value);
  const edgeRGB = hexToRGB(edgeColor.value);
  const edgeAlphaValue = parseInt(edgeAlpha.value);

  const edgeData = new Uint8ClampedArray(src.length);

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = y * width + x;
      const gx = gray[i + 1] - gray[i - 1];
      const gy = gray[i + width] - gray[i - width];
      const mag = Math.sqrt(gx * gx + gy * gy);
      const idx = i * 4;

      if (mag > thres) {
        edgeData[idx] = edgeRGB.r;
        edgeData[idx + 1] = edgeRGB.g;
        edgeData[idx + 2] = edgeRGB.b;
        edgeData[idx + 3] = edgeAlphaValue;
      } else {
        edgeData[idx + 3] = 0;
      }
    }
  }

  const edgeImage = new ImageData(edgeData, width, height);

  // Временный канвас для контура
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = width;
  tempCanvas.height = height;
  const tempCtx = tempCanvas.getContext('2d');
  tempCtx.putImageData(edgeImage, 0, 0);

  if (onlyEdges.checked) {
    // === Исправленная заливка фоном + наложение контура ===
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = bgColor.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tempCanvas, 0, 0);
  } else {
    ctx.drawImage(tempCanvas, 0, 0);
  }
}