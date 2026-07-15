
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.navigation');
const currentYear = document.querySelector('#current-year');

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

currentYear.textContent = new Date().getFullYear();
