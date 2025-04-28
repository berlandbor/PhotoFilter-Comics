// === Канвас и контекст ===
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// === Боковая панель и кнопка ===
const toggleSidebar = document.getElementById('toggleSidebar');
const sidebar = document.getElementById('sidebar');

// === Загрузка и кнопки ===
const upload = document.getElementById('upload');
const resetBtn = document.getElementById('resetBtn');
const downloadBtn = document.getElementById('downloadBtn');

// === Постеризация, Насыщенность, Прозрачность ===
const poster = document.getElementById('poster');
const posterInput = document.getElementById('posterInput');
const saturation = document.getElementById('saturation');
const saturationInput = document.getElementById('saturationInput');
const imageAlpha = document.getElementById('imageAlpha');
const imageAlphaVal = document.getElementById('imageAlphaVal');

// === Контуры ===
const edgeThreshold = document.getElementById('edgeThreshold');
const edgeInput = document.getElementById('edgeInput');
const edgeColor = document.getElementById('edgeColor');
const edgeAlpha = document.getElementById('edgeAlpha');
const alphaVal = document.getElementById('alphaVal');
const showEdgesCheckbox = document.getElementById('showEdges');
const onlyEdges = document.getElementById('onlyEdges');
const bgPicker = document.getElementById('bgPicker');
const bgColor = document.getElementById('bgColor');
const selectedColor = document.getElementById('selectedColor');
const colorTolerance = document.getElementById('colorTolerance');
const colorPosterization = document.getElementById('colorPosterization');
const colorSaturation = document.getElementById('colorSaturation');

// === Фильтрация по выбранным цветам ===
const selectedColor1 = document.getElementById('selectedColor1');
const colorTolerance1 = document.getElementById('colorTolerance1');
const colorToleranceVal1 = document.getElementById('colorToleranceVal1');
const colorPosterization1 = document.getElementById('colorPosterization1');
const colorPosterizationVal1 = document.getElementById('colorPosterizationVal1');
const colorSaturation1 = document.getElementById('colorSaturation1');
const colorSaturationVal1 = document.getElementById('colorSaturationVal1');

const selectedColor2 = document.getElementById('selectedColor2');
const colorTolerance2 = document.getElementById('colorTolerance2');
const colorToleranceVal2 = document.getElementById('colorToleranceVal2');
const colorPosterization2 = document.getElementById('colorPosterization2');
const colorPosterizationVal2 = document.getElementById('colorPosterizationVal2');
const colorSaturation2 = document.getElementById('colorSaturation2');
const colorSaturationVal2 = document.getElementById('colorSaturationVal2');

const selectedColor3 = document.getElementById('selectedColor3');
const colorTolerance3 = document.getElementById('colorTolerance3');
const colorToleranceVal3 = document.getElementById('colorToleranceVal3');
const colorPosterization3 = document.getElementById('colorPosterization3');
const colorPosterizationVal3 = document.getElementById('colorPosterizationVal3');
const colorSaturation3 = document.getElementById('colorSaturation3');
const colorSaturationVal3 = document.getElementById('colorSaturationVal3');


const globalColor = document.getElementById('globalColor');
const globalColorStrength = document.getElementById('globalColorStrength');
const globalColorStrengthVal = document.getElementById('globalColorStrengthVal');

const contrast = document.getElementById('contrast');
const contrastVal = document.getElementById('contrastVal');

const colorize = document.getElementById('colorize');
const colorizeVal = document.getElementById('colorizeVal');

const brightness = document.getElementById('brightness');
const brightnessVal = document.getElementById('brightnessVal');

const vignette = document.getElementById('vignette');
const vignetteVal = document.getElementById('vignetteVal');
const vignetteColor = document.getElementById('vignetteColor');
const vignetteRadius = document.getElementById('vignetteRadius');
const vignetteRadiusVal = document.getElementById('vignetteRadiusVal');

const frameColor = document.getElementById('frameColor');
const frameWidth = document.getElementById('frameWidth');
const frameWidthVal = document.getElementById('frameWidthVal');

const signatureText = document.getElementById('signatureText');
const signatureColor = document.getElementById('signatureColor');
const signatureSize = document.getElementById('signatureSize');
const signatureSizeVal = document.getElementById('signatureSizeVal');

const cropMarginLeft = document.getElementById('cropMarginLeft');
const cropMarginRight = document.getElementById('cropMarginRight');
const cropMarginTop = document.getElementById('cropMarginTop');
const cropMarginBottom = document.getElementById('cropMarginBottom');
const applyCrop = document.getElementById('applyCrop');

// === Масштаб ===
const zoomSlider = document.getElementById('zoom');
const zoomVal = document.getElementById('zoomVal');