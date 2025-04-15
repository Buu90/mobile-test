'use strict'

const subscriptions = document.querySelectorAll('.subscription');

const continueLink = document.getElementById('continueLink');

let selectedUrl = null;

subscriptions.forEach(subscription => {
  subscription.addEventListener('click', () => {

    subscriptions.forEach(item => {
      item.classList.remove('subscription--active');

      const highlight = item.closest('.highlight');
      if (highlight) {
        highlight.style.backgroundImage = ''; 
        highlight.style.display = 'block';
      }
    });

    subscription.classList.add('subscription--active');

    const highlight = subscription.closest('.highlight');
    if (highlight) {
      highlight.style.backgroundImage = 'none';
    }

    selectedUrl = subscription.dataset.url;

    if (selectedUrl) {
      continueLink.href = selectedUrl;
    }
  });
});

continueLink.addEventListener('click', (event) => {
    (!continueLink.href || continueLink.href === '#') && event.preventDefault();
  });