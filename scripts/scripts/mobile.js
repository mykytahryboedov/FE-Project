const mobileMenuButton = document.getElementById("trigger");
const mobileMenu = document.querySelector('.mobile-menu');

window.addEventListener('scroll', hideMenu);
window.addEventListener('resize', hideMenu );

mobileMenuButton.addEventListener('click', showMenu)

function showMenu() {
  mobileMenu.style.display = "block";
   mobileMenuButton.removeEventListener('click', showMenu);
    mobileMenuButton.addEventListener('click', hideMenu);
}


function hideMenu(){
    mobileMenu.style.display = "none";
    mobileMenuButton.addEventListener('click', showMenu);
    mobileMenuButton.removeEventListener('click', hideMenu);
}
