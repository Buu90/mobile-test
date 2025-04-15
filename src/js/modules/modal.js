'use strict'

const modal = document.querySelector('.modal');
const closeModalBtn = document.getElementById('closeModalBtn');

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});