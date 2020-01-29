window.addEventListener('load', startSlider);

function startSlider() {
    const slides = document.querySelectorAll('#slide-menu .slide-menu-item');
    var currentSlide = 0;
    var slideInterval = setInterval(()=> {
        slides[currentSlide].className = 'slide-menu-item';
        currentSlide = (currentSlide+1)%slides.length;
        slides[currentSlide].className = 'slide-menu-item showing';
    },3000);
}
