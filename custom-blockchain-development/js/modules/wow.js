function animation() {
	let wow = new WOW({
		boxClass: "wow",
		animateClass: "animate__animated",
		offset: 0,
		mobile: true,
		live: true,
		callback: function (box) {
			if (box.classList.contains("reviews")) {
				const swiper = new Swiper(".reviews__container", {		
                    loop: true,
                    speed: 800, 
                    freeMode: true,
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false,
                    },
                    breakpoints: {
                        // when window width is >= 320px
                        1400: {
                            slidesPerView: 4.3,
                            centeredSlides: true,
                            initialSlide: 3,
                        },
                        360: {
                            slidesPerView: 'auto',
                            initialSlide: 0,
                            spaceBetween: 0,
                            centeredSlides: false,
                        },
                    },
                });
                
			}

            if (box.classList.contains("footer")) {
                box.addEventListener('click', () => {
                    setTimeout(() => {
                        window.location.href = "https://roobinium.io/"; 
                    }, 500);
                });
            }

            if (box.classList.contains("tech-stack")) {
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
            }
		},
	});
    wow.init();
}

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

export default animation;
