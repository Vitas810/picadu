let menuTogle = document.querySelector('#menu-toggle');
let menu = document.querySelector('.sidebar');

menuTogle.addEventListener('click', (el) => {
  el.preventDefault();
  menu.classList.toggle('visible');
});
