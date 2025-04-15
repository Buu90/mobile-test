// language.js

'use strict';

import { adjustFontSize } from './fontSizeAdjustment.js';

function getQueryParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

async function loadLanguageFile(lang) {
  try {
    const response = await fetch(`js/lang/${lang}.json`);
    if (!response.ok) throw new Error('Language file not found');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

function updateTexts(translations) {
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[key]) {
      element.innerHTML = translations[key];
    }
  });

  adjustFontSize();
}

async function initializeLanguage() {
  const supportedLanguages = ['de', 'en', 'es', 'fr', 'ja', 'pt'];
  const systemLang = navigator.language.slice(0, 2);
  const queryLang = getQueryParameter('lang');

  const lang = supportedLanguages.includes(queryLang)
    ? queryLang
    : supportedLanguages.includes(systemLang)
    ? systemLang
    : 'en';

  const translations = await loadLanguageFile(lang);
  if (translations) {
    updateTexts(translations);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initializeLanguage();
});