function techStack() {
    const swiper = new Swiper(".tech-stack__container", {
        slidesPerView: 3,
        centeredSlides: true,
        initialSlide: 0,
        spaceBetween: 0,
        loop: true,
		speed: 800, 
		// freeMode: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
        breakpoints: {
            1700: {
                slidesPerView: 4,
                centeredSlides: true,
                initialSlide: 0,
            },
            1024: {
                slidesPerView: 3,
                centeredSlides: false,
            },
            360: {
                slidesPerView: 'auto',
				initialSlide: 0,
				spaceBetween: 0,
				// centeredSlides: false,
            },
        },
        on: {
            init: function (swiper) {
                updateNavigation(swiper);
            },
            slideChange: function (swiper) {
                updateNavigation(swiper);
            }
        }
    });

    function updateNavigation(swiper) {
        const totalSlides = swiper.slides.length; 
        const activeIndex = swiper.realIndex;

        const navWidthPercent = (1 / totalSlides) * 100;
        const navOffsetPercent = (activeIndex * 100);

        const navBar = document.querySelector('.tech-stack__navigation span');
        if (navBar) {
            navBar.style.width = `${navWidthPercent}%`;
            navBar.style.transform = `translateX(${navOffsetPercent}%)`;
        }
    }
}

export default techStack;


