document.addEventListener(`DOMContentLoaded`, function() {
  // SP Menu
  const menuBtn = document.getElementById('menuBtn');
  const menuNav = document.getElementsByClassName('l-header__nav')[0];
  
  menuBtn.addEventListener('click', function() {
    menuNav.classList.toggle('is-active');
  });
})
