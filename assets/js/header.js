"use strict"

const isMobile = {
   Android: function () {
      return navigator.userAgent.match(/Android/i);
   },
   BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
   },
   iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
   },
   Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
   },
   Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
   },
   any: function () {
      return (isMobile.Android() ||
         isMobile.BlackBerry() ||
         isMobile.iOS() ||
         isMobile.Opera() ||
         isMobile.Windows());
   }
};
// Если мы на мобильном устройтсве дабвляем класс _touch а если на пк _pc
if (isMobile.any()) {
   document.body.classList.add('_touch');

   let menuArrow = document.querySelectorAll('.menu__arrow');
   if (menuArrow.length > 0) {
      for (let index = 0; index < menuArrow.length; index++) {
         const menuArrows = menuArrow[index];
         menuArrows.addEventListener("click", function (e) {
            menuArrows.parentElement.classList.toggle('_active'); // Если мы на тачскринах то мы в css показвваем стрелку а в js мы прикручиваем при нажатии на нее класс _active
         });
      }
   }

} else {
   document.body.classList.add('_pc');
}
// Ну и конечно открывание на тачкринах меню бургер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body')
if (iconMenu) {
   iconMenu.addEventListener("click", function (e) {
      document.body.classList.toggle('_lock')
      iconMenu.classList.toggle('_active')
      menuBody.classList.toggle('_active')
   });
}
// Плавная прокрутка при клике лол ебать ты че зашел сюда и типо тебе интресно мое личное обяснение 
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
   menuLinks.forEach(menuLink => {
      menuLink.addEventListener("click", onMenuLinkClick);
   });

   function onMenuLinkClick(e) {
      const menuLink = e.target;
      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
         const gotoBlock = document.querySelector(menuLink.dataset.goto);
         const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.pageYOffset - document.querySelector('header').offsetHeight;

         if (iconMenu.classList.contains('_active')) {
            document.body.classList.remove('_lock')
            iconMenu.classList.remove('_active')
            menuBody.classList.remove('_active')
         }

         window.scrollTo({
            top: gotoBlockValue,
            behavior: "smooth"
         });
         e.preventDefault();
      }
   }
}
