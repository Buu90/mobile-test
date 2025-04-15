'use strict';

export function adjustFontSize() {
  const elements = document.querySelectorAll('[data-translate]');

  elements.forEach((element, index) => {
    const textLength = element.textContent.length;
    const maxLength = parseInt(element.dataset.maxLength) || 30;
    const reductionType = element.dataset.fontReduction || 'fixed';

    if (textLength > maxLength) {
      const computedStyle = window.getComputedStyle(element);
      const currentFontSize = parseFloat(computedStyle.fontSize);

      if (isNaN(currentFontSize)) {
        return;
      }

      let reducedFontSize;
      if (reductionType === 'percent') {
        reducedFontSize = currentFontSize * 0.8;
      } else {
        reducedFontSize = currentFontSize - 4;
      }

      element.style.fontSize = `${Math.max(reducedFontSize, 10)}px`;
    } else {
      element.style.fontSize = '';
    }
  });
}