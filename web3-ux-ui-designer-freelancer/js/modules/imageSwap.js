function initCustomImageSwap() {
    const IMAGES = {
        main: "./img/designer/photo3.jpg",
        mainX2: "./img/designer/photo3@2x.jpg",
        mainX3: "./img/designer/photo3@3x.jpg",
        thumbnail: "../img/designer/image_09@2x.jpg",
    };

    const mainPhotoElement = document.querySelector(".designer__award--best-freelance");
    if (!mainPhotoElement) return;

    const slides = document.querySelectorAll(".designer__award__slider-photo__slide");
    if (!slides || slides.length === 0) return;

    const style = document.createElement('style');
    style.textContent = `
        .designer__award--best-freelance {
            overflow: hidden !important;
            position: relative !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            background-color: #000000 !important;
            grid-column: span 2 !important;
            box-sizing: border-box !important;
        }
        .designer__award--best-freelance picture {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            width: 100% !important;
            height: 100% !important;
            max-height: 100% !important;
        }
        .designer__award--best-freelance picture img {
            width: 100% !important;
            object-fit: contain !important;
            object-position: center !important;
        }
        .designer__award__slider-photo__slide picture img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
        }
    `;
    document.head.appendChild(style);

    function swapImagesWithReplacement(slideElement) {
        const mainPicture = mainPhotoElement.querySelector("picture");
        const slidePicture = slideElement.querySelector("picture");
        
        if (!mainPicture || !slidePicture) return;

        if (!mainPhotoElement.hasAttribute('data-original-height')) {
            const computedStyle = window.getComputedStyle(mainPhotoElement);
            mainPhotoElement.setAttribute('data-original-height', computedStyle.height);
            mainPhotoElement.setAttribute('data-original-width', computedStyle.width);
        }
        
        const mainPictureHTML = mainPicture.innerHTML;
        const slidePictureHTML = slidePicture.innerHTML;

        mainPicture.innerHTML = slidePictureHTML;
        slidePicture.innerHTML = mainPictureHTML;
        
        const mainImg = mainPicture.querySelector("img");
        if (mainImg) {
            mainImg.style.maxWidth = "100%";
            mainImg.style.maxHeight = "100%";
            mainImg.style.width = "auto";
            mainImg.style.height = "auto";
            mainImg.style.objectFit = "contain";
            mainImg.style.transform = "none";
        }
    }

    slides.forEach((slide) => {
        const newSlide = slide.cloneNode(true);
        slide.parentNode.replaceChild(newSlide, slide);
        
        newSlide.addEventListener("click", function(event) {
            event.preventDefault();
            swapImagesWithReplacement(this);
        });
    });
}

export default initCustomImageSwap;